/* ================== CẤU HÌNH – SỬA Ở ĐÂY ================== */
const CONFIG = {
  zalo: '0354125293',              // số Zalo nhận đơn
  freeShip: 500000,                // mức freeship
  discount: 0.10,                  // giảm khi nhập mã theo mùa
  /* Lịch tự đổi giao diện: đến ngày "until" (không tính) thì dùng theme tương ứng */
  schedule: [
    { until: '2026-10-21', theme: 'a' },   // đến hết 20/10
    { until: '2026-12-27', theme: 'n' },   // Noel
    { until: '2027-02-20', theme: 't' }    // Tết Đinh Mùi (mùng 1 = 6/2/2027)
  ],
  fallback: 'a'
};
const IMG = { polo:'images/polo.jpg', back:'images/back.jpg', pink:'images/pink.jpg', layer:'images/layer.jpg' };

/* ================== DỮ LIỆU SẢN PHẨM – SỬA GIÁ Ở ĐÂY ================== */
const PRODUCTS = [
  { id:'p1', name:'Váy polo tutu trắng cổ bèo nơ', price:749000, old:1200000, imgs:['polo','back'], tags:['Quà tặng','Đi chơi'], badge:'Hot', sizes:['S','M','L'],
    desc:['Cổ bèo thắt nơ đen, tay ngắn bồng nhẹ','Lưng ren đính sequin lấp lánh','Chân váy tutu xoè bồng bềnh'] },
  { id:'p2', name:'Váy hồng tay phồng chân váy ren', price:350000, old:545000, imgs:['pink'], tags:['Quà tặng','Đi chơi','Đi tiệc'], badge:'Best seller', sizes:['S','M','L'],
    desc:['Cổ vuông, tay phồng nữ tính','Thân váy xoè tầng, chiết eo tôn dáng','Viền ren trắng nhiều lớp'] },
  { id:'p3', name:'Váy trắng xoè nhiều tầng phối ren', price:379000, old:579000, imgs:['layer'], tags:['Đi tiệc','Quà tặng'], badge:'Mới về', sizes:['S','M','L'],
    desc:['Dáng cúp ôm, chân váy organza nhiều tầng','Phối ren tinh tế, đứng form','Hợp đi tiệc, chụp ảnh, dạo phố'] },
 // { id:'p4', name:'Váy trắng xoè tầng bản basic', price:399000, old:0, imgs:['layer'], tags:['Đi chơi'], badge:'Giá tốt', sizes:['S','M','L'],
 //   desc:['Bản giá mềm, mặc hằng ngày','Dáng xoè nhẹ, dễ phối giày','(Ảnh mẫu tạm, thay bằng ảnh thật)'] }
];

