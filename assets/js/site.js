
const WA = '5978850212';

const nav = document.querySelector('.nav');
document.querySelector('.menu-btn')?.addEventListener('click', () => nav.classList.toggle('open'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12, rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function setDateMinimums(){
  const ci=document.querySelector('#checkin'), co=document.querySelector('#checkout');
  if(!ci || !co) return;
  const d=new Date(), y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0');
  const today=`${y}-${m}-${day}`; ci.min=today; co.min=today;
  ci.addEventListener('change',()=>{co.min=ci.value||today;if(co.value && co.value<=ci.value)co.value='';});
}
setDateMinimums();

function reserveWhatsApp(){
  const val = id => document.querySelector(id)?.value || 'Not selected';
  const ci=val('#checkin'), co=val('#checkout');
  if(ci==='Not selected' || co==='Not selected'){
    alert('Please select your check-in and check-out dates.');
    return;
  }
  const message =
`Hello LuRe Boutique Hotel,

I would like to check availability.

Check-in: ${ci}
Check-out: ${co}
Guests: ${val('#guests')}
Accommodation: ${val('#staytype')}

Please let me know what is available.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(message)}`,'_blank','noopener');
}
function messageWhatsApp(subject='a stay at LuRe'){
  const msg=`Hello LuRe Boutique Hotel,\n\nI would like more information about ${subject}.`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
}

// Gallery lightbox
const lb=document.querySelector('.lightbox'), lbImg=lb?.querySelector('img'), lbCap=lb?.querySelector('.lightbox-caption');
document.querySelectorAll('[data-lightbox]').forEach(el=>{
  el.addEventListener('click', e=>{
    e.preventDefault();
    if(!lb) return;
    const img=el.querySelector('img') || el;
    lbImg.src=el.href || img.src;
    lbImg.alt=img.alt || '';
    lbCap.textContent=el.dataset.caption || img.alt || '';
    lb.classList.add('open');
    document.body.style.overflow='hidden';
  });
});
function closeLightbox(){
  lb?.classList.remove('open');
  document.body.style.overflow='';
}
document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
lb?.addEventListener('click',e=>{if(e.target===lb)closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});
