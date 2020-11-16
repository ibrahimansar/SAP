/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var F={};F.render=function(R,c){var m=c.getId();R.write("<div");R.writeControlData(c);R.addClass("sapMFeedInBase");R.writeAttribute("role","group");R.writeAttributeEscaped("aria-label",r.getText("FEED_INPUT_ARIA_LABEL"));R.writeClasses();R.write(">");R.write('<div id="'+m+'-outerContainer"');R.addClass("sapMFeedIn");if(!c.getShowIcon()){R.addClass("sapMFeedInNoIcon");}if(!c.getEnabled()){R.addClass("sapMFeedInDisabled");}R.writeClasses();R.write(">");if(!!c.getShowIcon()){this._addImage(R,c,m);}R.write('<div id="'+m+'-container"');R.addClass("sapMFeedInContainer");R.writeClasses();R.write(">");var t=c._getTextArea();R.renderControl(t);R.renderControl(c._getPostButton());R.write("</div>");R.write("</div>");R.write('<div id="'+m+'-counterContainer"');R.addClass("sapMFeedInCounter");R.writeClasses();R.write(">");R.write("</div>");R.write("</div>");};F._addImage=function(R,c,m){R.write('<figure id="'+m+'-figure" class ="sapMFeedInFigure');if(!!c.getIcon()){R.write('">');}else{R.write(' sapMFeedListItemIsDefaultIcon">');}R.renderControl(c._getImageControl());R.write('</figure>');};return F;},true);
