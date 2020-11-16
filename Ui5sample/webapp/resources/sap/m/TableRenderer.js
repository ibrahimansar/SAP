/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core","./library","./ListBaseRenderer","./ColumnListItemRenderer"],function(R,C,l,L,a){"use strict";var b=l.ListKeyboardMode;var T=R.extend(L);T.apiVersion=2;var r=C.getConfiguration().getRTL();T.columnAlign={left:r?"flex-end":"flex-start",center:"center",right:r?"flex-start":"flex-end"};T.renderColumns=function(c,t,d){var i=0,h=0,e=false,f=false,m=t.getMode(),M=L.ModeOrder[m],g="sapMListTbl",j=t.getId("tbl"),k=(d=="Head")?"th":"td",n="t"+d.toLowerCase(),o=t.getColumns(),s=t.shouldRenderDummyColumn(),H,p=function(u,v,A){c.openStart(k,v&&j+v);if(k==="th"){c.class("sapMTableTH");c.attr("role",A?"presentation":"columnheader");c.attr("scope","col");}else if(A){c.attr("role","presentation");}A&&c.attr("aria-hidden","true");c.class(g+u);if(d==="Foot"){if(u==="HighlightCol"){c.class("sapMTableHighlightFooterCell");}else if(u==="NavigatedCol"){c.class("sapMTableNavigatedFooterCell");}}c.openEnd();c.close(k);i++;};if(d=="Head"){var F=o.reduce(function(u,v,O){v.setIndex(-1);v.setInitialOrder(O);v.setForcedColumn(false);return(v.getCalculatedMinScreenWidth()<u.getCalculatedMinScreenWidth())?v:u;},o[0]);var q=o.filter(function(u){return u.getVisible()&&!u.isPopin()&&!u.isHidden();}).length;if(!q&&F){F.setForcedColumn(true);q=1;}H=o.every(function(u){return!u.getHeader()||!u.getHeader().getVisible()||!u.getVisible()||u.isPopin()||u.isHidden();});}c.openStart(n);if(t._hasFooter&&d==="Foot"){c.class("sapMTableTFoot");if(t.hasPopin()){c.class("sapMListTblHasPopin");}}c.openEnd();c.openStart("tr",t.addNavSection(j+d+"er"));if(d!=="Head"&&s){c.class("sapMListTblRowHasDummyCell");}c.attr("tabindex",-1);if(H){c.class("sapMListTblHeaderNone");}else{c.class("sapMListTblRow").class("sapMLIBFocusable").class("sapMListTbl"+d+"er");a.addLegacyOutlineClass.call(a,c);}c.openEnd();p("HighlightCol",d+"Highlight",true);if(M==-1){if(m=="MultiSelect"&&d=="Head"&&!H){c.openStart("th");c.class("sapMTableTH");c.attr("scope","col");c.attr("aria-hidden","true");c.class(g+"SelCol");c.attr("role","presentation");c.openEnd();c.renderControl(t._getSelectAllCheckbox());c.close("th");i++;}else{p("SelCol","",true);}}t.getColumns(true).forEach(function(u,v){if(!u.getVisible()){return;}if(u.isPopin()){e=true;return;}var w=u.isHidden();if(w){h++;}var x=u["get"+d+"er"](),y=(q==1)?"":u.getWidth(),S=u.getStyleClass(true).split(" "),z=u.getCssAlign();if(d=="Head"){c.openStart(k,u);c.class("sapMTableTH");c.attr("role","columnheader");c.attr("scope","col");var A=u.getSortIndicator().toLowerCase();A!=="none"&&c.attr("aria-sort",A);}else{c.openStart(k);}S&&S.forEach(function(B){c.class(B);});c.class(g+"Cell");c.class(g+d+"erCell");c.attr("data-sap-width",u.getWidth());c.style("width",y);if(z&&d!=="Head"){c.style("text-align",z);}if(w){c.style("display","none");c.attr("aria-hidden","true");}c.openEnd();if(x){if(d==="Head"){c.openStart("div");c.class("sapMColumnHeader");if(t.bActiveHeaders&&!x.isA("sap.ui.core.InvisibleText")){c.attr("tabindex",0);c.attr("role","button");c.attr("aria-haspopup","dialog");c.class("sapMColumnHeaderActive");}if(z){c.style("justify-content",T.columnAlign[z]);c.style("text-align",z);}c.openEnd();c.renderControl(x.addStyleClass("sapMColumnHeaderContent"));c.close("div");}else{c.renderControl(x);}}if(d=="Head"&&!f){f=!!u.getFooter();}c.close(k);u.setIndex(i++);});if(e&&s){p("DummyCol",d+"DummyCol",true);}p("NavCol",d+"Nav",true);if(M==1){p("SelCol","",true);}p("NavigatedCol",d+"Navigated",true);if(!e&&s){p("DummyCol",d+"DummyCol",true);}c.close("tr");c.close(n);if(d==="Head"){t._bPopinChanged=t._hasPopin!==e||t._iHiddenPopinColumns!==t._getHiddenInPopin().length;t._hasPopin=e;t._colCount=i-h;t._hasFooter=f;t._headerHidden=H;}};T.renderContainerAttributes=function(c,o){c.attr("role","application");c.attr("aria-roledescription",C.getLibraryResourceBundle("sap.m").getText("TABLE_ROLE_DESCRIPTION"));c.class("sapMListTblCnt");c.accessibilityState(o,this.getAccessibilityState(o));};T.renderListStartAttributes=function(c,o){c.openStart("table",o.getId("listUl"));c.class("sapMListTbl");if(o.getFixedLayout()===false){c.style("table-layout","auto");}if(o._iItemNeedsColumn){c.class("sapMListTblHasNav");}};T.getAriaRole=function(c){return"";};T.renderListHeadAttributes=function(c,o){this.renderColumns(c,o,"Head");c.openStart("tbody",o.addNavSection(o.getId("tblBody")));c.class("sapMListItems");c.class("sapMTableTBody");if(o.getAlternateRowColors()){c.class(o._getAlternateRowColorsClass());}if(o.hasPopin()){c.class("sapMListTblHasPopin");}c.openEnd();};T.renderListEndAttributes=function(c,o){c.close("tbody");o._hasFooter&&this.renderColumns(c,o,"Foot");c.close("table");};T.renderNoData=function(c,o){c.openStart("tr",o.getId("nodata"));c.attr("tabindex",o.getKeyboardMode()==b.Navigation?-1:0);c.class("sapMLIB").class("sapMListTblRow").class("sapMLIBTypeInactive");a.addFocusableClasses.call(a,c);if(!o._headerHidden||(!o.getHeaderText()&&!o.getHeaderToolbar())){c.class("sapMLIBShowSeparator");}c.openEnd();c.openStart("td",o.getId("nodata-text"));c.attr("colspan",o.getColCount());c.class("sapMListTblCell").class("sapMListTblCellNoData");c.openEnd();if(!o.shouldRenderItems()){c.text(C.getLibraryResourceBundle("sap.m").getText("TABLE_NO_COLUMNS"));}else{c.text(o.getNoDataText(true));}c.close("td");c.close("tr");};return T;},true);
