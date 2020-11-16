/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(c){"use strict";var T=c.TextDirection;var O={apiVersion:2,MAX_LINES:{SINGLE_LINE:1}};O.render=function(r,o){var p=o.getParent(),t=o.getTooltip_AsString();r.openStart("div",o);if(o._isEmpty()){r.class("sapMObjectAttributeDiv");r.class("sapUiHidden");r.openEnd();r.close("div");return;}r.class("sapMObjectAttributeDiv");if(o._isClickable()){r.class("sapMObjectAttributeActive");r.attr("tabindex","0");r.accessibilityState(o,{role:"link"});if(!o.getTitle()&&o.getText()){r.class("sapMObjectAttributeTextOnly");}}if(t){r.attr("title",t);}r.openEnd();if(o._isClickable()||p instanceof sap.m.ObjectHeader){this.renderActiveTitle(r,o);this.renderActiveText(r,o,p);}else{r.renderControl(o._getUpdatedTextControl());}r.close("div");};O.renderActiveTitle=function(r,o){if(!o.getProperty("title")){return;}var C=sap.ui.getCore();r.openStart("span",o.getId()+"-title");r.class("sapMObjectAttributeTitle");r.openEnd();r.text(o.getProperty("title"));if(C.getConfiguration().getLocale().getLanguage().toLowerCase()==="fr"){r.unsafeHtml("&nbsp;");}r.close("span");r.openStart("span",o.getId()+"-colon");r.class("sapMObjectAttributeColon");r.openEnd();r.unsafeHtml(":&nbsp;");r.close("span");};O.renderActiveText=function(r,o,p){var t=o.getTextDirection(),a=o.getAggregation("customContent");r.openStart("span",o.getId()+"-text");r.class("sapMObjectAttributeText");if(t&&t!==T.Inherit){r.attr("dir",t.toLowerCase());}r.openEnd();if(a&&p){if((p instanceof sap.m.ObjectHeader)&&!o.getParent().getResponsive()){o._setControlWrapping(a,true);}else{o._setControlWrapping(a,false,O.MAX_LINES.SINGLE_LINE);}r.renderControl(a);}else{r.text(o.getProperty("text"));}r.close("span");};return O;},true);
