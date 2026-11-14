const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches) document.documentElement.classList.add('js-motion');

const rm = motionPreference.matches;
const $ = (id) => document.getElementById(id);
document.querySelectorAll('[data-s]').forEach(el=>{let n=0;const t=el.textContent;el.textContent='';t.split(' ').forEach((w,k,a)=>{const s=document.createElement('span');s.className='wd';[...w].forEach(c=>{const x=document.createElement('span');x.className='ch';x.style.setProperty('--i',n++);x.textContent=c;s.append(x)});el.append(s);if(k<a.length-1){el.append(' ');n++}})});
function animateCounters(container) {
  container.querySelectorAll('[data-n]').forEach((element) => {
    if (rm) return;
    const target = Number(element.dataset.n);
    if (!Number.isFinite(target)) return;
    const decimals = target % 1 ? 2 : 0;
    const suffix = element.dataset.s || '';
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / 1400, 1);
      const value = target * (1 - (1 - progress) ** 3);
      element.textContent = `${value.toFixed(decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const revealElements = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (!isIntersecting) return;
      target.classList.add('on');
      observer.unobserve(target);
      animateCounters(target);
    });
  }, { threshold: 0.15 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add('on');
    animateCounters(element);
  });
}
/* squishy badge: elastic rope + spring body + jelly */
(function(){const lan=$('lan'),bd=$('badge'),bt=$('bt'),hn=$('hint'),r1=$('r1'),r2=$('r2');
const A={x:130,y:0},L=100,REST=108;let P={x:130,y:REST},V={x:0,y:0},th=0,w=0,bn=0,bv=0,sy=1,dr=null,g={x:0,y:0},raf=0;
function step(){if(document.hidden){raf=0;return}if(brk)return fall();const dx=P.x-A.x,dy=P.y-A.y,d=Math.hypot(dx,dy)||1,st=d-L;if(dr&&dy>430){snap();return fall()}let fx=0,fy=.55;
const k=dr?.05:.08;if(st>0){fx-=dx/d*st*k;fy-=dy/d*st*k}if(dr){fx+=(dr.x-P.x)*.3;fy+=(dr.y-P.y)*.3}
V.x=(V.x+fx)*(rm?.8:.9);V.y=(V.y+fy)*(rm?.8:.9);P.x+=V.x;P.y+=V.y;
const dd=Math.hypot(P.x-A.x,P.y-A.y);if(dd>520){P.x=A.x+(P.x-A.x)/dd*520;P.y=A.y+(P.y-A.y)/dd*520}
const tg=-Math.atan2(P.x-A.x,Math.max(P.y-A.y,20))*57.3;w=(w+(tg-th)*.07-V.x*.03)*.78;th+=w;
bv=(bv-bn*.2-V.x*.12-w*.15)*.78;bn+=bv;bn=Math.max(-10,Math.min(10,bn));
const sp=Math.hypot(V.x,V.y),ts=1+Math.min(.1,sp*.006+Math.max(0,st)/300*.25);sy+=(ts-sy)*.35;const sx=1/Math.sqrt(sy);
bd.style.transform=`translate(${P.x-125}px,${P.y}px) rotate(${th}deg) skewX(${bn*.4}deg) scale(${sx},${sy})`;
const sag=Math.max(0,L-dd)*.7,T=Math.max(0,Math.min(1,(dy-260)/170)),wd=16-T*9,p=`M${A.x} ${A.y}Q${(A.x+P.x)/2} ${(A.y+P.y)/2+sag} ${P.x} ${P.y+14}`;
r1.setAttribute('d',p);r2.setAttribute('d',p);r1.setAttribute('stroke-width',wd);r2.setAttribute('stroke-width',wd);r1.setAttribute('stroke',T?`hsl(${45-45*T} 90% ${50-6*T}%)`:'#e8b514');
if(!dr&&sp<.04&&Math.abs(w)<.04&&Math.abs(bv)<.04&&Math.abs(P.y-REST)<1.5&&Math.abs(P.x-130)<1.5){P={x:130,y:REST};th=0;bn=0;sy=1;V={x:0,y:0};raf=0;return step1()}raf=requestAnimationFrame(step)}
let brk=false,spin=0,RE=null,ft=0;
function snap(){brk=true;dr=null;bd.classList.remove('drag');bd.style.pointerEvents='none';hn.classList.add('off');spin=(V.x>=0?1:-1)*(2+Math.abs(V.x)*.3);V.y=Math.max(V.y,3);RE={x:P.x,y:P.y+14};ft=0;bt.textContent='Reattach badge'}
function fall(){ft++;V.y+=.9;P.x+=V.x;P.y+=V.y;th+=spin;RE.x+=(A.x-RE.x)*.22+Math.sin(ft*1.3)*Math.max(0,10-ft*.4);RE.y+=(A.y-RE.y)*.22;
bd.style.transform=`translate(${P.x-125}px,${P.y}px) rotate(${th}deg)`;const p=`M${A.x} ${A.y}Q${(A.x+RE.x)/2+Math.sin(ft)*8} ${(A.y+RE.y)/2} ${RE.x} ${RE.y}`;r1.setAttribute('d',p);r2.setAttribute('d',p);r1.setAttribute('stroke','#e8b514');r1.setAttribute('stroke-width',9);r2.setAttribute('stroke-width',9);
r1.style.opacity=r2.style.opacity=Math.max(0,1-ft/28);if(P.y>1100){show(false);return}raf=requestAnimationFrame(fall)}
function step1(){r1.setAttribute('stroke','#e8b514');r1.setAttribute('stroke-width',16);r2.setAttribute('stroke-width',16);bd.style.transform=`translate(5px,${REST}px)`;r1.setAttribute('d',`M130 0L130 ${REST+14}`);r2.setAttribute('d',`M130 0L130 ${REST+14}`)}
const go=()=>{if(!raf)raf=requestAnimationFrame(step)},loc=e=>{const r=lan.getBoundingClientRect(),k=r.width/260;return{x:(e.clientX-r.left)/k,y:(e.clientY-r.top)/k}};
const compactBadge=matchMedia('(max-width:1200px)');let lastScrollY=scrollY,downwardScroll=0;
function show(on){
  if(!on&&lan.contains(document.activeElement))bt.focus();
  lan.classList.toggle('show',on);lan.inert=!on;lan.setAttribute('aria-hidden',String(!on));
  bt.textContent=on?'Hide badge':'Show badge';bt.setAttribute('aria-pressed',String(on));
  if(!on){if(raf)cancelAnimationFrame(raf);raf=0;dr=null;bd.classList.remove('drag');bd.style.pointerEvents='';return}
  downwardScroll=0;brk=false;bd.style.pointerEvents='';r1.style.opacity=r2.style.opacity=1;hn.classList.remove('off');P=rm?{x:130,y:REST}:{x:130,y:-320};V={x:0,y:0};th=w=bn=bv=0;go();
}
bt.onclick=()=>show(!lan.classList.contains('show'));
addEventListener('scroll',()=>{const current=scrollY,delta=current-lastScrollY;lastScrollY=current;downwardScroll=delta>0?downwardScroll+delta:0;if(compactBadge.matches&&current>24&&downwardScroll>=16&&lan.classList.contains('show'))show(false)},{passive:true});
bd.addEventListener('pointerdown',e=>{if(compactBadge.matches&&e.pointerType==='touch')return;e.preventDefault();bd.setPointerCapture(e.pointerId);const q=loc(e);g={x:P.x-q.x,y:P.y-q.y};dr={x:P.x,y:P.y};bd.classList.add('drag');hn.classList.add('off');go()});
bd.addEventListener('pointermove',e=>{if(!dr)return;const q=loc(e);dr={x:q.x+g.x,y:q.y+g.y}});
const up=()=>{dr=null;bd.classList.remove('drag');go()};bd.addEventListener('pointerup',up);bd.addEventListener('pointercancel',up);
bd.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();V.x+=e.key==='ArrowRight'?14:e.key==='ArrowLeft'?-14:0;V.y+=e.key==='ArrowDown'?18:0;hn.classList.add('off');go()}});
step1();if(innerWidth>1200)setTimeout(()=>show(true),900)})();
const st=document.querySelector('.stage'),im=[...st.querySelectorAll('.ph .screen-trigger')],cp=[...st.querySelectorAll('.cap div')],dt=[...st.querySelectorAll('.dots i')];
const prototypePrev=document.getElementById('prototype-prev'),prototypeNext=document.getElementById('prototype-next'),prototypeStatus=document.getElementById('prototype-status');
const mobilePrototype=matchMedia('(max-width:1100px)');
let activePrototypeStep=-1,prototypeMode='';
const mobileShowcase=st.querySelector('.mobile-showcase');
cp.forEach((caption,i)=>{
  const step=document.createElement('article');step.className='mobile-step';
  const copy=caption.cloneNode(true);copy.className='mobile-copy';
  const preview=document.createElement('div');preview.className='mobile-preview';
  const trigger=im[i].cloneNode(true);trigger.removeAttribute('style');
  const image=trigger.querySelector('img');image.width=340;image.height=680;
  preview.append(trigger);
  step.append(copy,preview);mobileShowcase.append(step);
});
document.documentElement.classList.add('mobile-showcase-ready');
function showPrototypeStep(index,mobile){
  const a=Math.max(0,Math.min(cp.length-1,index)),changed=a!==activePrototypeStep;
  if(mobile)im.forEach((m,i)=>{const o=i-a,ab=Math.abs(o);m.style.transform=`translateX(${o*52}%) translateZ(${-ab*65}px) rotateY(${-o*18}deg) scale(${Math.max(.55,1-ab*.2)})`;m.style.opacity=ab>1.6?0:1-ab*.28;m.style.zIndex=10-Math.round(ab*3);m.style.filter=ab<.5?'':'saturate(.6) brightness(.95)';m.tabIndex=i===a?0:-1;m.inert=i!==a;m.style.pointerEvents=i===a?'':'none'});
  cp.forEach((c,i)=>c.classList.toggle('on',i===a));dt.forEach((d,i)=>d.classList.toggle('on',i===a));
  activePrototypeStep=a;prototypePrev.disabled=a===0;prototypeNext.disabled=mobile&&a===cp.length-1;
  prototypeNext.textContent=!mobile&&a===cp.length-1?'↓':'→';
  prototypeNext.setAttribute('aria-label',!mobile&&a===cp.length-1?'Continue past prototype':'Next prototype screen');
  if(changed)prototypeStatus.textContent=`Screen ${a+1} of ${cp.length}`;
}
function up(){
  if(mobilePrototype.matches){if(prototypeMode!=='mobile'){prototypeMode='mobile';showPrototypeStep(activePrototypeStep<0?0:activePrototypeStep,true)}return}
  prototypeMode='desktop';if(rm)return;
  const r=st.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/(r.height-innerHeight))),f=p*3,a=Math.round(f),compact=innerHeight<=700,gap=.52;
  im.forEach((m,i)=>{const o=i-f,ab=Math.abs(o);m.style.transform=`translateX(${o*gap*100}%) translateZ(${-ab*(compact?65:120)}px) rotateY(${-o*(compact?18:26)}deg) scale(${Math.max(.55,1-ab*.2)})`;m.style.opacity=ab>1.6?0:1-ab*.28;m.style.zIndex=10-Math.round(ab*3);m.style.filter=ab<.5?'':'saturate(.6) brightness(.95)';m.tabIndex=i===a?0:-1;m.inert=false;m.style.pointerEvents=''});
  showPrototypeStep(a,false);
}
function goToPrototypeStep(index){
  if(mobilePrototype.matches){showPrototypeStep(index,true);return}
  if(index>=cp.length){st.nextElementSibling.scrollIntoView({behavior:rm?'instant':'smooth',block:'start'});return}
  const stageTop=scrollY+st.getBoundingClientRect().top;
  scrollTo({top:stageTop+(st.offsetHeight-innerHeight)*index/(cp.length-1),behavior:rm?'instant':'smooth'});
}
prototypePrev.addEventListener('click',()=>goToPrototypeStep(activePrototypeStep-1));
prototypeNext.addEventListener('click',()=>goToPrototypeStep(activePrototypeStep+1));
addEventListener('scroll',up,{passive:true});addEventListener('resize',up);up();

// Accessible, lazy-loaded interactive prototype dialog.
(() => {
  const modal = document.getElementById('app-modal');
  const preview = document.getElementById('prototype-preview-image');
  const fullscreenLink = document.getElementById('open-fullscreen');
  const closeButton = document.getElementById('close-demo');
  let returnFocus = null;
  let previousBodyOverflow = '';

  function open(event) {
    returnFocus = event.currentTarget;
    previousBodyOverflow = document.body.style.overflow;
    const source = event.currentTarget.querySelector('img');
    const screenTitle = source.alt || 'BasaWisyo prototype screen';
    preview.src = source.currentSrc || source.src;
    preview.alt = screenTitle;
    document.getElementById('demo-title').textContent = screenTitle;
    document.getElementById('open-fullscreen').href = preview.src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function close() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousBodyOverflow;
    if (returnFocus?.isConnected) returnFocus.focus();
  }

  document.querySelectorAll('.screen-trigger').forEach((button) => {
    button.addEventListener('click', open);
  });
  closeButton.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = [...modal.querySelectorAll('a[href], button:not([disabled])')]
      .filter((element) => element.getClientRects().length);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();

// Keep the return control out of the way until the hero has passed.
(() => {
  const backToTop = document.getElementById('back-to-top');
  const hero = document.querySelector('.hero');
  if (!backToTop || !hero) return;
  const update = () => { backToTop.hidden = hero.getBoundingClientRect().bottom > 0; };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      backToTop.hidden = entry.boundingClientRect.bottom > 0;
    }, { threshold: 0 }).observe(hero);
  } else {
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
  }
  update();
})();
