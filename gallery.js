
(function(){
var b=document.querySelector('.burger'),m=document.getElementById('menu');
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}});
var lb=document.createElement('div');lb.className='lb';
lb.innerHTML='<button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&#10094;</button><img alt=""><button class="n" aria-label="Next">&#10095;</button>';
document.body.appendChild(lb);
var im=lb.querySelector('img'),list=[],i=0;
function show(){im.src=list[i].src;im.alt=list[i].alt}
function open(t){list=[].slice.call(document.querySelectorAll('img.zoom')).filter(function(x){return x.offsetParent!==null});i=Math.max(0,list.indexOf(t));show();lb.querySelector('.p').hidden=lb.querySelector('.n').hidden=list.length<2;lb.classList.add('on')}
function close(){lb.classList.remove('on')}
function go(d){i=(i+d+list.length)%list.length;show()}
document.addEventListener('click',function(e){var t=e.target.closest('img.zoom');if(t&&!lb.contains(t))open(t)});
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('x'))close();else if(e.target.classList.contains('p'))go(-1);else if(e.target.classList.contains('n'))go(1)});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)});
})();

var fb=document.querySelectorAll('.fb'),it=document.querySelectorAll('.item');
fb.forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.f;
fb.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
it.forEach(function(i){i.hidden=!(f==='all'||i.dataset.cat===f)})})});
