// Shared by the server layout (inline <script>) — deliberately NOT a client
// module so the constant can be imported from server components.

// Applies the stored theme before first paint so there is no flash of the
// wrong theme. Falls back to dark (brand default).
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme')==='light'?'light':'dark';document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#F8F7F3':'#0B0B0A');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})()`
