/* Pix icon set — consistent 24px outline icons and an original P monogram. */
(()=>{const paths={
'pix-mark':'<path d="M7 21V3h6.1a6 6 0 0 1 0 12H7"/>',
edit:'<path d="M12 20h9"/><path d="m16.5 3.5 4 4L8 20l-5 1 1-5Z"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
messages:'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8Z"/>',
menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
close:'<path d="m18 6-12 12M6 6l12 12"/>',
'chevron-down':'<path d="m7 10 5 5 5-5"/>',
'arrow-up':'<path d="M12 19V5m-6 6 6-6 6 6"/>',
check:'<path d="m5 12 4 4L19 6"/>'
};
const render=(name,size=24)=>'<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+(paths[name]||paths['pix-mark'])+'</svg>';
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=render(el.dataset.icon));
window.PixIcons=Object.freeze({names:Object.keys(paths),render});
})();