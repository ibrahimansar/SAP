/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_Helper","sap/base/Log","sap/ui/performance/Measurement"],function(_,L,M){"use strict";var c="sap.ui.model.odata.v4.lib._MetadataConverter";function a(){this.aliases={};this.oAnnotatable=null;this.entityContainer=null;this.entitySet=null;this.namespace=null;this.oOperation=null;this.reference=null;this.schema=null;this.type=null;this.result=null;this.url=null;this.xmlns=null;}a.prototype.rCollection=/^Collection\((.*)\)$/;a.prototype.sEdmNamespace="http://docs.oasis-open.org/odata/ns/edm";a.prototype.sEdmxNamespace="http://docs.oasis-open.org/odata/ns/edmx";a.prototype.addToResult=function(q,v){if(q in this.result){L.warning("Duplicate qualified name "+q,undefined,c);}this.result[q]=v;};a.prototype.annotatable=function(t,p,q){var A,o,P;if(typeof t==="string"){A=this.oAnnotatable;if(A){t=_.buildPath(A.path,t);}P=t;o=this.schema.$Annotations;if(o&&o[t]){t=o[t];}}this.oAnnotatable={parent:this.oAnnotatable,path:P,prefix:p||"",qualifiedName:undefined,qualifier:q,target:t};};a.prototype.convertXMLMetadata=function(d,u){var e;M.average("convertXMLMetadata","","sap.ui.model.odata.v4.lib._V4MetadataConverter");e=d.documentElement;if(e.localName!=="Edmx"||e.namespaceURI!==this.sRootNamespace){throw new Error(u+": expected <Edmx> in namespace '"+this.sRootNamespace+"'");}this.result={};this.url=u;this.traverse(e,this.oAliasConfig);this.traverse(e,this.oFullConfig,true);this.finalize();M.end("convertXMLMetadata");return this.result;};a.prototype.getAnnotationValue=function(t,v){var i,V,b;switch(t){case"AnnotationPath":case"NavigationPropertyPath":case"Path":case"PropertyPath":v=this.resolveAliasInPath(v);case"Binary":case"Date":case"DateTimeOffset":case"Decimal":case"Duration":case"Guid":case"TimeOfDay":case"UrlRef":V={};V["$"+t]=v;return V;case"Bool":return v==="true";case"EnumMember":b=v.trim().replace(/ +/g," ").split(" ");for(i=0;i<b.length;i+=1){b[i]=this.resolveAliasInPath(b[i]);}return{$EnumMember:b.join(" ")};case"Float":if(v==="NaN"||v==="INF"||v==="-INF"){return{$Float:v};}return parseFloat(v);case"Int":V=parseInt(v);return _.isSafeInteger(V)?V:{$Int:v};case"String":return v;default:return undefined;}};a.prototype.getInlineAnnotationValue=function(e){var A,o=e.attributes,i,v;for(i=o.length-1;i>=0;i-=1){A=o.item(i);v=this.getAnnotationValue(A.name,A.value);if(v!==undefined){return v;}}return true;};a.prototype.getOrCreateArray=function(p,P){var r=p[P];if(!r){r=p[P]=[];}return r;};a.prototype.getOrCreateObject=function(p,P){var r=p[P];if(!r){r=p[P]={};}return r;};a.prototype.postProcessAnnotation=function(e,r){var A=this.oAnnotatable.parent;A.target[A.qualifiedName]=r.length?r[0]:this.getInlineAnnotationValue(e);};a.prototype.postProcessApply=function(e,r){var R=this.oAnnotatable.target;R.$Apply=r;R.$Function=this.resolveAlias(e.getAttribute("Function"));return R;};a.prototype.postProcessCastOrIsOf=function(e,r){var n=e.localName,R=this.oAnnotatable.target;R["$"+n]=r[0];this.processTypedCollection(e.getAttribute("Type"),R);this.processFacetAttributes(e,R);return R;};a.prototype.postProcessCollection=function(e,r){return r;};a.prototype.postProcessLabeledElement=function(e,r){var R=this.oAnnotatable.target;R.$LabeledElement=r.length?r[0]:this.getInlineAnnotationValue(e);R.$Name=e.getAttribute("Name");return R;};a.prototype.postProcessLabeledElementReference=function(e,r){return{"$LabeledElementReference":this.resolveAlias(e.textContent)};};a.prototype.postProcessLeaf=function(e,r){return this.getAnnotationValue(e.localName,e.textContent);};a.prototype.postProcessNot=function(e,r){var R=this.oAnnotatable.target;R.$Not=r[0];return R;};a.prototype.postProcessNull=function(e,r){var A=this.oAnnotatable,R=null;if(A.qualifiedName){R=A.target;R.$Null=null;}return R;};a.prototype.postProcessOperation=function(e,r){var R=this.oAnnotatable.target;R["$"+e.localName]=r;return R;};a.prototype.postProcessPropertyValue=function(e,r){return{property:e.getAttribute("Property"),value:r.length?r[0]:this.getInlineAnnotationValue(e)};};a.prototype.postProcessRecord=function(e,r){var i,p,R=this.oAnnotatable.target,t=e.getAttribute("Type");if(t){R.$Type=this.resolveAlias(t);}for(i=0;i<r.length;i+=1){p=r[i];R[p.property]=p.value;}return R;};a.prototype.postProcessUrlRef=function(e,r){return{$UrlRef:r[0]};};a.prototype.processAlias=function(e){var A=e.getAttribute("Alias");if(A){this.aliases[A]=e.getAttribute("Namespace")+".";}};a.prototype.processAnnotatableExpression=function(e){this.annotatable({});};a.prototype.processAnnotation=function(e){var A=this.oAnnotatable,o,q=A.prefix+"@"+this.resolveAlias(e.getAttribute("Term")),Q=A.qualifier||e.getAttribute("Qualifier");if(Q){q+="#"+Q;}if(typeof A.target==="string"){o=this.getOrCreateObject(this.schema,"$Annotations");A.target=o[A.target]={};}A.qualifiedName=q;A.target[q]=true;this.annotatable(A.target,q);};a.prototype.processAnnotations=function(e){this.annotatable(this.resolveAliasInPath(e.getAttribute("Target"),true),undefined,e.getAttribute("Qualifier"));};a.prototype.processAttributes=function(e,t,C){var p;for(p in C){var v=C[p](e.getAttribute(p));if(v!==undefined&&v!==null){t["$"+p]=v;}}};a.prototype.processInclude=function(e){var i=this.getOrCreateArray(this.reference,"$Include");i.push(e.getAttribute("Namespace")+".");};a.prototype.processIncludeAnnotations=function(e){var r=this.reference,i={"$TermNamespace":e.getAttribute("TermNamespace")+"."},I=this.getOrCreateArray(r,"$IncludeAnnotations");this.processAttributes(e,i,{"TargetNamespace":function s(v){return v?v+".":v;},"Qualifier":this.setValue});I.push(i);};a.prototype.processPropertyValue=function(e){this.annotatable(this.oAnnotatable.target,e.getAttribute("Property"));};a.prototype.processReference=function(e){var r=this.getOrCreateObject(this.result,"$Reference");this.reference=r[e.getAttribute("Uri")]={};this.annotatable(this.reference);};a.prototype.resolveAlias=function(n){var d=n.indexOf("."),N;if(d>=0&&!n.includes(".",d+1)){N=this.aliases[n.slice(0,d)];if(N){return N+n.slice(d+1);}}return n;};a.prototype.resolveAliasInParentheses=function(h,s){var p=h?s.indexOf("("):-1;if(p>=0){return this.resolveAlias(s.slice(0,p))+"("+s.slice(p+1,-1).split(",").map(this.resolveAliasInParentheses.bind(this,h)).join(",")+")";}return this.resolveAlias(s);};a.prototype.resolveAliasInPath=function(p,h){var A,t="";if(!p.includes(".")){return p;}A=p.indexOf("@");if(A>=0){t="@"+this.resolveAlias(p.slice(A+1));p=p.slice(0,A);}return p.split("/").map(this.resolveAliasInParentheses.bind(this,h)).join("/")+t;};a.prototype.setIfFalse=function(v){return v==="false"?false:undefined;};a.prototype.setIfTrue=function(v){return v==="true"?true:undefined;};a.prototype.setNumber=function(v){return v?parseInt(v):undefined;};a.prototype.setValue=function(v){return v;};a.prototype.traverse=function(e,C,u){var A=this.oAnnotatable,o,b=e.childNodes,d,v,i,I,j,n,p=this.xmlns,r,R=[],x=C.__xmlns||this.xmlns;if(x&&x!==e.namespaceURI){return undefined;}this.xmlns=x;if(u){this.processElement(e,C.__processor);}else if(C.__processor){C.__processor.call(this,e);}for(i=0;i<b.length;i+=1){d=b.item(i);if(d.nodeType===1){n=d.localName;o=C[n];if(!o&&C.__include){I=C.__include;for(j=0;j<I.length;j+=1){o=I[j][n];if(o){break;}}}if(o){v=this.traverse(d,o,u);if(v!==undefined&&C.__postProcessor){R.push(v);}}}}if(C.__postProcessor){r=C.__postProcessor.call(this,e,R);}this.oAnnotatable=A;this.xmlns=p;return r;};(function($){var A,o,b,e,O;b={"AnnotationPath":{__postProcessor:$.postProcessLeaf},"Binary":{__postProcessor:$.postProcessLeaf},"Bool":{__postProcessor:$.postProcessLeaf},"Date":{__postProcessor:$.postProcessLeaf},"DateTimeOffset":{__postProcessor:$.postProcessLeaf},"Decimal":{__postProcessor:$.postProcessLeaf},"Duration":{__postProcessor:$.postProcessLeaf},"EnumMember":{__postProcessor:$.postProcessLeaf},"Float":{__postProcessor:$.postProcessLeaf},"Guid":{__postProcessor:$.postProcessLeaf},"Int":{__postProcessor:$.postProcessLeaf},"LabeledElementReference":{__postProcessor:$.postProcessLabeledElementReference},"NavigationPropertyPath":{__postProcessor:$.postProcessLeaf},"Path":{__postProcessor:$.postProcessLeaf},"PropertyPath":{__postProcessor:$.postProcessLeaf},"String":{__postProcessor:$.postProcessLeaf},"TimeOfDay":{__postProcessor:$.postProcessLeaf}};e=[b];$.oAnnotationConfig={"Annotation":{__xmlns:$.sEdmNamespace,__processor:$.processAnnotation,__postProcessor:$.postProcessAnnotation,__include:e}};A=[b,$.oAnnotationConfig];O={__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessOperation,__include:A};o={"And":O,"Apply":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessApply,__include:A},"Cast":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessCastOrIsOf,__include:A},"Collection":{__postProcessor:$.postProcessCollection,__include:e},"Eq":O,"Ge":O,"Gt":O,"If":O,"IsOf":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessCastOrIsOf,__include:A},"LabeledElement":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessLabeledElement,__include:A},"Le":O,"Lt":O,"Ne":O,"Null":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessNull,__include:[$.oAnnotationConfig]},"Not":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessNot,__include:A},"Or":O,"Record":{__processor:$.processAnnotatableExpression,__postProcessor:$.postProcessRecord,__include:[$.oAnnotationConfig],"PropertyValue":{__processor:$.processPropertyValue,__postProcessor:$.postProcessPropertyValue,__include:A}},"UrlRef":{__postProcessor:$.postProcessUrlRef,__include:e}};$.oAnnotationsConfig={"Annotations":{__processor:$.processAnnotations,__include:[$.oAnnotationConfig]}};e.push(o);A.push(o);$.oAnnotationConfig.Annotation.Annotation=$.oAnnotationConfig.Annotation;$.oReferenceInclude={"Reference":{__xmlns:$.sEdmxNamespace,__processor:$.processReference,__include:[$.oAnnotationConfig],"Include":{__processor:$.processInclude},"IncludeAnnotations":{__processor:$.processIncludeAnnotations}}};})(a.prototype);return a;},false);
