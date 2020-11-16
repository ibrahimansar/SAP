/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./TextField','./library','./TextAreaRenderer','sap/ui/Device','sap/ui/events/KeyCodes','sap/ui/dom/jquery/cursorPos','sap/ui/dom/jquery/selectText'],function(q,T,l,a,D,K){"use strict";var b=T.extend("sap.ui.commons.TextArea",{metadata:{library:"sap.ui.commons",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},cols:{type:"int",group:"Dimension",defaultValue:null},rows:{type:"int",group:"Dimension",defaultValue:null},wrapping:{type:"sap.ui.core.Wrapping",group:"Appearance",defaultValue:null},cursorPos:{type:"int",group:"Appearance",defaultValue:null},explanation:{type:"string",group:"Misc",defaultValue:null},labeledBy:{type:"string",group:"Identification",defaultValue:null,deprecated:true}}}});b.prototype.exit=function(){this._detachEventHandler();};b.prototype.onBeforeRendering=function(){this._detachEventHandler();};b.prototype.onAfterRendering=function(){T.prototype.onAfterRendering.apply(this,arguments);this._attachEventHandler();};b.prototype._attachEventHandler=function(){var $=this.$();this.proChHandlerId=$.on('propertychange',q.proxy(this.oninput,this));};b.prototype._detachEventHandler=function(){var $=this.$();if(this.proChHandlerId){$.off('propertychange',this.oninput);this.proChHandlerId=null;}};b.prototype.onfocusin=function(e){T.prototype.onfocusin.apply(this,arguments);this.bFocus=true;e.preventDefault();};b.prototype.onsapfocusleave=function(e){T.prototype.onsapfocusleave.apply(this,arguments);var f=this.getFocusDomRef();if(f&&D.browser.firefox){if(f.selectionStart!=f.selectionEnd){q(f).selectText(f.selectionStart,f.selectionStart);}}this.bFocus=false;e.preventDefault();e.stopPropagation();};b.prototype.applyFocusInfo=function(f){T.prototype.applyFocusInfo.apply(this,arguments);return this;};b.prototype.onkeypress=function(e){T.prototype.onkeypress.apply(this,arguments);if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return;}var k=e.which||e.keyCode;var d=this.getDomRef();if(document.selection){var s=document.selection.createRange();if(s.text.length>0){return;}}else{if(d.selectionStart!=d.selectionEnd){return;}}if(d.value.length>=this.getMaxLength()&&(k>K.DELETE||k==K.ENTER||k==K.SPACE)&&!e.ctrlKey){e.preventDefault();e.stopPropagation();}};b.prototype.onkeyup=function(e){var d=this.getDomRef();this.setProperty('cursorPos',q(d).cursorPos(),true);T.prototype.onkeyup.apply(this,arguments);};b.prototype.onsapenter=function(e){e.stopPropagation();};b.prototype.onsapnext=function(e){if(q(this.getFocusDomRef()).data("sap.InNavArea")&&e.keyCode!=K.END){e.preventDefault();return;}this._checkCursorPosForNav(e,true);};b.prototype.onsapprevious=function(e){if(q(this.getFocusDomRef()).data("sap.InNavArea")&&e.keyCode!=K.HOME){e.preventDefault();return;}this._checkCursorPosForNav(e,false);};b.prototype.onsapnextmodifiers=b.prototype.onsapnext;b.prototype.onsappreviousmodifiers=b.prototype.onsapprevious;b.prototype.onsapend=b.prototype.onsapnext;b.prototype.onsaphome=b.prototype.onsapprevious;b.prototype.onmouseup=function(e){var d=this.getDomRef();this.setProperty('cursorPos',q(d).cursorPos(),true);};b.prototype.onpaste=function(e){if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return;}var d=this.getDomRef();if(d.value.length>=this.getMaxLength()&&d.selectionStart==d.selectionEnd){e.preventDefault();e.stopPropagation();}};b.prototype.oninput=function(e){if(e.originalEvent&&e.originalEvent.propertyName&&e.originalEvent.propertyName.toLowerCase()!="value"){return;}if(this.getEditable()&&this.getEnabled()&&this.getMaxLength()>0){var d=this.getDomRef();if(d.value.length>this.getMaxLength()){d.value=d.value.substring(0,this.getMaxLength());}}T.prototype.oninput.apply(this,arguments);var o=this.getDomRef();this.setProperty('cursorPos',q(o).cursorPos(),true);};b.prototype.setMaxLength=function(m){this.setProperty('maxLength',m,true);var d=this.getDomRef();if(d&&d.value.length>m&&m>0){d.value=d.value.substring(0,m);}var v=this.getValue();if(v.length>m&&m>0){this.setProperty('value',v.substring(0,m));}return this;};b.prototype.setCursorPos=function(c){this.setProperty('cursorPos',c,true);if(this.bFocus){q(this.getDomRef()).cursorPos(c);}return this;};return b;});
