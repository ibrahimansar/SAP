/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/propertyEditor/mapEditor/MapEditor","sap/base/util/includes","sap/base/util/restricted/_merge"],function(B,M,i,_){"use strict";var P=M.extend("sap.ui.integration.designtime.cardEditor.propertyEditor.parametersEditor.ParametersEditor",{metadata:{library:"sap.ui.integration"},renderer:B.getMetadata().getRenderer().render});P.configMetadata=Object.assign({},M.configMetadata,{allowLabelChange:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"}});P.prototype.formatItemConfig=function(c){var m=M.prototype.formatItemConfig.apply(this,arguments);var k=c.key;var v=c.value.visible!==false;var e=c.value.editable!==false;var d=c.value.description||"";var t=c.value.translatable||false;var a=c.value.allowSettings||true;var A=c.value.allowDynamicValues||true;var I=this.getNestedDesigntimeMetadataValue(k);var l=I.label;m.push({label:this.getI18nProperty("CARD_EDITOR.LABEL"),path:"label",value:l,placeholder:l?undefined:k,type:"string",enabled:this.getConfig().allowLabelChange,itemKey:k},{label:"Description",path:"description",value:d,allowBindings:true,type:"string",itemKey:k},{label:"Visible in Configuration",path:"visible",value:v,allowBindings:true,type:"boolean",itemKey:k},{label:"Editable in Configuration",path:"editable",allowBindings:true,value:e,enabled:true,type:"boolean",itemKey:k},{label:"Translatable in Configuration",path:"translatable",value:t,enabled:true,type:"boolean",itemKey:k},{label:"Allow Dynamic Values in Configuration",path:"allowDynamicValues",allowBindings:true,enabled:true,value:A,type:"boolean",itemKey:k},{label:"Allow Settings in Configuration",path:"allowSettings",allowBindings:true,value:a,type:"boolean",itemKey:k});return m;};P.prototype.processInputValue=function(v){return v;};P.prototype.processOutputValue=function(v){return v;};P.prototype._configItemsFormatter=function(I){return Array.isArray(I)?I.map(function(o){var a=this.getNestedDesigntimeMetadataValue(o.key);var c=_({},o.value,a);if(!c.label){c.label=o.key;}c.itemKey=o.key;c.path="value";c.designtime=this.getNestedDesigntimeMetadata(o.key);return c;}.bind(this)):[];};P.prototype.getItemChangeHandlers=function(){return Object.assign({},M.prototype.getItemChangeHandlers.apply(this,arguments),{label:this._onDesigntimeChange});};P.prototype.onBeforeConfigChange=function(c){if(!c.allowTypeChange&&!c.allowKeyChange){this.setFragment("sap.ui.integration.designtime.cardEditor.propertyEditor.parametersEditor.ParametersConfigurationEditor",function(){return 1;});}return c;};P.prototype._isValidItem=function(I,o){var t=o.type;var v=o.value;var a=this._getAllowedTypes();return(t&&i(a,t)||typeof v==="string"&&i(a,"string"));};return P;});
