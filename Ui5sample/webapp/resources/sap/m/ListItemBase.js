/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/events/KeyCodes","sap/ui/model/BindingMode","sap/ui/Device","sap/ui/core/library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/InvisibleText","sap/ui/core/theming/Parameters","./library","./Button","./CheckBox","./RadioButton","./ListItemBaseRenderer","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(D,K,B,a,c,C,I,b,d,T,l,e,f,R,L,g,q){"use strict";var h=l.ListKeyboardMode;var i=l.ListMode;var j=l.ListType;var k=l.ButtonType;var M=c.MessageType;var m=C.extend("sap.m.ListItemBase",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.ListType",group:"Misc",defaultValue:j.Inactive},visible:{type:"boolean",group:"Appearance",defaultValue:true},unread:{type:"boolean",group:"Misc",defaultValue:false},selected:{type:"boolean",defaultValue:false},counter:{type:"int",group:"Misc",defaultValue:null},highlight:{type:"string",group:"Appearance",defaultValue:"None"},highlightText:{type:"string",group:"Misc",defaultValue:""},navigated:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},detailTap:{deprecated:true},press:{},detailPress:{}},designtime:"sap/m/designtime/ListItemBase.designtime"}});m.getAccessibilityText=function(o,n){if(!o||!o.getVisible||!o.getVisible()){return"";}var A;if(o.getAccessibilityInfo){A=o.getAccessibilityInfo();}if(!A||!o.getAccessibilityInfo){A=this.getDefaultAccessibilityInfo(o.getDomRef());}A=q.extend({type:"",description:"",children:[]},A);var p=sap.ui.getCore().getLibraryResourceBundle("sap.m"),t=A.type+" "+A.description+" ",s=o.getTooltip_AsString();if(A.enabled===false){t+=p.getText("CONTROL_DISABLED")+" ";}if(A.editable===false){t+=p.getText("CONTROL_READONLY")+" ";}if(!A.type&&s&&t.indexOf(s)==-1){t=s+" "+t;}A.children.forEach(function(r){t+=m.getAccessibilityText(r)+" ";});t=t.trim();if(n&&!t){t=p.getText("CONTROL_EMPTY");}return t;};m.getDefaultAccessibilityInfo=function(o){if(!o){return null;}var N=window.Node,n=window.NodeFilter,t=document.createTreeWalker(o,n.SHOW_TEXT+n.SHOW_ELEMENT,function(r){if(r.type===N.ELEMENT_NODE){if(r.classList.contains("sapUiInvisibleText")){return n.FILTER_SKIP;}if(r.getAttribute("aria-hidden")=="true"||r.style.visibility=="hidden"||r.style.display=="none"){return n.FILTER_REJECT;}return n.FILTER_SKIP;}return n.FILTER_ACCEPT;},false);var p=[];while(t.nextNode()){var r=t.currentNode;if(r.nodeType===N.TEXT_NODE){var s=(r.nodeValue||"").trim();if(s){p.push(s);}}}return{description:p.join(" ")};};m.prototype.DetailIconURI=I.getIconURI("edit");m.prototype.NavigationIconURI=I.getIconURI("slim-arrow-right");m.prototype.TagName="li";m.prototype.init=function(){this._active=false;this._bGroupHeader=false;this._bNeedsHighlight=false;this._bNeedsNavigated=false;};m.prototype.onAfterRendering=function(){this.informList("DOMUpdate",true);this._checkHighlight();this._checkNavigated();};m.prototype.invalidate=function(){if(!this.bOutput){return;}C.prototype.invalidate.apply(this,arguments);};m.prototype.getBindingContextPath=function(s){var o=this.getList();if(o&&!s){s=(o.getBindingInfo("items")||{}).model;}var n=this.getBindingContext(s);if(n){return n.getPath();}};m.prototype.isSelectedBoundTwoWay=function(){var o=this.getBinding("selected");if(o&&o.getBindingMode()==B.TwoWay){return true;}};m.prototype.getList=function(){var p=this.getParent();if(p&&p.isA("sap.m.ListBase")){return p;}};m.prototype.getListProperty=function(p,F){var o=this.getList();if(o){p=g(p);return o["get"+p]();}return F;};m.prototype.informList=function(E,p,P){var o=this.getList();if(o){var s="onItem"+E;if(o[s]){o[s](this,p,P);}}};m.prototype.informSelectedChange=function(s){var o=this.getList();if(o){o.onItemSelectedChange(this,s);this.bSelectedDelayed=undefined;}else{this.bSelectedDelayed=s;}};m.prototype.getAccessibilityType=function(o){return o.getText("ACC_CTR_TYPE_OPTION");};m.prototype.getGroupAnnouncement=function(){return this.$().prevAll(".sapMGHLI:first").text();};m.prototype.getAccessibilityDescription=function(o){var O=[],t=this.getType(),H=this.getHighlight(),s=this.getTooltip_AsString();if(this.getSelected()){O.push(o.getText("LIST_ITEM_SELECTED"));}if(H!==M.None){var n=this.getHighlightText();if(H in M&&!n){n=o.getText("LIST_ITEM_STATE_"+H.toUpperCase());}O.push(n);}if(this.getUnread()&&this.getListProperty("showUnread")){O.push(o.getText("LIST_ITEM_UNREAD"));}if(this.getCounter()){O.push(o.getText("LIST_ITEM_COUNTER",this.getCounter()));}if(t==j.Navigation){O.push(o.getText("LIST_ITEM_NAVIGATION"));}else{if(t==j.Detail||t==j.DetailAndActive){O.push(o.getText("LIST_ITEM_DETAIL"));}if(t==j.Active||t==j.DetailAndActive){O.push(o.getText("LIST_ITEM_ACTIVE"));}}var G=this.getGroupAnnouncement()||"";if(G){O.push(G);}if(this.getContentAnnouncement){O.push((this.getContentAnnouncement(o)||"").trim());}if(s){O.push(s);}if(this.getNavigated()){O.push(o.getText("LIST_ITEM_NAVIGATED"));}return O.join(" . ");};m.prototype.getAccessibilityInfo=function(){var o=sap.ui.getCore().getLibraryResourceBundle("sap.m");return{type:this.getAccessibilityType(o),description:this.getAccessibilityDescription(o),focusable:true};};m.prototype.getMode=function(){return this.getListProperty("mode","");};m.prototype.updateAccessibilityState=function(A){var t=this.$();if(!t.length){return;}var $=t.parent().children(".sapMLIB");t.attr(q.extend({"aria-setsize":$.length,"aria-posinset":$.index(t)+1},A));};m.prototype.getDeleteControl=function(n){if(!n||this._oDeleteControl){return this._oDeleteControl;}if(!this.DeleteIconURI){m.prototype.DeleteIconURI=I.getIconURI(T.get("_sap_m_ListItemBase_DeleteIcon"));}this._oDeleteControl=new e({id:this.getId()+"-imgDel",icon:this.DeleteIconURI,type:k.Transparent,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_ITEM_DELETE")}).addStyleClass("sapMLIBIconDel sapMLIBSelectD").setParent(this,null,true).attachPress(function(E){this.informList("Delete");},this);this._oDeleteControl._bExcludeFromTabChain=true;this._oDeleteControl.getEnabled=function(){return true;};return this._oDeleteControl;};m.prototype.onThemeChanged=function(){m.prototype.DeleteIconURI=I.getIconURI(T.get("_sap_m_ListItemBase_DeleteIcon"));if(this._oDeleteControl){this._oDeleteControl.setIcon(this.DeleteIconURI);}};m.prototype.getDetailControl=function(n){if(!n||this._oDetailControl){return this._oDetailControl;}this._oDetailControl=new e({id:this.getId()+"-imgDet",icon:this.DetailIconURI,type:k.Transparent,tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_ITEM_EDIT")}).addStyleClass("sapMLIBType sapMLIBIconDet").setParent(this,null,true).attachPress(function(){this.fireDetailTap();this.fireDetailPress();},this);this._oDetailControl._bExcludeFromTabChain=true;this._oDetailControl.getEnabled=function(){return true;};return this._oDetailControl;};m.prototype.getNavigationControl=function(n){if(!n||this._oNavigationControl){return this._oNavigationControl;}this._oNavigationControl=new b({id:this.getId()+"-imgNav",src:this.NavigationIconURI,useIconTooltip:false,noTabStop:true}).setParent(this,null,true).addStyleClass("sapMLIBType sapMLIBImgNav");return this._oNavigationControl;};m.prototype.getSingleSelectControl=function(n){if(!n||this._oSingleSelectControl){n&&this._oSingleSelectControl.setSelected(this.getSelected());return this._oSingleSelectControl;}this._oSingleSelectControl=new R({id:this.getId()+"-selectSingle",groupName:this.getListProperty("id")+"_selectGroup",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:d.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectS").setParent(this,null,true).setTabIndex(-1).attachSelect(function(E){var s=E.getParameter("selected");this.setSelected(s);this.informList("Select",s);},this);this._oSingleSelectControl.getEnabled=function(){return true;};return this._oSingleSelectControl;};m.prototype.getMultiSelectControl=function(n){if(!n||this._oMultiSelectControl){n&&this._oMultiSelectControl.setSelected(this.getSelected());return this._oMultiSelectControl;}this._oMultiSelectControl=new f({id:this.getId()+"-selectMulti",activeHandling:false,selected:this.getSelected(),ariaLabelledBy:d.getStaticId("sap.m","LIST_ITEM_SELECTION")}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).setTabIndex(-1).addEventDelegate({onkeydown:function(E){this.informList("KeyDown",E);},onkeyup:function(E){this.informList("KeyUp",E);}},this).attachSelect(function(E){var s=E.getParameter("selected");this.setSelected(s);this.informList("Select",s);},this);this._oMultiSelectControl.getEnabled=function(){return true;};return this._oMultiSelectControl;};m.prototype.getModeControl=function(n){var s=this.getMode();if(!s||s==i.None){return;}if(s==i.Delete){return this.getDeleteControl(n);}if(s==i.MultiSelect){return this.getMultiSelectControl(n);}return this.getSingleSelectControl(n);};m.prototype.getTypeControl=function(n){var t=this.getType();if(t==j.Detail||t==j.DetailAndActive){return this.getDetailControl(n);}if(t==j.Navigation){return this.getNavigationControl(n);}};m.prototype.destroyControls=function(n){n.forEach(function(s){s="_o"+s+"Control";if(this[s]){this[s].destroy("KeepDom");this[s]=null;}},this);};m.prototype.isActionable=function(){return this.isIncludedIntoSelection()||(this.getType()!=j.Inactive&&this.getType()!=j.Detail);};m.prototype.exit=function(){this._oLastFocused=null;this._checkHighlight(false);this._checkNavigated(false);this.setActive(false);this.destroyControls(["Delete","SingleSelect","MultiSelect","Detail","Navigation"]);};m.prototype.setHighlight=function(v){if(v==null){v=M.None;}else if(!D.getType("sap.ui.core.MessageType").isValid(v)&&!D.getType("sap.ui.core.IndicationColor").isValid(v)){throw new Error('"'+v+'" is not a value of the enums sap.ui.core.MessageType or sap.ui.core.IndicationColor for property "highlight" of '+this);}return this.setProperty("highlight",v);};m.prototype.isSelectable=function(){var s=this.getMode();return!(s==i.None||s==i.Delete);};m.prototype.getSelected=function(){if(this.isSelectable()){return this.getProperty("selected");}return false;};m.prototype.isSelected=m.prototype.getSelected;m.prototype.setSelected=function(s,n){s=this.validateProperty("selected",s);if(!this.isSelectable()||s==this.getSelected()){return this;}if(!n){this.informSelectedChange(s);}var S=this.getModeControl();if(S){S.setSelected(s);}this.updateSelectedDOM(s,this.$());this.setProperty("selected",s,true);return this;};m.prototype.updateSelectedDOM=function(s,t){t.toggleClass("sapMLIBSelected",s);t.attr("aria-selected",s);};m.prototype.setParent=function(p){C.prototype.setParent.apply(this,arguments);if(!p){this._bGroupHeader=false;return;}this.informList("Inserted",this.bSelectedDelayed);return this;};m.prototype.setBindingContext=function(){C.prototype.setBindingContext.apply(this,arguments);this.informList("BindingContextSet");return this;};m.prototype.isGroupHeader=function(){return this._bGroupHeader;};m.prototype.isIncludedIntoSelection=function(){if(!this.isSelectable()){return false;}var s=this.getMode();return s==i.SingleSelectMaster||(this.getListProperty("includeItemInSelection")&&(s==i.SingleSelectLeft||s==i.SingleSelect||s==i.MultiSelect));};m.prototype._checkHighlight=function(n){if(n==undefined){n=(this.getVisible()&&this.getHighlight()!=M.None);}if(this._bNeedsHighlight!=n){this._bNeedsHighlight=n;this.informList("HighlightChange",n);}};m.prototype._checkNavigated=function(n){if(n==undefined){n=(this.getVisible()&&this.getNavigated());}if(this._bNeedsNavigated!=n){this._bNeedsNavigated=n;this.informList("NavigatedChange",n);}};m.prototype.hasActiveType=function(){var t=this.getType();return(t==j.Active||t==j.Navigation||t==j.DetailAndActive);};m.prototype.setActive=function(A){if(A==this._active){return this;}if(A&&this.getListProperty("activeItem")){return this;}var t=this.$();this._active=A;this._activeHandling(t);if(this.getType()==j.Navigation){this._activeHandlingNav(t);}if(A){this._activeHandlingInheritor(t);}else{this._inactiveHandlingInheritor(t);}this.informList("ActiveChange",A);};m.detectTextSelection=function(o){var s=window.getSelection(),t=s.toString().replace("\n","");return t&&q.contains(o,s.focusNode);};m.prototype.ontap=function(E){if(this._eventHandledByControl){return E.setMarked();}if(m.detectTextSelection(this.getDomRef())){return;}if(this.isIncludedIntoSelection()){if(this.getMode()==i.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected());}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true);}}else if(this.hasActiveType()){window.clearTimeout(this._timeoutIdStart);window.clearTimeout(this._timeoutIdEnd);this.setActive(true);if(a.os.ios){this.focus();}setTimeout(function(){this.setActive(false);}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress();}.bind(this),0);}this.informList("Press",E.srcControl);};m.prototype.ontouchstart=function(E){this._eventHandledByControl=E.isMarked();var t=E.targetTouches[0];this._touchedY=t.clientY;this._touchedX=t.clientX;if(this._eventHandledByControl||E.touches.length!=1||!this.hasActiveType()){return;}this._timeoutIdStart=setTimeout(function(){this.setActive(true);}.bind(this),100);};m.prototype.ontouchmove=function(E){if((this._active||this._timeoutIdStart)&&(Math.abs(this._touchedY-E.targetTouches[0].clientY)>10||Math.abs(this._touchedX-E.targetTouches[0].clientX)>10)){clearTimeout(this._timeoutIdStart);this._timeoutIdStart=null;this._timeoutIdEnd=null;this.setActive(false);}};m.prototype.ontouchend=function(E){if(this.hasActiveType()){this._timeoutIdEnd=setTimeout(function(){this.setActive(false);}.bind(this),100);}};m.prototype.ontouchcancel=m.prototype.ontouchend;m.prototype.ondragend=m.prototype.ontouchend;m.prototype._activeHandlingNav=function(){};m.prototype._activeHandlingInheritor=function(){};m.prototype._inactiveHandlingInheritor=function(){};m.prototype._activeHandling=function(t){t.toggleClass("sapMLIBActive",this._active);if(a.system.desktop&&this.isActionable()){t.toggleClass("sapMLIBHoverable",!this._active);}};m.prototype.onsapspace=function(E){if(E.srcControl!==this){return;}E.preventDefault();if(E.isMarked()||!this.isSelectable()){return;}if(this.getMode()==i.MultiSelect){this.setSelected(!this.getSelected());this.informList("Select",this.getSelected());}else if(!this.getSelected()){this.setSelected(true);this.informList("Select",true);}E.setMarked();};m.prototype.onsapenter=function(E){var o=this.getList();if(E.isMarked()||!o){return;}if(E.srcControl!==this&&o.getKeyboardMode()==h.Edit){o.setKeyboardMode(h.Navigation);this._switchFocus(E);return;}if(E.srcControl!==this){return;}if(this.isIncludedIntoSelection()){this.onsapspace(E);}else if(this.hasActiveType()){E.setMarked();this.setActive(true);setTimeout(function(){this.setActive(false);}.bind(this),180);setTimeout(function(){this.fireTap();this.firePress();}.bind(this),0);}o.onItemPress(this,E.srcControl);};m.prototype.onsapdelete=function(E){if(E.isMarked()||E.srcControl!==this||this.getMode()!=i.Delete){return;}this.informList("Delete");E.preventDefault();E.setMarked();};m.prototype._switchFocus=function(E){var o=this.getList();if(!o){return;}var t=this.getTabbables();if(E.srcControl!==this){o._iLastFocusPosOfItem=t.index(E.target);this.focus();}else if(t.length){var F=o._iLastFocusPosOfItem||0;F=t[F]?F:-1;t.eq(F).trigger("focus");}E.preventDefault();E.setMarked();};m.prototype.onkeydown=function(E){if(E.isMarked()){return;}if(E.which==K.F7){this._switchFocus(E);return;}if(E.which==K.F2){if(E.srcControl===this&&this.getType().indexOf("Detail")==0&&this.hasListeners("detailPress")||this.hasListeners("detailTap")){this.fireDetailTap();this.fireDetailPress();E.preventDefault();E.setMarked();}else{var o=this.getList();if(o){this.$().prop("tabIndex",-1);o.setKeyboardMode(o.getKeyboardMode()==h.Edit?h.Navigation:h.Edit);this._switchFocus(E);}}}if(E.srcControl!==this){return;}this.informList("KeyDown",E);};m.prototype.onkeyup=function(E){if(E.isMarked()||E.srcControl!==this){return;}this.informList("KeyUp",E);};m.prototype.onsapupmodifiers=function(E){if(E.isMarked()||E.srcControl!==this){return;}this.informList("UpDownModifiers",E,-1);};m.prototype.onsapdownmodifiers=function(E){if(E.isMarked()||E.srcControl!==this){return;}this.informList("UpDownModifiers",E,1);};m.prototype.getTabbables=function(){return this.$().find(":sapTabbable");};m.prototype.onsaptabnext=function(E){var o=this.getList();if(!o||E.isMarked()||o.getKeyboardMode()==h.Edit){return;}var n=this.getTabbables().get(-1)||this.getDomRef();if(E.target===n){o.forwardTab(true);E.setMarked();}};m.prototype.onsaptabprevious=function(E){var o=this.getList();if(!o||E.isMarked()||o.getKeyboardMode()==h.Edit){return;}if(E.target===this.getDomRef()){o.forwardTab(false);E.setMarked();}};m.prototype.onfocusin=function(E){var o=this.getList();if(!o||E.isMarked()){return;}this.informList("FocusIn",E.srcControl);if(E.srcControl===this){return;}if(o.getKeyboardMode()==h.Edit||!q(E.target).is(":sapFocusable")){return;}setTimeout(o["setItemFocusable"].bind(o,this),0);E.setMarked();};m.prototype.onsapup=function(E){if(E.isMarked()||E.srcControl===this||this.getListProperty("keyboardMode")===h.Navigation){return;}this.informList("ArrowUpDown",E);};m.prototype.oncontextmenu=function(E){if(this._bGroupHeader){return;}if(q(document.activeElement).is(":focusable")&&document.activeElement!==this.getDomRef()&&E.srcControl!==this.getModeControl()){return;}this.informList("ContextMenu",E);};m.prototype.onsapdown=m.prototype.onsapup;return m;});