/* ================== NỘI DUNG THEO MÙA ================== */
const THEMES = {
  a:{ code:'CHANH2010', target:'2026-10-20T00:00:00+07:00', label:'Còn lại đến ngày 20/10', fx:'petal',
    bar:'Ưu đãi 20/10 · Freeship đơn từ 500K · Mã <b>CHANH2010</b> giảm 10%',
    h1:'Chị em xinh, Chanh Xinhhh chiều!', sub:'Váy tutu, váy xoè ren bồng bềnh. Mua tặng mẹ, người yêu, bạn thân hay tự thưởng cho mình đều được khen.',
    cta:'Chọn váy tặng 20/10', sec:'Quà tặng 20/10 xinh nhất', secSub:'Váy đóng túi quà hồng, sẵn sàng trao tay.',
    band:'Tặng chị em, giảm ngay 10%', bandSub:'Nhập mã ở giỏ hàng. Mỗi váy kèm túi quà hồng dịp 20/10.',
    popH:'Quà 20/10 cho chị em', popP:'Nhận mã giảm 10% cho đơn đầu tiên và túi quà hồng kèm váy.' },
  n:{ code:'NOEL2026', target:'2026-12-25T00:00:00+07:00', label:'Còn lại đến đêm Noel', fx:'snow',
    bar:'Noel rộn ràng · Freeship đơn từ 500K · Mã <b>NOEL2026</b> giảm 10%',
    h1:'Noel này, Chanh Xinhhh cùng bạn tỏa sáng', sub:'Váy trắng tinh khôi như tuyết, váy hồng ngọt như kẹo. Diện đi chơi Noel là nổi bật giữa phố.',
    cta:'Chọn váy đi chơi Noel', sec:'Outfit đi chơi Noel', secSub:'Xinh từ quảng trường đến bữa tiệc tối.',
    band:'Quà Noel cho bạn và người thương', bandSub:'Nhập mã ở giỏ hàng để giảm 10%. Đặt sớm để kịp ship trước đêm 24.',
    popH:'Ông già Noel gửi quà', popP:'Nhận mã giảm 10% cho đơn đầu tiên, đặt trước 20/12 để kịp giao.' },
  t:{ code:'TET2027', target:'2027-02-06T00:00:00+07:00', label:'Còn lại đến mùng 1 Tết', fx:'mai',
    bar:'Tết này diện đẹp · Freeship đơn từ 500K · Mã <b>TET2027</b> giảm 10%',
    h1:'Tết này diện đẹp cùng Chanh Xinhhh', sub:'Váy xinh chụp ảnh Tết, đi chúc Tết, dạo phố xuân. Chọn sớm để kịp ship trước Giao thừa.',
    cta:'Chọn váy diện Tết', sec:'Outfit mặc Tết', secSub:'Váy sáng màu, lên hình đẹp như hoa mai.',
    band:'Lì xì đầu năm, giảm ngay 10%', bandSub:'Nhập mã ở giỏ hàng. Đặt trước 25 tháng Chạp để kịp giao.',
    popH:'Lì xì từ Chanh Xinhhh', popP:'Nhận mã giảm 10% cho đơn đầu tiên, chúc bạn một năm mới xinh đẹp.' }
};

