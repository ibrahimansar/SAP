/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define('sap/ui/qunit/QUnitUtils',['jquery.sap.global','sap/base/util/ObjectPath','sap/ui/Device','sap/ui/base/DataType','sap/ui/events/KeyCodes',"sap/base/strings/camelize","sap/base/strings/capitalize","sap/base/util/UriParameters","sap/base/Log","sap/ui/dom/jquery/control"],function(q,O,D,f,K,g,h,U,L){"use strict";if(typeof QUnit!=='undefined'){var k=!(parseFloat(QUnit.version)>=2.0);var p=U.fromQuery(window.location.search);if(k){QUnit.equals=window.equals=window.equal;}var t=p.get("sap-ui-qunittimeout");if(t!=null||!("testTimeout"in QUnit.config)){if(!t||isNaN(t)){t="30000";}QUnit.config.testTimeout=parseInt(t);}if(k){QUnit.config.reorder=false;}if(window["sap-ui-qunit-coverage"]!=="client"&&/x|true/i.test(p.get("coverage-report"))){QUnit.done(function(a,b){if(window._$blanket){var c=window.QUnit;window.QUnit=undefined;sap.ui.requireSync("sap/ui/thirdparty/blanket");window.QUnit=c;window.blanket.report({});}});}}q.now=function(){return Date.now();};var Q={};Q.delayTestStart=function(d){QUnit.config.autostart=false;if(d){window.setTimeout(function(){QUnit.start();},d);}else{q(function(){QUnit.start();});}};var m=q.noop;try{new q.Event({type:"mousedown"}).preventDefault();}catch(e){m=function(o){if(o){o.preventDefault=o.preventDefault||q.noop;o.stopPropagation=o.stopPropagation||q.noop;o.stopImmediatePropagation=o.stopImmediatePropagation||q.noop;}};var u=q.Event;q.Event=function(s,a){var b=new u(s,a);m(b.originalEvent);return b;};q.Event.prototype=u.prototype;}function w(E,T,P){var o=q.Event({type:E});if(T!=null){o.target=T;}if(P){for(var x in P){o[x]=P[x];if(x==='originalEvent'){m(o[x]);}else{o.originalEvent[x]=P[x];}}}return o;}Q.triggerEvent=function(E,T,P){if(typeof(T)=="string"){T=T?document.getElementById(T):null;}var o=w(E,null,P);q(T).trigger(o);};Q.triggerTouchEvent=function(E,T,P,s){if(typeof(T)=="string"){T=T?document.getElementById(T):null;}var o=w(E,T,P),a=q(T).control(0),b=(s==null?'on':s)+E;if(a&&a[b]){a[b].call(a,o);}};function y(s){if(!s){return undefined;}if(!isNaN(s)){var a=Object.keys(K).filter(function(b){return K[b]===s;});if(a.length===1){s=a[0];}}if(s.toLowerCase().startsWith("numpad_")){return"NUMPAD";}}function z(s){if(!isNaN(s)){s=A(s);}if(!s){return undefined;}s=s.toLowerCase();s=g(s.replace(/_/g,"-"));var a=h(s);if(a.startsWith("Digit")){return a.substring("Digit".length);}else if(a.startsWith("Numpad")){a=a.substring("Numpad".length);}switch(a){case"Break":return"Pause";case"Space":return" ";case"Print":return"PrintScreen";case"Windows":return"Meta";case"Sleep":return"Standby";case"TurnOff":return"PowerOff";case"Asterisk":return"*";case"Plus":return"+";case"Minus":return"-";case"Comma":return",";case"Slash":return"/";case"OpenBracket":return";";case"Dot":return".";case"Pipe":return"|";case"Semicolon":return";";case"Equals":return"=";case"SingleQUote":return"=";case"Backslash":return"\\";case"GreatAccent":return"`";default:return a;}}function A(i){for(var s in K){if(K.hasOwnProperty(s)){if(K[s]===i){return s;}}}}Q.triggerKeyEvent=function(E,T,s,S,a,c){var P={};var b=!isNaN(s);P.keyCode=b?s:K[s];if(b){s=A(s);}P.key=z(s);P.location=y(s);P.which=P.keyCode;P.shiftKey=S;P.altKey=a;P.metaKey=c;P.ctrlKey=c;Q.triggerEvent(E,T,P);};Q.triggerKeydown=function(T,s,S,a,c){Q.triggerKeyEvent("keydown",T,s,S,a,c);};Q.triggerKeyup=function(T,s,S,a,c){Q.triggerKeyEvent("keyup",T,s,S,a,c);};Q.triggerKeyboardEvent=function(T,s,S,a,c){Q.triggerKeydown(T,s,S,a,c);};Q.triggerKeypress=function(T,c,s,a,C){var _=c&&c.toUpperCase();if(K[_]===null){QUnit.ok(false,"Invalid character for triggerKeypress: '"+c+"'");}var b=c.charCodeAt(0);var P={};P.charCode=b;P.which=b;P.key=z(_);P.location=y(_);P.shiftKey=!!s;P.altKey=!!a;P.metaKey=!!C;P.ctrlKey=!!C;Q.triggerEvent("keypress",T,P);};Q.triggerCharacterInput=function(i,c,v){Q.triggerKeypress(i,c);if(typeof(i)=="string"){i=i?document.getElementById(i):null;}var I=q(i);if(typeof v!=="undefined"){I.val(v);}else{I.val(I.val()+c);}};Q.triggerMouseEvent=function(T,E,o,i,P,a,b){var c={};c.offsetX=o;c.offsetY=i;c.pageX=P;c.pageY=a;c.button=b;Q.triggerEvent(E,T,c);};Q._removeAllWhitespaces=function(T){return T.replace(/\s/g,"");};Q.triggerSelectAll=function(){document.getSelection().selectAllChildren(document.body);};Q.isSelectedTextEqual=function(T){var s=Q.getSelectedText();return T?T===s:!!s;};Q.includesSelectedText=function(T){var s=Q.getSelectedText();if(!T){return!!s;}if(!Array.isArray(T)){T=[T];}return T.every(function(a){return s.indexOf(a)>-1;});};Q.getSelectedText=function(){return Q._removeAllWhitespaces(document.getSelection().toString());};var F={'normal':400,'bold':700};q.fn.extend({_sapTest_dataEvents:function(){var a=this[0];return a?q._data(a,"events"):null;},_sapTest_cssFontWeight:function(){var v=this.css("font-weight");return v?F[v]||v:v;}});(function(){function v(a){L.info(a);}var M={"boolean":[false,true],"int":[0,1,5,10,100],"float":[NaN,0.0,0.01,3.14,97.7],"string":["","some","very long otherwise not normal and so on whatever","<"+"script>alert('XSS attack!');</"+"script>"]};var x=Object.create(M);function B(o){return o&&!(o instanceof Array)?[o]:o;}Q.resetDefaultTestValues=function(T){if(typeof T==="string"){delete x[T];}else{x=Object.create(M);}};Q.setDefaultTestValues=function(T,V){if(typeof T==="string"){x[T]=B(V);}else if(typeof T==="object"){q.extend(x,T);}};Q.createSettingsDomain=function(c,P){function a(T){if(x[T]){return x[T];}try{q.sap.require(T);}catch(e){}var i=O.get(T);if(!(i instanceof f)){var r=[];for(var n in i){r.push(i[n]);}x[T]=r;return r;}return[];}var c=new c().getMetadata().getClass();var P=P||{};var b={};var o=c.getMetadata().getAllProperties();for(var d in o){b[d]=B(P[d])||a(o[d].type);}return b;};Q.genericTest=function(c,a,T){if(T&&T.skip===true){return;}var c=new c().getMetadata().getClass();var T=T||{};var o=Q.createSettingsDomain(c,T.allPairTestValues||{});v("domain");for(var n in o){var l=o[n].length;var s=[];s.push("  ",n,":","[");for(var i=0;i<l;i++){s.push(o[n][i],",");}s.push("]");v(s.join(""));}function b(P,N){return P+N.substring(0,1).toUpperCase()+N.substring(1);}function d(C,S){var r={};for(var J in S){if(C[b("get",J)]){r[J]=C[b("get",J)]();}}return r;}var C;var S;var j=new Q.AllPairsGenerator(o);var E=[];while(j.hasNext()){E.push(j.next());}var G=0;function H(){v("testNextCombination("+G+")");if(G>=E.length){v("last combination -> done");QUnit.start();return;}C=new c(S);var r=d(C,S);QUnit.deepEqual(r,S,"settings");C.placeAt(a);v("before explicit rerender");C.getUIArea().rerender();v("after explicit rerender");v("info");setTimeout(I,0);}QUnit.stop(15000);H();function I(){v("continueAfterRendering("+G+")");var J=E[E.length-G-1];for(var N in J){var r=C[b("set",N)](J[N]);QUnit.equal(C[b("get",N)](),J[N],"setter for property '"+N+"'");QUnit.ok(r==C,"setter for property '"+N+"' supports chaining (after rendering)");}G=G+1;setTimeout(H,0);}};Q.suppressErrors=function(s){if(s!==false){v("suppress global errors");}else{v("reenable global errors");}};Q.RandomPairsGenerator=function(d){var C=0;for(var n in d){if(d[n]&&!(d[n]instanceof Array)){d[n]=[d[n]];}if(d[n]&&d[n].length>0){if(C==0){C=d[n].length;}else{C=C*d[n].length;}}}function a(i){var s={};for(var b in d){var l=d[b]&&d[b].length;if(l==1){s[b]=d[b][0];}else if(l>1){var c=i%l;s[b]=d[b][c];i=(i-c)/l;}}return s;}this.hasNext=function(){return true;};this.next=function(){return a(Math.floor(100*C*Math.random()));};};Q.AllPairsGenerator=function(o){var l=[];for(var n in o){l.push({name:n,n:o[n].length,values:o[n]});}var N=l.length;var r=[];var s=[];var C=0;for(var a=0;a<N-1;a++){var E=l[a];for(var b=a+1;b<N;b++){var G=l[b];s[a*N+b]=C;for(var i=E.n*G.n;i>0;i--){r[C++]=0;}}}function H(a,b,c,d){return s[a*N+b]+c*l[b].n+d;}function I(){var R=[];function S(a,W){var Y={va:W,pairs:0,redundant:0};for(var c=0;c<N;c++){var Z;if(c<a){Z=r[H(c,a,R[c],W)];}else if(c>a){var j=H(a,c,W,0),$=j+l[c].n;for(Z=r[j];Z>0&&i<$;j++){if(r[j]<Z){Z=r[j];}}}Y.redundant=Y.redundant+Z;if(Z==0){Y.pairs++;}}return Y;}for(var d=0;d<N;d++){var T=l[d];var V=S(d,0);for(var W=1;W<T.n;W++){var X=S(d,W);if(X.pairs>V.pairs||(X.pairs==V.pairs&&X.redundant<V.redundant)){V=X;}}R[d]=V.va;}return R;}this.hasNext=function(){return C>0;};var J;var P=-1;this.next=function(){J=I();P=0;var c={};for(var a=0;a<N;a++){for(var b=a+1;b<N;b++){var i=H(a,b,J[a],J[b]);if(r[i]==0){C--;P++;}r[i]++;}c[l[a].name]=l[a].values[J[a]];}return c;};this.lastPairs=function(){return P;};};}());O.set("sap.ui.test.qunit",Q);window.qutils=Q;return Q;},true);