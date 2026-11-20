
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

(function(){
var d=document.getElementById('date'),t=document.getElementById('time'),sum=document.getElementById('sum');
var boxes=[].slice.call(document.querySelectorAll('input[name=svc]'));
var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
function pad(n){return n<10?'0'+n:''+n}
var n=new Date();d.min=n.getFullYear()+'-'+pad(n.getMonth()+1)+'-'+pad(n.getDate());
function day(){return d.value?new Date(d.value+'T12:00:00').getDay():-1}
function fd(v){if(!v)return '—';var p=v.split('-');return Number(p[2])+' '+MON[Number(p[1])-1]+' '+p[0]}
function hours(){var w=day(),m=document.getElementById('dmsg');
if(w===0){m.textContent='We are closed on Sundays. Please choose another date.';t.value='';t.disabled=true;return false}
m.textContent='';t.disabled=false;t.min='08:30';t.max=w===6?'17:00':'19:00';return true}
function chosen(){return boxes.filter(function(b){return b.checked})}
function val(id){return document.getElementById(id).value.trim()}
function update(){var c=chosen(),tot=0,rows='';
c.forEach(function(b){var p=b.dataset.price;if(p)tot+=Number(p);rows+='<tr><td>'+b.value+'</td><td>'+(p?'R'+p:'Price to be confirmed')+'</td></tr>'});
sum.innerHTML='<dl><dt>Customer</dt><dd>'+(val('name')||'—')+'</dd><dt>Appointment Date</dt><dd>'+fd(d.value)+'</dd><dt>Preferred Time</dt><dd>'+(t.value||'—')+'</dd></dl>'
+(c.length?'<table>'+rows+'</table><p class="tot">Estimated Total: R'+tot+'</p>':'<p>No services selected yet.</p>')
+'<p class="small">Final appointment and service details must be confirmed by the salon.</p>'}
function err(id,msg){document.getElementById(id).textContent=msg;return !msg}
function check(){var ok=true,first=null;
function f(id,good,msg,el){if(!err(id,good?'':msg)){ok=false;if(!first)first=el}}
f('e-name',val('name').length>1,'Please enter your full name.',document.getElementById('name'));
f('e-phone',/^\+?\d{9,15}$/.test(val('phone').replace(/[\s()-]/g,'')),'Please enter a valid phone number.',document.getElementById('phone'));
f('e-date',!!d.value&&day()!==0&&d.value>=d.min,d.value&&day()===0?'We are closed on Sundays.':'Please select a valid date.',d);
var tv=t.value,okT=!!tv&&tv>=t.min&&tv<=t.max;
f('e-time',okT,'Please choose a time between '+t.min+' and '+t.max+'.',t);
f('e-svc',chosen().length>0,'Please select at least one service.',document.getElementById('knotless'));
if(first)first.scrollIntoView({behavior:'smooth',block:'center'});return ok}
function send(){if(!check())return;var c=chosen(),tot=0,L=[];
c.forEach(function(b){var p=b.dataset.price;if(p)tot+=Number(p);L.push('- '+b.value+': '+(p?'R'+p:'price to be confirmed'))});
var msg='GC Hair Salon WhatsApp Booking\nHello GC Hair Salon!\nI would like to request an appointment.\n\nCUSTOMER DETAILS\nFull Name: '+val('name')+'\nPhone: '+val('phone')
+'\n\nAPPOINTMENT DETAILS\nDate: '+fd(d.value)+'\nPreferred Time: '+t.value+'\n\nSELECTED SERVICES\n'+L.join('\n')+'\nEstimated Total: R'+tot
+'\n\nAdditional Notes: '+(val('notes')||'No additional requests.')+'\n\nPlease confirm my appointment.\nThank you!';
window.open('https://wa.me/27721810706?text='+encodeURIComponent(msg),'_blank','noopener')}
d.addEventListener('change',function(){hours();update()});
document.getElementById('bf').addEventListener('input',update);
document.getElementById('bf').addEventListener('change',update);
document.getElementById('send').addEventListener('click',send);
var q=new URLSearchParams(location.search).get('service');
if(q)boxes.forEach(function(b){if(b.dataset.id===q)b.checked=true});
hours();update();
})();
