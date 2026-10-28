const $=s=>document.querySelector(s);
function decoration(parent,file,x,y,w,h,angle=0,opacity=1,flip=false){const img=document.createElement('img');img.src=''+file+'.png';img.alt='';Object.assign(img.style,{left:x+'px',top:(y-62)+'px',width:w+'px',height:h+'px',transform:`rotate(${angle}deg) ${flip?'scaleX(-1)':''}`,opacity});$(parent).append(img)}
[['ff567',142,767,90,120,2.65],['8b5c6',129.5229,539.3911,80,106.667,.56],['d6092',319,505,89,119,14.93],['c2550',328.99995,376.0000,40,53,-16.67],['9e763',-8,432,60,80,-9.87],['e1b18',167,350,60,80,-8.48],['e0f3a',0,854,80,107,0],['36924',8,680,60,80,-6.26],['6d46d',312.0001,671.0000,60,80,-121.77],['31f9b',310,851,70,93,0,1,true]].forEach(v=>decoration('#decor',...v));
decoration('#success-decor','d6092',305,71,106.881,142.509,14.93,.5);decoration('#success-decor','8b5c6',-28,14,119.987,159.982,-7.37,.4);decoration('#success-decor','ff567',55,140,112.332,149.776,-11.61,.3);
// Original image order and individual crops from the three current Figma rows.
const galleryRows=[
  {offset:-85,top:182,photos:[['4ed20'],['bf9d7',{width:'163%',height:'122.25%',left:'-31.5%',top:'-11.13%',objectFit:'fill'}],['d585b'],['59ba1'],['e3fc5',{height:'230px',top:'-47.904px',objectFit:'fill'}]]},
  {offset:-175,top:375,photos:[['d5e6f'],['b2c69'],['01cc4'],['9111b',{width:'118.13%',height:'210%',left:'-8.99%',top:'-73.04%',objectFit:'fill'}],['2f3b5',{width:'135%',height:'101.25%',left:'-17.4%',top:'-.57%',objectFit:'fill'}]]},
  {offset:-112,top:568,photos:[['e05e6'],['2d8e6'],['7e4e1'],['958c7'],['e31bd']]}
];
galleryRows.forEach(({offset,top,photos},row)=>{
  const ribbon=document.createElement('div');ribbon.className='ribbon';ribbon.style.top=top+'px';
  const track=document.createElement('div');track.className='track';track.style.setProperty('--offset',offset+'px');
  for(let repeat=0;repeat<2;repeat++)photos.forEach(([file,crop],index)=>{
    const slot=document.createElement('div');slot.className='gallery-photo';
    slot.style.backgroundImage="url('268b2.png')";
    const img=document.createElement('img');img.src=''+file+'.png';img.alt=repeat?'':`Фото ${index+1}, лента ${row+1}`;
    if(crop)Object.assign(img.style,crop);
    if(repeat)slot.setAttribute('aria-hidden','true');
    slot.append(img);track.append(slot);
  });
  ribbon.append(track);$('#gallery').append(ribbon);
});
let jokeAnimation;
document.querySelectorAll('[name=payment]').forEach(input=>input.addEventListener('change',()=>{
  $('#confirm').disabled=input.value!=='kiss';
  jokeAnimation?.cancel();
  const joke=$('#joke');
  joke.hidden=input.value!=='money';
  if(joke.hidden)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  jokeAnimation=joke.animate([
    {transform:reduced?'none':'translateX(calc(-100% - 20px))',opacity:0,offset:0},
    {transform:'translateX(0)',opacity:1,offset:300/2400},
    {transform:'translateX(0)',opacity:1,offset:2000/2400},
    {transform:'translateX(0)',opacity:0,offset:1}
  ],{duration:2400,easing:'ease',fill:'forwards'});
  jokeAnimation.onfinish=()=>{joke.hidden=true};
}));
$('#confirm').addEventListener('click',()=>{if(document.querySelector('[name=payment]:checked')?.value!=='kiss')return;$('#confirm').disabled=true;$('#confirm').textContent='Подтверждаем…';setTimeout(()=>{$('#welcome').hidden=true;$('#success').hidden=false;resize();window.scrollTo({top:0,behavior:'instant'});$('#success').focus({preventScroll:true})},650)});
$('#kiss').addEventListener('click',()=>{const copy=$('#kiss').cloneNode(true);copy.removeAttribute('id');copy.classList.add('large');copy.setAttribute('tabindex','-1');$('#enlarged').replaceChildren(copy);$('#lightbox').showModal()});$('#close').addEventListener('click',()=>$('#lightbox').close());$('#lightbox').addEventListener('click',e=>{if(e.target===$('#lightbox'))$('#lightbox').close()});
function resize(){const scale=Math.min(1,$('#page').clientWidth/402);document.querySelectorAll('main>section').forEach(el=>{el.style.transform=`scale(${scale})`;el.style.transformOrigin='top left';el.style.marginBottom=-(1-scale)*(el.id==='welcome'?1280:812)+'px'})}addEventListener('resize',resize);resize();




