/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/Utils"],function(i,J,U){"use strict";var P="sap.ui.fl:PendingChange";var D={};function g(s,A){return J.getControlIdBySelector(s,A);}function c(C){return{changeObject:C,dependencies:[],controlsDependencies:[],dependentIds:[]};}function a(s,C,o){d(o,C,s);b(o,C);}function b(C,o){if(!i(C.aChanges,o)){C.aChanges.push(o);}}function d(C,o,s){if(!C.mChanges[s]){C.mChanges[s]=[];}if(!i(C.mChanges[s],o)){C.mChanges[s].push(o);}}function e(C,A,o){var s=C.getSelector();if(s){if(s.id){a(g(s,A),C,o);}else{b(o,C);}}return o.aChanges;}function f(E,o){return E.some(function(p){return(p.id===o.id&&p.idIsLocal===o.idIsLocal);});}function h(t,o,E,C,A,p,q){var r=E.getDependentSelectorList();o.some(function(s){if(f(r,s)){var u=g(s,A);var I=C&&p.indexOf(t)<p.indexOf(E);if(I){l(E,t,u,q,true);}else{l(t,E,u,q);}return true;}});}function j(t,A,C,o){if(t.isValidForDependencyMap()){var p=t.getDependentSelectorList();k(t,p,A,o);var I=C.indexOf(t);var q=I<(C.length-1);var O=C.slice();O.splice(I,1);O.reverse().forEach(function(E){if(E.isValidForDependencyMap()){h(t,p,E,q,A,C,o);}});}}function k(o,p,A,C){if(p.length){var q=p.map(function(s){return g(s,A);});if(!C.mDependencies[o.getId()]){C.mDependencies[o.getId()]=c(o);}C.mDependencies[o.getId()].controlsDependencies=q;q.forEach(function(I){C.mControlsWithDependencies[I]=C.mControlsWithDependencies[I]||[];C.mControlsWithDependencies[I].push(o.getId());});}}function l(o,C,s,p,I){if(m(o,C,s,p,I)){p.mDependencies[o.getId()].dependencies.push(C.getId());if(!i(p.mDependencies[o.getId()].dependentIds,s)){p.mDependencies[o.getId()].dependentIds.push(s);}if(!p.mDependentChangesOnMe[C.getId()]){p.mDependentChangesOnMe[C.getId()]=[];}p.mDependentChangesOnMe[C.getId()].push(o.getId());}}function m(o,C,s,p,I){var S=!I&&i(p.mDependencies[o.getId()].dependentIds,s);var q=false;if(p.mDependentChangesOnMe[C.getId()]){p.mDependentChangesOnMe[C.getId()].some(function(r){q=i(p.mDependencies[o.getId()].dependencies,r);return q;});}return!S&&!q;}function n(C,s){var o=[];var p=[];var q=[];if(C.dependencyRemovedInLastBatch[s]){C.dependencyRemovedInLastBatch[s].forEach(function(r){var t=C.mDependencies[r];if(t&&t.dependencies.length===0&&!(t.controlsDependencies&&t.controlsDependencies.length)){p.push(r);o.push(t.changeObject.getId());if(t[P]){q.push(function(){return t[P]();});}}});}return U.execPromiseQueueSequentially(q).then(function(o,p,s){delete C.dependencyRemovedInLastBatch[s];p.forEach(function(r){delete C.mDependencies[r];});o.forEach(function(r){D.resolveDependenciesForChange(C,r,s);});return!!o.length;}.bind(undefined,o,p,s));}D.createEmptyDependencyMap=function(){return{aChanges:[],mChanges:{},mDependencies:{},mDependentChangesOnMe:{},mControlsWithDependencies:{},dependencyRemovedInLastBatch:{}};};D.addChangeAndUpdateDependencies=function(C,A,o){var p=e(C,A,o);j(C,A,p,o);};D.addRuntimeChangeAndUpdateDependencies=function(C,A,o,I){var p=e(C,A,o);j(C,A,p,I);};D.processDependentQueue=function(C,A,s){return n(C,s).then(function(s,o){if(o){return D.processDependentQueue(C,A,s);}}.bind(undefined,s));};D.addChangeApplyCallbackToDependency=function(C,s,o){C.mDependencies[s][P]=o;};D.removeControlsDependencies=function(C,s){var o=C.mControlsWithDependencies[s];if(o){o.forEach(function(p){var q=C.mDependencies[p];if(q&&q.controlsDependencies&&q.controlsDependencies.length){var I=q.controlsDependencies.indexOf(s);if(I>-1){q.controlsDependencies.splice(I,1);delete C.mControlsWithDependencies[s];C.dependencyRemovedInLastBatch[s]=C.dependencyRemovedInLastBatch[s]||[];if(!i(C.dependencyRemovedInLastBatch[s],p)){C.dependencyRemovedInLastBatch[s].push(p);}}}});delete C.mControlsWithDependencies[s];}};D.resolveDependenciesForChange=function(C,s,o){var p=C.mDependentChangesOnMe[s];if(p){p.forEach(function(K){var q=C.mDependencies[K];var I=q?q.dependencies.indexOf(s):-1;if(I>-1){q.dependencies.splice(I,1);C.dependencyRemovedInLastBatch[o]=C.dependencyRemovedInLastBatch[o]||[];if(!i(C.dependencyRemovedInLastBatch[o],K)){C.dependencyRemovedInLastBatch[o].push(K);}}});delete C.mDependentChangesOnMe[s];}};D.removeChangeFromMap=function(C,s){Object.keys(C.mChanges).some(function(o){var p=C.mChanges[o];var q=p.map(function(E){return E.getId();}).indexOf(s);if(q!==-1){p.splice(q,1);return true;}});var I=C.aChanges.map(function(E){return E.getId();}).indexOf(s);if(I!==-1){C.aChanges.splice(I,1);}};D.removeChangeFromDependencies=function(C,s,o){D.resolveDependenciesForChange(C,s,o);delete C.mDependencies[s];};D.checkForOpenDependenciesForControl=function(C,s,A){return Object.keys(C.mDependencies).some(function(K){return C.mDependencies[K].changeObject.getDependentSelectorList().some(function(o){return J.getControlIdBySelector(o,A)===s;});});};return D;});
