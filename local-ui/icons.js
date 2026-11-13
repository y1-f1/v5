/* Pix icon set — consistent 24px outline icons and an original P monogram. */
(()=>{const paths={
'pix-mark':'<path d="M7 21V3h6.1a6 6 0 0 1 0 12H7"/>',
ghost:'<path d="M12 2a8 8 0 0 0-8 8v11l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V10a8 8 0 0 0-8-8Z"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/>',
chats:'<path d="M8 6h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2l-2 2v-2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M4 10V4a2 2 0 0 1 2-2h10"/>',
'artifacts':'<path d="m14 8-4 4"/><path d="M18 10 8 20"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>',
'chat-single':'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H3l2-4a8.5 8.5 0 1 1 16-4.5Z"/>',
edit:'<path d="M12 20h9"/><path d="m16.5 3.5 4 4L8 20l-5 1 1-5Z"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
messages:'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z"/>',
menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
close:'<path d="m18 6-12 12M6 6l12 12"/>',
'chevron-down':'<path d="m7 10 5 5 5-5"/>',
'arrow-up':'<path d="M12 19V5m-6 6 6-6 6 6"/>',
check:'<path d="m5 12 4 4L19 6"/>',
settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z"/>',
'chevron-left':'<path d="m15 18-6-6 6-6"/>',
folder:'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 10h18"/>',
code:'<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>',
shapes:'<rect x="3" y="3" width="8" height="8" rx="2"/><circle cx="17" cy="7" r="4"/><path d="M14 14h6v7h-6z"/>',
more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
};
const render=(name,size=24)=>'<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(paths[name]||paths['pix-mark'])+'</svg>';
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=render(el.dataset.icon));
window.PixIcons=Object.freeze({names:Object.keys(paths),render});
})();