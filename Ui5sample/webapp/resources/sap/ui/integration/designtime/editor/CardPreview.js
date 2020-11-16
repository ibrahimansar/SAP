/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/HBox","sap/m/Image","sap/m/ToggleButton","sap/ui/integration/widgets/Card","sap/ui/core/Core","sap/ui/dom/includeStylesheet","sap/ui/integration/util/CardMerger"],function(C,H,I,T,a,c,i,d){"use strict";var e=C.extend("sap.ui.integration.designtime.editor.CardPreview",{metadata:{properties:{settings:{type:"any"},card:{type:"object"}},aggregations:{cardPreview:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},renderer:function(r,o){if(o._getCurrentMode()==="None"){r.openStart("div",o);r.openEnd();return;}r.openStart("div",o);r.addClass("sapUiIntegrationDTPreview");if(f()){r.addClass("sapUiIntegrationDTPreviewDark");}r.writeClasses();r.openEnd();r.openStart("div");r.addClass("before");r.writeAttribute("tabindex","0");r.writeAttributeEscaped("id",o.getId()+"-before");r.addStyle("z-index",o.getParent()._iZIndex+1);r.writeStyles();r.openEnd();r.close("div");r.renderControl(o._getCardPreview());r.openStart("div");r.writeAttribute("tabindex","0");r.writeAttributeEscaped("id",o.getId()+"-after");r.openEnd();r.close("div");if(o._getModes().indexOf("Live")>-1&&o._getModes().indexOf("Abstract")>-1){r.renderControl(o._getModeToggleButton());}}});e.prototype.init=function(){this._oResourceBundle=c.getLibraryResourceBundle("sap.ui.integration");c.attachThemeChanged(function(){if(this.getDomRef()){if(f()){this.getDomRef().classList.add("sapUiIntegrationDTPreviewDark");}else{this.getDomRef().classList.remove("sapUiIntegrationDTPreviewDark");}}else{this.update();}}.bind(this));};e.prototype.destroy=function(){if(this._oModeToggleButton){this._oModeToggleButton.destroy();}if(this._oCardPreview){this._oCardPreview.destroy();}if(this._oImagePlaceholder){this._oImagePlaceholder.destroy();}if(this._oCardPlaceholder){this._oCardPlaceholder.destroy();}C.prototype.destroy.apply(this,arguments);};e.prototype._getCardPreview=function(){var p=null;if(this._getCurrentMode()==="Abstract"){if(this.getSettings().preview.src){p=this._getImagePlaceholder();}else{p=this._getCardPlaceholderPreview();}}else if(this._getCurrentMode()==="Live"){p=this._getCardRealPreview();}if(p){this.setAggregation("cardPreview",p);if(!this.getSettings().preview||this.getSettings().preview.scaled!==false){p.addStyleClass("sapUiIntegrationDTPreviewScale");}else{p.addStyleClass("sapUiIntegrationDTPreviewNoScale");}}return p;};e.prototype._getCardPlaceholderPreview=function(){var o=this.getCard(),p;function _(s,x){return o.getManifestEntry(s)?x||"{bound}":null;}var h=null;if(o.getManifestEntry("/sap.card/header")){var t=o.getManifestEntry("/sap.card/header/type");if(t&&t.toUpperCase()==="NUMERIC"){h={"title":_("/sap.card/header/title"),"type":"Numeric","subTitle":_("/sap.card/header/subTitle"),"unitOfMeasurement":_("/sap.card/header/unitOfMeasurement"),"mainIndicator":_("/sap.card/header/mainIndicator",{"number":"{bound}","unit":"{bound}","trend":"{bound}","state":"{bound}"}),"details":_("/sap.card/header/details"),"sideIndicators":[_("/sap.card/header/sideIndicators/0",{"title":"Deviation","number":"{bound}","unit":"{bound}"}),_("/sap.card/header/sideIndicators/1",{"title":"Target","number":"{bound}","unit":"{bound}"})]};}else{h={"title":_("/sap.card/header/title"),"subTitle":_("/sap.card/header/subTitle"),"status":_("/sap.card/header/status"),"icon":_("/sap.card/header/icon",{"src":"{bound}"})};}}var b=this.getParent().getCurrentSettings();p={"sap.app":{"type":"card","id":o.getManifestEntry("/sap.app/id")+".abstractPreview"},"sap.card":{"type":o.getManifestEntry("/sap.card/type")==="List"?"List":"Component","header":h,"content":{"maxItems":Math.min(b["/sap.card/content/maxItems"]||6,6),"item":{"title":{"value":_("/sap.card/content/item/value")},"icon":_("/sap.card/content/item/icon",{"src":"{bound}"}),"description":_("/sap.card/content/item/description"),"info":{"value":_("/sap.card/content/item/info")}}}}};if(!this._oCardPlaceholder){this._oCardPlaceholder=new a();this._oCardPlaceholder._setPreviewMode(true);}this._oCardPlaceholder.setManifest(p);this._oCardPlaceholder.refresh();return this._oCardPlaceholder;};e.prototype.getTransformContentInfo=function(){return{transformStyle:"scale3d(0.4, 0.4, 1)",transformFactor:0.4,transformOriginStyle:"0 0",widthStyle:"500px",heightStyle:"600px",zIndex:this.getParent()._iZIndex};};e.prototype._getCardRealPreview=function(){if(!this._oCardPreview){this._oCardPreview=new a();this._oCardPreview.setBaseUrl(this.getCard().getBaseUrl());}this._initalChanges=this._initalChanges||this._oCardPreview.getManifestChanges()||[];var b=this._initalChanges.concat([this.getParent().getCurrentSettings()]);this._oCardPreview.setManifestChanges(b);this._oCardPreview.setManifest(this.getCard().getManifestEntry("/"));this._oCardPreview.refresh();this._oCardPreview.editor=this._oCardPreview.editor||{};this._oCardPreview.preview=this._oCardPreview.editor.preview=this;return this._oCardPreview;};e.prototype._getImagePlaceholder=function(){var s=this.getSettings();if(s.preview.src){if(!this._oImagePlaceholder){var h=new H();h.addStyleClass("sapFCard");h.setWidth("500px");var b=this.getCard().getBaseUrl();if(!b&&typeof this.getCard().getManifest()==="string"){b=this.getCard().getManifest();b=b.substring(0,b.lastIndexOf("/")+1);}var g=b+"/"+s.preview.src;var o=new I({src:g});o.addStyleClass("sapUiIntegrationDTPreviewImg");o.setWidth("500px");o.setHeight("600px");h.addItem(o);this._oImagePlaceholder=h;}}return this._oImagePlaceholder;};e.prototype._getModes=function(){var s=this.getSettings();s.preview=s.preview||{};s.preview.modes=s.preview.modes||"Abstract";return s.preview.modes;};e.prototype._getCurrentMode=function(){var m=this._getModes();if(!this._currentMode){switch(m){case"AbstractLive":case"Abstract":this._currentMode="Abstract";break;case"LiveAbstract":case"Live":this._currentMode="Live";break;default:this._currentMode="None";}}return this._currentMode;};e.prototype._toggleCurrentMode=function(){var m=this._getModes();if(m.indexOf("Live")>-1&&m.indexOf("Abstract")>-1){this._currentMode=this._getCurrentMode()==="Abstract"?"Live":"Abstract";}};e.prototype._getModeToggleButton=function(){var b=c.getLibraryResourceBundle("sap.ui.integration");if(!this._oModeToggleButton){this._oModeToggleButton=new T();this._oModeToggleButton.setTooltip();this._oModeToggleButton.addStyleClass("sapUiIntegrationDTPreviewButton");this._oModeToggleButton.attachPress(function(){this._toggleCurrentMode();this.update();}.bind(this));}var t=this._oModeToggleButton,g=this._getCurrentMode();if(g==="None"){t.setVisible(false);}if(g==="Abstract"){t.setIcon("sap-icon://media-play");t.setPressed(false);t.setTooltip(b.getText("CARDEDITOR_PREVIEW_BTN_LIVEPREVIEW"));}else if(g==="Live"){t.setIcon("sap-icon://media-pause");t.setPressed(true);t.setTooltip(b.getText("CARDEDITOR_PREVIEW_BTN_SAMPLEPREVIEW"));}return this._oModeToggleButton;};e.prototype.update=function(){this.invalidate();};function f(h){h=h||window.getComputedStyle(document.body).backgroundColor;var m=/rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(h);if(!m){return false;}var r=parseInt(m[1]),g=parseInt(m[2]),b=parseInt(m[3]),y=(r*299+g*587+b*114)/1000;return(y<=128);}e.prototype.onsaptabnext=function(E){if(E.target===this.getDomRef("before")){this.getDomRef("after").focus();}};e.prototype.onsaptabprevious=function(E){if(E.target===this.getDomRef("after")){this.getDomRef("before").focus();}};e.init=function(){var s=sap.ui.require.toUrl("sap.ui.integration.designtime.editor.css.CardPreview".replace(/\./g,"/")+".css");i(s);this.init=function(){};};e.init();return e;});
