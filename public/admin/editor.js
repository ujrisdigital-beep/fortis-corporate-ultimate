window.CMS_MANUAL_INIT=true;
// Older browsers/local HTTP previews may lack randomUUID; retain cryptographic randomness.
if (!crypto.randomUUID && crypto.getRandomValues) {
  crypto.randomUUID = () => {
    const b=crypto.getRandomValues(new Uint8Array(16)); b[6]=(b[6]&15)|64; b[8]=(b[8]&63)|128;
    const h=[...b].map(n=>n.toString(16).padStart(2,'0')).join('');
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
  };
}
(async()=>{const box=document.querySelector('#editor-status');try{const res=await fetch('/admin/setup.json');if(!res.ok)throw Error('Editor setup file unavailable. Rebuild the site.');const config=await res.json();if(!config.configured){box.innerHTML='<p class="eyebrow">FORTIS INVICTA / CONTENT EDITOR</p><h1>One connection, then easy publishing.</h1><p>The public website is ready to browse. To enable this editor, connect the source to GitHub and Netlify, set <strong>CMS_REPOSITORY</strong> to <strong>owner/repository</strong> in Netlify, and configure the GitHub OAuth provider in Netlify Security → OAuth. Then rebuild.</p><p>No shared admin password or Firebase key is needed.</p><p><a href="/admin/guide.html">Step-by-step setup and editor guide →</a></p><p><a href="/admin/photo-prep.html">Prepare photos for upload →</a></p><a href="/">Return to the website</a>';return;}
box.className='tools';box.innerHTML='<a href="/" target="_blank" rel="noopener">View website ↗</a><a href="/admin/guide.html" target="_blank" rel="noopener">Editor guide ↗</a><a href="/admin/photo-prep.html" target="_blank" rel="noopener">Resize photos ↗</a><span>Published changes appear after the Netlify build finishes.</span>';
const script=document.createElement('script');script.src='https://cdn.jsdelivr.net/npm/decap-cms@3.16.3/dist/decap-cms.js';script.onerror=()=>{box.append(document.createTextNode(' The editor could not load. Check connectivity and the pinned Decap version.'));};script.onload=()=>{window.CMS.init();window.CMS.registerEventListener({name:'preSave',handler:({entry})=>{const data=entry.get('data');const items=data.get('items');if(items){items.forEach(item=>{if(item.get('status')==='published'&&!item.get('title'))throw Error('Published entries need a title.');});}return data;}});};document.head.append(script);
}catch(err){box.textContent='Editor unavailable: '+err.message;}})();
