var emps=[];
var $=function(i){return document.getElementById(i)};
var fmt=function(n){return "$"+Math.round(n).toLocaleString("es-CO")};
function calc(e){
 var aux=+$("pAux").value,vh=e.sal/240,r={};
 r.bruto=e.sal/30*e.dias;
 r.vaux=aux/30*e.dias;
 r.vaed=vh*(+$("pDiu").value)*e.caed;
 r.vaen=vh*(+$("pNoc").value)*e.chen;
 r.tdev=r.bruto+r.vaux+r.vaed+r.vaen+e.com;
 r.salud=r.tdev*(+$("pSalud").value)/100;
 r.pens=r.tdev*(+$("pPens").value)/100;
 r.tded=r.salud+r.pens+e.pre;
 r.pagar=r.tdev-r.tded;
 r.aux=aux;
 return r;
}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function render(){
 var b="",T={tdev:0,salud:0,pens:0,pre:0,tded:0,pagar:0};
 emps.forEach(function(e,i){
  var r=calc(e);
  T.tdev+=r.tdev;T.salud+=r.salud;T.pens+=r.pens;T.pre+=e.pre;T.tded+=r.tded;T.pagar+=r.pagar;
  b+="<tr><td class='l'>"+esc(e.doc)+"</td><td class='l'>"+esc(e.nom)+"</td><td>"+fmt(e.sal)+"</td><td>"+e.dias+"</td><td>"+fmt(r.bruto)+"</td><td>"+fmt(r.aux)+"</td><td>"+fmt(r.vaux)+"</td><td>"+e.caed+"</td><td>"+fmt(r.vaed)+"</td><td>"+e.chen+"</td><td>"+fmt(r.vaen)+"</td><td>"+fmt(e.com)+"</td><td><b>"+fmt(r.tdev)+"</b></td><td>"+fmt(r.salud)+"</td><td>"+fmt(r.pens)+"</td><td>"+fmt(e.pre)+"</td><td><b>"+fmt(r.tded)+"</b></td><td><b>"+fmt(r.pagar)+"</b></td><td><button class='x' data-i='"+i+"' title='Eliminar'>✕</button></td></tr>";
 });
 $("body").innerHTML=b||"<tr><td colspan='19' class='l'>Sin empleados registrados.</td></tr>";
 $("foot").innerHTML="<tr><td class='l' colspan='12'>TOTALES</td><td>"+fmt(T.tdev)+"</td><td>"+fmt(T.salud)+"</td><td>"+fmt(T.pens)+"</td><td>"+fmt(T.pre)+"</td><td>"+fmt(T.tded)+"</td><td>"+fmt(T.pagar)+"</td><td></td></tr>";
 $("kN").textContent=emps.length;$("kD").textContent=fmt(T.tdev);$("kX").textContent=fmt(T.tded);$("kP").textContent=fmt(T.pagar);
}
$("add").onclick=function(){
 var e={doc:$("doc").value.trim(),nom:$("nom").value.trim(),sal:+$("sal").value,dias:+$("dias").value,caed:+$("caed").value||0,chen:+$("chen").value||0,com:+$("com").value||0,pre:+$("pre").value||0};
 if(!e.doc||!e.nom||!(e.sal>0)){$("err").textContent="Completa documento, nombre y salario base.";return}
 if(e.dias<0||e.dias>30){$("err").textContent="Los días deben estar entre 0 y 30.";return}
 $("err").textContent="";emps.push(e);
 ["doc","nom","sal"].forEach(function(i){$(i).value=""});
 render();
};
$("clear").onclick=function(){emps=[];render()};
$("body").onclick=function(ev){var i=ev.target.getAttribute("data-i");if(i!==null){emps.splice(+i,1);render()}};
["pAux","pSalud","pPens","pDiu","pNoc"].forEach(function(i){$(i).oninput=render});
render();