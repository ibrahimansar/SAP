/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/theming/Parameters','sap/m/library'],function(P,l){"use strict";var T={};var a=l.TitleAlignment;var _=function(B,k){if(!this._oTitleAlignmentBarInstances){this._oTitleAlignmentBarInstances={};}this._oTitleAlignmentBarInstances[k]=B;this._determineTitleAlignment(B);};var b=function(){this._determineTitleAlignment();};var c=function(){this._titleAlignmentThemeChangedDelegate={onThemeChanged:this._titleAlignmentThemeChangedHandler};this.addEventDelegate(this._titleAlignmentThemeChangedDelegate,this);};var d=function(){this.removeEventDelegate(this._titleAlignmentThemeChangedDelegate);};var e=function(B){var t=P.get("sapMTitleAlignment");var C=this.getTitleAlignment();if(C===a.Auto){C=t===undefined?a.Center:t;}if(!B){if(this._oTitleAlignmentBarInstances){for(var k in this._oTitleAlignmentBarInstances){f(this._oTitleAlignmentBarInstances[k]);}}}else{f(B);}function f(B){B.removeStyleClass("sapMBarTitleStart");if(C===a.Start){B.addStyleClass("sapMBarTitleStart");}}};var s=function(A){this.setProperty("titleAlignment",A,true);this._determineTitleAlignment();if(this._oTitleAlignmentBarInstances){for(var k in this._oTitleAlignmentBarInstances){this._oTitleAlignmentBarInstances[k].invalidate();}}return this;};T.mixInto=function(C){C._setupBarTitleAlignment=_;C._titleAlignmentThemeChangedHandler=b;C._attachTitleAlignmentEventDelegate=c;C._detachTitleAlignmentEventDelegate=d;C._determineTitleAlignment=e;C.setTitleAlignment=s;var i=C.init;C.init=function(I){if(!this._oTitleAlignmentBarInstances){this._oTitleAlignmentBarInstances={};}var r=i.apply(this,arguments);this._attachTitleAlignmentEventDelegate();return r;};var E=C.exit;C.exit=function(I){var r=E.apply(this,arguments);this._detachTitleAlignmentEventDelegate();delete this._oTitleAlignmentBarInstances;return r;};};return T;});
