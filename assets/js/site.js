
const nav=document.querySelector('.nav');
document.querySelector('.menu-btn')?.addEventListener('click',()=>nav.classList.toggle('open'));

const io=new IntersectionObserver(entries=>entries.forEach(e=>{
 if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}
}),{threshold:.10,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));

function searchBooking(){
 const q=new URLSearchParams({
   checkin:document.querySelector('#checkin')?.value||'',
   checkout:document.querySelector('#checkout')?.value||'',
   guests:document.querySelector('#guests')?.value||'2',
   type:document.querySelector('#staytype')?.value||''
 });
 location.href='booking.html?'+q.toString();
}
(function(){
 const ci=document.querySelector('#checkin'),co=document.querySelector('#checkout');
 if(!ci||!co)return;
 const d=new Date(); const today=d.toISOString().slice(0,10);
 ci.min=today; co.min=today;
 ci.addEventListener('change',()=>{co.min=ci.value||today;if(co.value&&co.value<=ci.value)co.value='';});
})();

(function(){
 const params=new URLSearchParams(location.search);
 const box=document.querySelector('#search-summary');
 if(!box)return;
 const ci=params.get('checkin'),co=params.get('checkout'),g=params.get('guests'),t=params.get('type');
 if(ci||co){box.innerHTML=`<strong>Your search</strong><br>Check-in: ${ci||'—'} &nbsp; Check-out: ${co||'—'} &nbsp; Guests: ${g||'—'} &nbsp; ${t?`Accommodation: ${t}`:''}`;}
})();

function conferenceRequest(){
 const v=id=>document.querySelector(id)?.value?.trim()||'';
 const date=v('#eventdate'),people=v('#attendees'),type=v('#eventtype'),name=v('#eventname'),note=v('#eventnote');
 const msg=`Hello LuRe Boutique Hotel,

I would like to request information about the Conference Room.

Name: ${name||'Not provided'}
Preferred date: ${date||'Not selected'}
Expected guests: ${people||'Not provided'}
Type of event: ${type||'Not provided'}

Message:
${note||'No additional message'}

Please let me know the availability and options.`;
 window.open(`https://wa.me/5978850212?text=${encodeURIComponent(msg)}`,'_blank','noopener');
}

const lb=document.querySelector('.lightbox'),img=lb?.querySelector('img'),cap=lb?.querySelector('.lb-cap');
document.querySelectorAll('[data-lightbox]').forEach(a=>a.addEventListener('click',e=>{
 e.preventDefault(); if(!lb)return; img.src=a.href; cap.textContent=a.dataset.caption||a.querySelector('img')?.alt||''; lb.classList.add('open'); document.body.style.overflow='hidden';
}));
function closeLB(){lb?.classList.remove('open');document.body.style.overflow=''}
document.querySelector('.lb-close')?.addEventListener('click',closeLB);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLB()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});
