/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Button","sap/m/MultiInput","./Settings","sap/m/Token","sap/ui/core/Core"],function(C,B,M,S,T,a){"use strict";var r=a.getLibraryResourceBundle("sap.ui.integration"),b="sap/ui/integration/designtime/editor/fields/viz";var c=C.extend("sap.ui.integration.designtime.editor.fields.Base",{metadata:{properties:{configuration:{type:"object"},specialButton:{type:"object"},mode:{type:"string"},host:{type:"object"},visible:{type:"boolean",defaultValue:true}},aggregations:{_field:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_settingsButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_dynamicField:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{afterInit:{}}},renderer:function(R,o){var f=o.getAggregation("_field"),s=o.getAggregation("_settingsButton"),d=o._getDynamicField();R.openStart("div");R.addClass("sapUiIntegrationCardEditorItemField");if(f&&f.getWidth&&!s){}if(!o.getVisible()){R.addStyle("display","none");}R.writeClasses();R.writeStyles();R.writeElementData(o);R.openEnd();if(o.getVisible()){R.openStart("span");R.writeClasses();R.openEnd();R.openStart("span");R.addClass("sapUiIntegrationCardEditorEditor");if(o._hasDynamicValue()){R.addStyle("width","1px");R.addStyle("opacity","0");}R.writeStyles();R.writeClasses();R.openEnd();R.renderControl(f);R.close("span");R.close("span");if(s||o._hasDynamicValue()){R.openStart("span");R.addClass("sapUiIntegrationCardEditorSettings");R.writeClasses();R.openEnd();R.openStart("span");R.addClass("sapUiIntegrationCardEditorSettingsField");if(o._hasDynamicValue()){R.addStyle("width","calc(100% - 2.5rem)");R.addStyle("opacity","1");}R.writeClasses();R.writeStyles();R.openEnd();R.renderControl(d);R.close("span");R.openStart("span");R.addClass("sapUiIntegrationCardEditorSettingsButton");R.writeClasses();R.openEnd();R.renderControl(s);R.close("span");R.close("span");}}R.close("div");}});c.prototype.init=function(){this._readyPromise=new Promise(function(d){this._fieldResolver=d;}.bind(this));};c.prototype.setConfiguration=function(o,s){if(o!==this.getConfiguration()){this.setProperty("configuration",o,s);if(o){Promise.resolve().then(function(){this.initEditor(o);}.bind(this));}}return this;};c.prototype.initEditor=function(o){var d;this.initVisualization&&this.initVisualization(o);if(this._visualization.editor){d=this._visualization.editor;}else if(this._visualization.type){if(typeof this._visualization.type==="string"){if(this._visualization.type.indexOf("/")===-1){this._visualization.type=b+"/"+this._visualization.type;this._visualization.settings=this._visualization.settings||{value:"{currentSettings>value}",editable:"{currentSettings>editable}"};}sap.ui.require([this._visualization.type],function(f){this._visualization.type=f;this.initEditor(o);}.bind(this));return;}d=new this._visualization.type(this._visualization.settings||{});}if(d instanceof C){this.setAggregation("_field",d);}var m=this.getMode();o.allowSettings=o.allowSettings||o.allowSettings!==false&&m==="admin";o.allowDynamicValues=o.allowDynamicValues||o.allowDynamicValues!==false;o._changeDynamicValues=o.visible&&o.editable&&(o.allowDynamicValues||o.allowSettings)&&m!=="translation";if(o._changeDynamicValues){this._addSettingsButton();}this._applySettings(o);};c.prototype.initVisualization=function(){};c.prototype._hasDynamicValue=function(){var v=this._getCurrentProperty("value");var d=typeof v==="string"&&(v.indexOf("{context>")===0||v.indexOf("{{parameters")===0);this._setCurrentProperty("_hasDynamicValue",d);return d;};c.prototype._hasSettings=function(){var o=this.getConfiguration();if(o._next){o._hasSettings=(o._next.editable===false||o._next.visible===false||o._next.allowDynamicValues===false);}else{o._hasSettings=false;}return o._hasSettings;};c.prototype._getDynamicField=function(){var f=this.getAggregation("_dynamicField");if(!f){var f=new M({showValueHelp:false});this.setAggregation("_dynamicField",f);}return f;};c.prototype._hideDynamicField=function(){var d=this._getDynamicField(),f=this.getAggregation("_field");if(d.getDomRef()){var s=d.getDomRef().parentNode.style;s.width="1px";s.opacity=0;s=f.getDomRef().parentNode.style;f.getDomRef().style.visibility="visible";s.width="calc(100% - 2.5rem)";s.opacity=1;}};c.prototype._showDynamicField=function(){var d=this._getDynamicField(),f=this.getAggregation("_field");if(d.getDomRef()){var s=d.getDomRef().parentNode.style;s.width="calc(100% - 2.5rem)";s.opacity=1;s=f.getDomRef().parentNode.style;f.getDomRef().style.visibility="hidden";s.width="1px";s.opacity=0;}};c.prototype._getSettingsPanel=function(){if(!this._oSettingsPanel){this._oSettingsPanel=new S();}return this._oSettingsPanel;};c.prototype._openSettingsDialog=function(d){var s=this._getSettingsPanel();window.setTimeout(function(){s.setConfiguration(this.getConfiguration());s.open(this.getAggregation("_settingsButton"),this.getAggregation("_settingsButton"),this.getParent().getAggregation("_preview"),this.getHost(),this,this._applySettings.bind(this),this._cancelSettings.bind(this));}.bind(this),d||600);};c.prototype._addSettingsButton=function(){this._getDynamicField();this.setAggregation("_settingsButton",new B({icon:"{= ${currentSettings>_hasDynamicValue} ? 'sap-icon://display-more' : 'sap-icon://enter-more'}",type:"Transparent",tooltip:r.getText("CARDEDITOR_FIELD_MORE_SETTINGS"),press:function(){this._openSettingsDialog(200);}.bind(this)}));};c.prototype._setCurrentProperty=function(p,v){if(this._getCurrentProperty(p)!==v){this.getModel("currentSettings").setProperty(p,v,this.getBindingContext("currentSettings"));}};c.prototype._getCurrentProperty=function(p){return this.getModel("currentSettings").getProperty(p,this.getBindingContext("currentSettings"));};c.prototype._applySettings=function(d){var D=this._getDynamicField(),o=this.getModel("contextflat")._getValueObject(d.value);D.removeAllTokens();if(!this._getCurrentProperty("_changeDynamicValues")){D.setEnabled(false);}if(o&&o.path!=="empty"){if(o.object.value&&o.object.value.indexOf("{{")==0){this._setCurrentProperty("value",o.object.value);}else{this._setCurrentProperty("value",o.value);}D.addToken(new T({text:o.object.label,"delete":function(){this._setCurrentProperty("value","");if(!this._hasDynamicValue()){this._hideDynamicField();}this._applyButtonStyles();window.setTimeout(function(){this.getAggregation("_field").focus();}.bind(this),100);}.bind(this)}));}else{this._setCurrentProperty("value",d.value);this._hideDynamicField();}this._setCurrentProperty("_next",d._next);this._applyButtonStyles();if(!this._hasDynamicValue()){this._hideDynamicField();}else{this._showDynamicField();}this._fieldResolver&&this._fieldResolver();this._fieldResolver=null;};c.prototype._cancelSettings=function(){this._applyButtonStyles();if(!this._hasDynamicValue()){this._hideDynamicField();}};c.prototype._applyButtonStyles=function(){if(!this._hasDynamicValue()){this.removeStyleClass("dynamicvalue");}else{this.addStyleClass("dynamicvalue");}if(!this._hasSettings()){this.removeStyleClass("settings");}else{this.addStyleClass("settings");}};return c;});
