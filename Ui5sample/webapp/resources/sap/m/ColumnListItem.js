/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/library","./library","./ListItemBase","./ColumnListItemRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(E,c,l,L,C,q){"use strict";var a=l.ListType;var V=c.VerticalAlign;var b=L.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",properties:{vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:V.Inherit}},defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});var T=E.extend("sap.m.TablePopin",{ontap:function(e){if(e.isMarked()||L.detectTextSelection(this.getDomRef())){return e.stopImmediatePropagation(true);}if(e.srcControl===this||!q(e.target).is(":sapFocusable")){this.getParent().focus();}},_onMouseEnter:function(){var $=q(this),d=$.prev();if(!d.length||!d.hasClass("sapMLIBHoverable")||d.hasClass("sapMPopinHovered")){return;}d.addClass("sapMPopinHovered");},_onMouseLeave:function(){var $=q(this),d=$.prev();if(!d.length||!d.hasClass("sapMLIBHoverable")||!d.hasClass("sapMPopinHovered")){return;}d.removeClass("sapMPopinHovered");}});b.prototype.TagName="tr";b.prototype.init=function(){L.prototype.init.call(this);this._bNeedsTypeColumn=false;this._aClonedHeaders=[];};b.prototype.onAfterRendering=function(){L.prototype.onAfterRendering.call(this);this._checkTypeColumn();var p=this.hasPopin();if(p){this.$Popin().on("mouseenter",p._onMouseEnter).on("mouseleave",p._onMouseLeave);}};b.prototype.exit=function(){L.prototype.exit.call(this);this._checkTypeColumn(false);this._destroyClonedHeaders();if(this._oPopin){this._oPopin.destroy(true);this._oPopin=null;}};b.prototype.setVisible=function(v){L.prototype.setVisible.call(this,v);if(!v&&this.hasPopin()){this.removePopin();}return this;};b.prototype.getTable=function(){var p=this.getParent();if(p&&p.isA("sap.m.Table")){return p;}};b.prototype.getPopin=function(){if(!this._oPopin){this._oPopin=new T({id:this.getId()+"-sub"}).addDelegate({ontouchstart:this.ontouchstart,ontouchmove:this.ontouchmove,ontap:this.ontap,ontouchend:this.ontouchend,ontouchcancel:this.ontouchcancel,onsaptabnext:this.onsaptabnext,onsaptabprevious:this.onsaptabprevious,onsapup:this.onsapup,onsapdown:this.onsapdown,oncontextmenu:this.oncontextmenu},this).setParent(this,null,true);}return this._oPopin;};b.prototype.$Popin=function(){return this.$("sub");};b.prototype.hasPopin=function(){return this._oPopin;};b.prototype.removePopin=function(){this._oPopin&&this.$Popin().remove();};b.prototype.getTabbables=function(){return this.$().add(this.$Popin()).find(":sapTabbable");};b.prototype.getAccessibilityType=function(B){return B.getText("ACC_CTR_TYPE_ROW");};b.prototype.getContentAnnouncement=function(B){var t=this.getTable();if(!t){return;}var o=[],d=this.getCells(),e=t.getColumns(true);e.forEach(function(f){var g=d[f.getInitialOrder()];if(!g||!f.getVisible()||(f.isHidden()&&!f.isPopin())){return;}var h=f.getHeader();if(h&&h.getVisible()){o.push(L.getAccessibilityText(h)+" "+L.getAccessibilityText(g,true));}else{o.push(L.getAccessibilityText(g,true));}});return o.join(" . ").trim();};b.prototype.updateSelectedDOM=function(s,t){L.prototype.updateSelectedDOM.apply(this,arguments);if(this.hasPopin()){this.$Popin().attr("aria-selected",s);}};b.prototype.onfocusin=function(e){if(e.isMarked()){return;}if(e.srcControl===this){this.$().children(".sapMListTblCellDup").find(":sapTabbable").attr("tabindex",-1);}L.prototype.onfocusin.apply(this,arguments);};b.prototype._checkTypeColumn=function(n){if(n==undefined){n=this._needsTypeColumn();}if(this._bNeedsTypeColumn!=n){this._bNeedsTypeColumn=n;this.informList("TypeColumnChange",n);}};b.prototype._needsTypeColumn=function(){var t=this.getType();return this.getVisible()&&(t==a.Detail||t==a.Navigation||t==a.DetailAndActive);};b.prototype._addClonedHeader=function(h){return this._aClonedHeaders.push(h);};b.prototype._destroyClonedHeaders=function(){if(this._aClonedHeaders.length){this._aClonedHeaders.forEach(function(o){o.destroy("KeepDom");});this._aClonedHeaders=[];}};b.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true);};b.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false);};b.prototype._toggleActiveClass=function(s){if(this.hasPopin()){this.$Popin().toggleClass("sapMLIBActive",s);}};return b;});