/* ================== TIỆN ÍCH ================== */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>n.toLocaleString('vi-VN')+'đ';
const store={get(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const byId=id=>PRODUCTS.find(p=>p.id===id);
let mode='auto', theme=CONFIG.fallback, cd=null, filter='Tất cả';
let cart=store.get('cx_cart')||[]; let promoOk=false;

/* ================== THEME ================== */
function autoTheme(){
  const now=Date.now();
  for(const s of CONFIG.schedule){ if(now < new Date(s.until+'T00:00:00+07:00').getTime()) return s.theme; }
  return CONFIG.fallback;
}
function applyTheme(t){
  theme=t; const T=THEMES[t];
  document.documentElement.dataset.theme=t;
  $('#bar').innerHTML=T.bar; $('#h1').textContent=T.h1; $('#sub').textContent=T.sub; $('#cta').textContent=T.cta;
  $('#cdLabel').textContent=T.label; $('#secTitle').textContent=T.sec; $('#secSub').textContent=T.secSub;
  $('#bandTitle').textContent=T.band; $('#bandSub').textContent=T.bandSub; $('#codeText').textContent=T.code;
  $('#popH').textContent=T.popH; $('#popP').textContent=T.popP; $('#popCode').textContent=T.code;
  cd=new Date(T.target).getTime(); tick(); fx.set(T.fx); promoOk=false; renderCart();
}
function tick(){
  let d=Math.max(0,cd-Date.now()), s=Math.floor(d/1000);
  const D=Math.floor(s/86400),H=Math.floor(s%86400/3600),M=Math.floor(s%3600/60),S=s%60;
  const p=n=>String(n).padStart(2,'0');
  $('#cd-d').textContent=p(D);$('#cd-h').textContent=p(H);$('#cd-m').textContent=p(M);$('#cd-s').textContent=p(S);
}
setInterval(()=>{tick(); if(mode==='auto'){const t=autoTheme(); if(t!==theme) applyTheme(t);}},1000);
$$('.switch button').forEach(b=>b.addEventListener('click',()=>{
  mode=b.dataset.th;
  $$('.switch button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  applyTheme(mode==='auto'?autoTheme():mode);
}));

/* đèn dây Noel */
$('#lights').innerHTML='<i></i>'.repeat(22);

/* ================== SẢN PHẨM ================== */
const TAGS=['Tất cả','Quà tặng','Đi chơi','Đi tiệc','Đang giảm giá'];
function renderFilters(){
  $('#filters').innerHTML=TAGS.map(t=>`<button class="chip" aria-pressed="${t===filter}" data-f="${t}">${t}</button>`).join('');
  $$('#filters .chip').forEach(b=>b.onclick=()=>{filter=b.dataset.f;renderFilters();renderGrid();});
}
const sel={}; // size đã chọn theo sản phẩm
function renderGrid(){
  const list=PRODUCTS.filter(p=>filter==='Tất cả'||(filter==='Đang giảm giá'?p.old>0:p.tags.includes(filter)));
  $('#grid').innerHTML=list.map(p=>{
    const pct=p.old?Math.round((1-p.price/p.old)*100):0;
    return `<article class="card">
      <button class="ph" data-open="${p.id}" aria-label="Xem chi tiết ${p.name}">
        <img src="${IMG[p.imgs[0]]}" alt="${p.name}" loading="lazy">
        <span class="badge">${p.badge}</span>${pct?`<span class="off">-${pct}%</span>`:''}
        <span class="gift-tag">🎁 Kèm túi quà 20/10</span>
      </button>
      <div class="info">
        <h3>${p.name}</h3>
        <div class="price"><b>${money(p.price)}</b>${p.old?`<s>${money(p.old)}</s>`:''}</div>
        <div class="sizes" role="group" aria-label="Chọn size">${p.sizes.map(s=>`<button class="size" data-p="${p.id}" data-s="${s}" aria-pressed="${sel[p.id]===s}">${s}</button>`).join('')}</div>
        <button class="add" data-add="${p.id}">Thêm vào giỏ</button>
      </div></article>`;
  }).join('')||'<p class="empty">Chưa có váy trong nhóm này.</p>';
  $$('#grid [data-open]').forEach(b=>b.onclick=()=>openProduct(b.dataset.open));
  $$('#grid .size').forEach(b=>b.onclick=()=>{sel[b.dataset.p]=b.dataset.s;$$(`#grid .size[data-p="${b.dataset.p}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b));});
  $$('#grid [data-add]').forEach(b=>b.onclick=()=>addToCart(b.dataset.add,sel[b.dataset.add],b));
}
function openProduct(id){
  const p=byId(id); let cur=0, size=sel[id]||null;
  const paint=()=>{
    const pct=p.old?Math.round((1-p.price/p.old)*100):0;
    $('#pmSheet').innerHTML=`<button class="x" id="pmX" aria-label="Đóng">✕</button>
    <div class="pd"><div class="gal"><img src="${IMG[p.imgs[cur]]}" alt="${p.name}">
      ${p.imgs.length>1?`<div class="thumbs">${p.imgs.map((k,i)=>`<button data-i="${i}" aria-current="${i===cur}" aria-label="Ảnh ${i+1}"><img src="${IMG[k]}" alt=""></button>`).join('')}</div>`:''}</div>
    <div class="txt"><h2>${p.name}</h2>
      <div class="price"><b>${money(p.price)}</b>${p.old?`<s>${money(p.old)}</s> <span class="off" style="position:static">-${pct}%</span>`:''}</div>
      <ul>${p.desc.map(d=>`<li>${d}</li>`).join('')}</ul>
      <div><b>Chọn size</b><div class="sizes" style="margin-top:6px">${p.sizes.map(s=>`<button class="size" data-s="${s}" aria-pressed="${s===size}">${s}</button>`).join('')}</div></div>
      <button class="add" id="pmAdd" style="margin-top:6px;padding:14px">Thêm vào giỏ</button>
      <a class="btn btn-ghost" style="border-color:var(--line)" target="_blank" rel="noopener" href="https://zalo.me/${CONFIG.zalo}">Nhắn Zalo hỏi size</a></div></div>`;
    $('#pmX').onclick=closePM;
    $$('#pmSheet .thumbs button').forEach(b=>b.onclick=()=>{cur=+b.dataset.i;paint();});
    $$('#pmSheet .size').forEach(b=>b.onclick=()=>{size=b.dataset.s;sel[id]=size;paint();renderGrid();});
    $('#pmAdd').onclick=e=>{ if(addToCart(id,size,e.target)) closePM(); };
  };
  paint(); $('#pm').classList.add('on');
}
function closePM(){ $('#pm').classList.remove('on'); }
$('#pm').addEventListener('click',e=>{if(e.target.id==='pm')closePM();});

/* ================== GIỎ HÀNG ================== */
function addToCart(id,size,btn){
  if(!size){ if(btn){const o=btn.textContent;btn.textContent='Chọn size trước nhé';setTimeout(()=>btn.textContent=o,1400);} return false; }
  const f=cart.find(i=>i.id===id&&i.size===size); f?f.qty++:cart.push({id,size,qty:1});
  saveCart(); if(btn){const o=btn.textContent;btn.textContent='Đã thêm ✓';setTimeout(()=>btn.textContent=o,1200);} return true;
}
function saveCart(){store.set('cx_cart',cart);renderCart();}
const subtotal=()=>cart.reduce((s,i)=>s+byId(i.id).price*i.qty,0);
function renderCart(){
  const n=cart.reduce((s,i)=>s+i.qty,0), sub=subtotal(), disc=promoOk?Math.round(sub*CONFIG.discount):0, total=sub-disc;
  $('#cartN').textContent=n; $('#mTotal').textContent=money(total);
  const left=Math.max(0,CONFIG.freeShip-total), pct=Math.min(100,total/CONFIG.freeShip*100);
  $('#cartBody').innerHTML = n===0 ? '<div class="empty">Giỏ hàng đang trống.<br>Chọn một chiếc váy xinh nhé!</div>' :
    `<div class="ship">${left?`Mua thêm <b>${money(left)}</b> để được freeship`:'Bạn được <b>freeship</b> rồi 🎉'}<div class="track"><i style="width:${pct}%"></i></div></div>`+
    cart.map((i,ix)=>{const p=byId(i.id);return `<div class="ci"><img src="${IMG[p.imgs[0]]}" alt="${p.name}"><div><b>${p.name}</b><small>Size ${i.size} · ${money(p.price)}</small>
      <div class="qty"><button data-q="${ix}" data-d="-1" aria-label="Giảm">−</button><span>${i.qty}</span><button data-q="${ix}" data-d="1" aria-label="Tăng">+</button></div></div>
      <button class="rm" data-rm="${ix}">Xoá</button></div>`;}).join('');
  $('#cartFoot').innerHTML = n===0 ? '' : `
    <div class="promo"><input class="field" id="promoIn" placeholder="Nhập mã giảm giá"><button id="promoBtn">Áp dụng</button></div><div class="msg" id="promoMsg">${promoOk?'Đã áp dụng mã '+THEMES[theme].code:''}</div>
    <div class="row"><span>Tạm tính</span><span>${money(sub)}</span></div>
    ${disc?`<div class="row"><span>Giảm giá</span><span>−${money(disc)}</span></div>`:''}
    <div class="row"><span>Phí ship</span><span>${left?'Tính khi giao':'Miễn phí'}</span></div>
    <div class="row total"><span>Tổng</span><span>${money(total)}</span></div>
    <input class="field" id="cName" placeholder="Họ tên"><input class="field" id="cPhone" placeholder="Số điện thoại" inputmode="tel"><input class="field" id="cAddr" placeholder="Địa chỉ nhận hàng">
    <button class="btn btn-primary" id="checkout" style="width:100%;margin-top:10px">Chốt đơn qua Zalo</button><div class="msg" id="coMsg"></div>`;
  $$('#cartBody [data-q]').forEach(b=>b.onclick=()=>{const it=cart[b.dataset.q];it.qty+=+b.dataset.d;if(it.qty<1)cart.splice(b.dataset.q,1);saveCart();});
  $$('#cartBody [data-rm]').forEach(b=>b.onclick=()=>{cart.splice(b.dataset.rm,1);saveCart();});
  const pb=$('#promoBtn'); if(pb) pb.onclick=()=>{
    const v=$('#promoIn').value.trim().toUpperCase();
    if(v===THEMES[theme].code){promoOk=true;renderCart();} else $('#promoMsg').textContent='Mã chưa đúng, thử lại nhé.';
  };
  const co=$('#checkout'); if(co) co.onclick=()=>{
    const name=$('#cName').value.trim(),phone=$('#cPhone').value.trim(),addr=$('#cAddr').value.trim();
    if(!name||!phone||!addr){$('#coMsg').textContent='Điền đủ họ tên, số điện thoại và địa chỉ giúp shop nhé.';return;}
    const lines=cart.map(i=>`- ${byId(i.id).name} (size ${i.size}) x${i.qty}`).join('\n');
    const txt=`Đơn hàng Chanh Xinhhh\n${lines}\nTổng: ${money(total)}${promoOk?' (đã áp mã '+THEMES[theme].code+')':''}\nKhách: ${name} - ${phone}\nĐịa chỉ: ${addr}`;
    (navigator.clipboard?navigator.clipboard.writeText(txt):Promise.reject()).catch(()=>{});
    $('#coMsg').textContent='Đã sao chép đơn hàng. Dán vào Zalo để gửi cho shop.';
    window.open('https://zalo.me/'+CONFIG.zalo,'_blank','noopener');
  };
}
const openC=()=>{$('#drawer').classList.add('on');$('#ov').classList.add('on');$('#drawer').setAttribute('aria-hidden','false');};
const closeC=()=>{$('#drawer').classList.remove('on');$('#ov').classList.remove('on');$('#drawer').setAttribute('aria-hidden','true');};
$('#openCart').onclick=openC;$('#mCart').onclick=openC;$('#closeCart').onclick=closeC;$('#ov').onclick=closeC;
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeC();closePM();closePop();}});

/* ================== POPUP + MÃ + SOCIAL PROOF ================== */
function closePop(){$('#pop').classList.remove('on');try{sessionStorage.setItem('cx_pop','1')}catch(e){}}
$('#popX').onclick=closePop;$('#popGo').onclick=closePop;$('#pop').addEventListener('click',e=>{if(e.target.id==='pop')closePop();});
setTimeout(()=>{let seen=false;try{seen=sessionStorage.getItem('cx_pop')}catch(e){} if(!seen)$('#pop').classList.add('on');},5000);
$('#copyCode').onclick=e=>{const c=THEMES[theme].code;(navigator.clipboard?navigator.clipboard.writeText(c):Promise.reject()).catch(()=>{});e.target.textContent='Đã sao chép ✓';setTimeout(()=>e.target.textContent='Sao chép',1500);};
const NAMES=['Ngọc','Linh','Trang','Vy','Hà','Thư','My','Chi'], PLACES=['Quận 1','Thủ Đức','Hà Nội','Đà Nẵng','Biên Hoà','Cần Thơ','Quận 7','Hải Phòng'];
let ti=0;
function showToast(){
  const p=PRODUCTS[ti%PRODUCTS.length]; const t=$('#toast');
  t.innerHTML=`<b>${NAMES[(ti*3)%8]}</b> ở ${PLACES[(ti*5)%8]} vừa đặt<br>${p.name}`; t.classList.add('on'); ti++;
  setTimeout(()=>t.classList.remove('on'),4500);
}
setTimeout(()=>{showToast();setInterval(showToast,16000);},9000);
$('#zaloBtn').href='https://zalo.me/'+CONFIG.zalo; $('#zaloShow').textContent=CONFIG.zalo;

/* ================== HIỆU ỨNG RƠI (cánh hoa / tuyết / hoa mai) ================== */
const fx=(()=>{
  const cv=$('#fx'),ctx=cv.getContext('2d');
  let W,H,ps=[],kind='petal',raf=null;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  const size=()=>{W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};
  addEventListener('resize',size);size();

  const pm=()=>Math.random()<.5?-1:1;

  /* Mỗi hạt có "t" từ 0 (nhỏ) đến 1 (to). To thì rơi nhanh hơn, nhỏ thì nhẹ và chậm */
  const mk=init=>{
    const t=Math.random();
    const p={
      t, x:Math.random()*W, y:init?Math.random()*H:-40,
      dir:pm(), a:Math.random()*6.283,
      s:Math.random()*6.283, tw:Math.random()*6.283
    };
    if(kind==='snow'){
      p.r=4+t*10; p.vy=.35+t*1.0; p.spin=.004+t*.012;
      p.sw=.2+t*.3; p.al=.5+t*.45;
    }else if(kind==='mai'){
      p.type=Math.random()<.5?'coin':'lixi';       // ngẫu nhiên: đồng vàng hoặc bao lì xì
      p.r=4+t*5; p.vy=.45+t*.9; p.spin=.01+t*.025;
      p.sw=.3+t*.3; p.al=1;
    }else{
      p.r=3+t*4; p.vy=.4+t*.7; p.spin=.01+t*.02; p.sw=.4; p.al=.9;
    }
    return p;
  };

  /* Bông tuyết 6 cánh */
  function flake(r){
    ctx.strokeStyle='#fff';
    ctx.shadowColor='rgba(170,210,255,.8)';ctx.shadowBlur=3;
    ctx.lineCap='round';ctx.lineWidth=Math.max(.8,r*.1);
    for(let i=0;i<6;i++){
      ctx.save();ctx.rotate(i*Math.PI/3);
      ctx.beginPath();
      ctx.moveTo(0,0);ctx.lineTo(0,-r);
      ctx.moveTo(0,-r*.45);ctx.lineTo(r*.28,-r*.68);
      ctx.moveTo(0,-r*.45);ctx.lineTo(-r*.28,-r*.68);
      ctx.moveTo(0,-r*.72);ctx.lineTo(r*.18,-r*.88);
      ctx.moveTo(0,-r*.72);ctx.lineTo(-r*.18,-r*.88);
      ctx.stroke();ctx.restore();
    }
    ctx.shadowBlur=0;
  }

  /* Đồng vàng tròn, có lỗ vuông và vệt sáng (BẢN ĐẦU TIÊN) */
  function coin(r){
    const g=ctx.createRadialGradient(-r*.3,-r*.3,r*.1,0,0,r);
    g.addColorStop(0,'#FFF7B8');g.addColorStop(.5,'#FFC83D');g.addColorStop(1,'#D98A00');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,6.283);ctx.fill();
    ctx.lineWidth=Math.max(1,r*.1);ctx.strokeStyle='#B8740A';
    ctx.beginPath();ctx.arc(0,0,r*.84,0,6.283);ctx.stroke();            // viền nổi
    const h=r*.3;ctx.fillStyle='#8A4B00';ctx.fillRect(-h,-h,h*2,h*2);   // lỗ vuông
    ctx.fillStyle='rgba(255,255,255,.6)';                                // vệt sáng
    ctx.beginPath();ctx.ellipse(-r*.4,-r*.42,r*.22,r*.09,-.75,0,6.283);ctx.fill();
  }

  /* Tia lấp lánh 4 cánh */
  function spark(r,al){
    ctx.fillStyle=`rgba(255,255,255,${al})`;ctx.beginPath();
    ctx.moveTo(0,-r);ctx.quadraticCurveTo(0,0,r,0);ctx.quadraticCurveTo(0,0,0,r);
    ctx.quadraticCurveTo(0,0,-r,0);ctx.quadraticCurveTo(0,0,0,-r);ctx.fill();
  }

  /* Bao lì xì đỏ viền vàng, có nắp và nút tròn vàng */
  function lixi(r){
    const w=r*1.5,h=r*2.3,k=r*.3;                 // nửa rộng, nửa cao, độ bo góc
    const g=ctx.createLinearGradient(0,-h,0,h);
    g.addColorStop(0,'#F0262E');g.addColorStop(1,'#B80F17');
    ctx.fillStyle=g;ctx.strokeStyle='#F7B928';ctx.lineWidth=Math.max(1,r*.12);
    ctx.beginPath();
    ctx.moveTo(-w+k,-h);ctx.arcTo(w,-h,w,h,k);ctx.arcTo(w,h,-w,h,k);
    ctx.arcTo(-w,h,-w,-h,k);ctx.arcTo(-w,-h,w,-h,k);ctx.closePath();
    ctx.fill();ctx.stroke();
    ctx.beginPath();                               // đường nắp phong bì
    ctx.moveTo(-w,-h*.35);ctx.quadraticCurveTo(0,h*.25,w,-h*.35);ctx.stroke();
    ctx.fillStyle='#FFD84D';                       // nút vàng
    ctx.beginPath();ctx.arc(0,h*.02,r*.5,0,6.283);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.5)';
    ctx.beginPath();ctx.arc(-r*.15,-h*.04,r*.14,0,6.283);ctx.fill();
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(const p of ps){
      ctx.save();ctx.translate(p.x,p.y);ctx.globalAlpha=p.al;
      if(kind==='snow'){
        ctx.rotate(p.a);flake(p.r);
      }else if(kind==='mai'){
        if(p.type==='coin'){
          const R=p.r*1.9;
          ctx.save();ctx.scale(.75+.25*Math.abs(Math.cos(p.a)),1);coin(R);ctx.restore();
          const al=Math.pow(Math.max(0,Math.sin(p.tw)),3);              // lấp lánh
          if(al>.05){ctx.translate(R*.45,-R*.45);spark(R*.9*al+2,al);}
        }else{
          ctx.rotate(Math.sin(p.a)*.6);                                 // bao lì xì đung đưa khi rơi
          lixi(p.r*1.4);
        }
      }else{
        ctx.rotate(p.a);ctx.fillStyle='#F8A5C0';
        ctx.beginPath();ctx.ellipse(0,0,p.r*1.5,p.r*.9,0,0,6.283);ctx.fill();
      }
      ctx.restore();
    }
  }

  function loop(){
    for(const p of ps){
      p.s+=.015;p.tw+=.06;
      p.x+=Math.sin(p.s)*p.sw;
      p.y+=p.vy;
      p.a+=p.dir*p.spin;
      if(p.y>H+40){Object.assign(p,mk(false));}
    }
    draw();raf=requestAnimationFrame(loop);
  }

  function set(k){
    kind=k;const n=innerWidth<700?22:42;
    ps=Array.from({length:n},()=>mk(true));
    if(!raf)loop();
  }
  return {set};
})();
/* ================== KHỞI TẠO ================== */
$$('img[data-src]').forEach(i=>i.src=IMG[i.dataset.src]);
renderFilters(); renderGrid(); renderCart();
applyTheme(autoTheme());
