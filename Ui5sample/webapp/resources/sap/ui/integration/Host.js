/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/core/Element'],function(q,E){"use strict";var H=E.extend("sap.ui.integration.Host",{metadata:{library:"sap.ui.integration",properties:{actions:{type:"sap.ui.integration.CardMenuAction[]"},resolveDestination:{type:"function",invalidate:false,parameters:{destinationName:{type:"string"}}}},events:{action:{allowPreventDefault:true,parameters:{card:{type:"sap.ui.core.Control"},actionConfig:{type:'object'},actionSource:{type:"sap.ui.core.Control"},parameters:{type:"object"},type:{type:"sap.ui.integration.CardActionType"}}}}}});H.prototype.getDestination=function(d){var r=this.getResolveDestination(),R;if(typeof r!=="function"){return Promise.reject("Could not resolve destination '"+d+"'. There is no 'resolveDestination' callback function configured in the host.");}R=r(d);if(!R){return Promise.reject("Destination '"+d+"' could not be resolved by the host.");}if(R instanceof Promise){return R;}return Promise.resolve(R);};H.prototype.getContextValue=function(p){if(!p){return Promise.resolve(null);}return Promise.resolve(null);};H.prototype.getDestinations=function(){return Promise.resolve([]);};H.prototype.getContexts=function(){return Promise.resolve({});};return H;});