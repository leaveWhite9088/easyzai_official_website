# 易智AI 官网部署指南

## 服务器信息

- **IP**：`81.70.39.239`
- **域名**：`easyzai.top` / `www.easyzai.top`
- **SSH 用户**：`ubuntu`（已配置免密登录）
- **SSH 密码**：`TWmggyha;Qsfygm3#`
- **Web 服务器**：Nginx
- **站点根目录**：`/var/www/easyzai`
- **Nginx 配置**：`/etc/nginx/conf.d/easyzai.top.conf`

## 技术栈

- Next.js 14 + next-intl（国际化）
- 静态导出：`output: 'export'`
- 构建产物目录：`out/`
- 资源托管：Nginx

## 部署前准备

1. 确保本地已安装依赖：

   ```bash
   npm install
   ```

2. 确保本地可通过 SSH 免密登录服务器：

   首次在新电脑部署时，先把本机公钥复制到服务器（执行后会提示输入服务器密码）：

   ```powershell
   # Windows PowerShell / CMD
   type %USERPROFILE%\.ssh\id_rsa.pub | ssh ubuntu@81.70.39.239 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
   # 密码：TWmggyha;Qsfygm3#
   ```

   配置完成后测试免密登录：

   ```bash
   ssh ubuntu@81.70.39.239
   ```

## 完整部署流程

### 1. 本地构建

在项目根目录执行：

```bash
npm run build
```

构建完成后，会在项目根目录生成 `out/` 文件夹，里面包含完整的静态站点文件。

### 2. 打包构建产物

将 `out/` 目录打包为 tar.gz：

```bash
tar -czf easyzai-website.tar.gz -C out .
```

### 3. 上传至服务器

使用 `scp` 将压缩包上传到服务器的 `/tmp/` 目录：

```bash
scp easyzai-website.tar.gz ubuntu@81.70.39.239:/tmp/
```

### 4. 在服务器上替换部署

SSH 登录服务器后执行以下脚本：

```bash
ssh ubuntu@81.70.39.239

DEPLOY_DIR='/var/www/easyzai'
BACKUP_DIR="/var/www/easyzai.bak.$(date +%Y%m%d%H%M%S)"
NEW_DIR="/var/www/easyzai.new.$(date +%Y%m%d%H%M%S)"

# 1. 解压新构建到一个全新目录（不碰旧站，避免部署窗口内文件缺失）
echo "Extracting new build to $NEW_DIR"
sudo mkdir -p $NEW_DIR
sudo tar -xzf /tmp/easyzai-website.tar.gz -C $NEW_DIR
sudo chown -R www-data:www-data $NEW_DIR

# 2. 原子切换：旧站整体改名为备份目录，新目录接管站点路径。
#    mv 是同文件系统 rename，瞬间完成；不存在 rm -rf 后解压期间的空窗，
#    访客不会在部署中途拿到 404 的 JS/CSS chunk。
echo "Swapping $NEW_DIR -> $DEPLOY_DIR (backup at $BACKUP_DIR)"
sudo mv $DEPLOY_DIR $BACKUP_DIR
sudo mv $NEW_DIR $DEPLOY_DIR

# 3. 重载 Nginx（静态站点无需重启，reload 即可）
echo "Reloading nginx"
sudo nginx -t && sudo systemctl reload nginx

echo "Done"
```

### 5. 验证部署

浏览器访问：

- 中文站：https://easyzai.top/zh
- 英文站：https://easyzai.top/en

或使用 curl 测试首页：

```bash
curl -I https://easyzai.top
```

期望返回 `HTTP/2 200`。

## 回滚流程

如果新部署有问题，可以从最近的备份恢复：

```bash
ssh ubuntu@81.70.39.239

DEPLOY_DIR='/var/www/easyzai'
# 将 BACKUP_DIR 替换为实际的备份目录名
BACKUP_DIR='/var/www/easyzai.bak.20260614155245'

sudo rm -rf $DEPLOY_DIR/*
sudo cp -a $BACKUP_DIR/. $DEPLOY_DIR/
sudo chown -R www-data:www-data $DEPLOY_DIR
sudo nginx -t && sudo systemctl reload nginx
```

## 清理旧备份（可选）

服务器上的备份目录会越来越多，可定期清理：

```bash
ssh ubuntu@81.70.39.239 "ls -td /var/www/easyzai.bak.* | tail -n +4 | xargs -r sudo rm -rf"
```

以上命令会保留最近 3 个备份，删除更早的备份。

## 注意事项

- 该项目为 **纯静态导出站点**，Nginx 只需 `reload` 即可生效，不需要重启服务。
- 部署前务必先完成本地构建并确认 `out/` 目录已更新。
- 每次部署会自动生成带时间戳的备份，便于回滚。
- 服务器 SSL 证书路径为 `/etc/nginx/ssl/easyzai.top_bundle.crt` 和 `/etc/nginx/ssl/easyzai.top.key`，由 Nginx 统一管理。
