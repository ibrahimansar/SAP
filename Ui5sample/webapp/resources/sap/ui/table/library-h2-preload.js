//@ui5-bundle sap/ui/table/library-h2-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/table/library',['sap/ui/core/Core','sap/ui/model/TreeAutoExpandMode','sap/ui/core/library','sap/ui/unified/library'],function(C,T){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.table",version:"1.84.0",dependencies:["sap.ui.core","sap.ui.unified"],designtime:"sap/ui/table/designtime/library.designtime",types:["sap.ui.table.NavigationMode","sap.ui.table.RowActionType","sap.ui.table.SelectionBehavior","sap.ui.table.SelectionMode","sap.ui.table.SortOrder","sap.ui.table.VisibleRowCountMode","sap.ui.table.TreeAutoExpandMode"],interfaces:[],controls:["sap.ui.table.AnalyticalColumnMenu","sap.ui.table.AnalyticalTable","sap.ui.table.ColumnMenu","sap.ui.table.CreationRow","sap.ui.table.Table","sap.ui.table.TreeTable","sap.ui.table.RowAction"],elements:["sap.ui.table.AnalyticalColumn","sap.ui.table.Column","sap.ui.table.Row","sap.ui.table.RowActionItem","sap.ui.table.RowSettings","sap.ui.table.rowmodes.RowMode","sap.ui.table.rowmodes.FixedRowMode","sap.ui.table.rowmodes.InteractiveRowMode","sap.ui.table.rowmodes.AutoRowMode","sap.ui.table.plugins.MultiSelectionPlugin","sap.ui.table.plugins.SelectionPlugin"],extensions:{flChangeHandlers:{"sap.ui.table.Column":{"propertyChange":"default"},"sap.ui.table.Table":{"moveElements":"default"},"sap.ui.table.AnalyticalTable":{"moveElements":"default"}},"sap.ui.support":{publicRules:true}}});var t=sap.ui.table;t.NavigationMode={Scrollbar:"Scrollbar",Paginator:"Paginator"};t.RowActionType={Custom:"Custom",Navigation:"Navigation",Delete:"Delete"};t.SelectionBehavior={Row:"Row",RowSelector:"RowSelector",RowOnly:"RowOnly"};t.SelectionMode={MultiToggle:"MultiToggle",Multi:"Multi",Single:"Single",None:"None"};t.SortOrder={Ascending:"Ascending",Descending:"Descending"};t.VisibleRowCountMode={Fixed:"Fixed",Interactive:"Interactive",Auto:"Auto"};t.SharedDomRef={HorizontalScrollBar:"hsb",VerticalScrollBar:"vsb"};t.GroupEventType={group:"group",ungroup:"ungroup",ungroupAll:"ungroupAll",moveUp:"moveUp",moveDown:"moveDown",showGroupedColumn:"showGroupedColumn",hideGroupedColumn:"hideGroupedColumn"};t.ColumnHeader=t.Column;t.TreeAutoExpandMode=T;if(!t.TableHelper){t.TableHelper={addTableClass:function(){return"";},createLabel:function(c){throw new Error("no Label control available!");},createTextView:function(c){throw new Error("no TextView control available!");},bFinal:false};}return t;});
sap.ui.require.preload({
	"sap/ui/table/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.ui.table","type":"library","embeds":[],"applicationVersion":{"version":"1.84.0"},"title":"Table-like controls, mainly for desktop scenarios.","description":"Table-like controls, mainly for desktop scenarios.","ach":"CA-UI5-TBL","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.84","libs":{"sap.ui.core":{"minVersion":"1.84.0"},"sap.ui.unified":{"minVersion":"1.84.0"}}},"library":{"i18n":{"bundleUrl":"messagebundle.properties","supportedLocales":["","ar","bg","ca","cs","da","de","el","en","en-GB","en-US-sappsd","en-US-saptrc","es","es-MX","et","fi","fr","hi","hr","hu","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","rigi","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh-CN","zh-TW"]},"content":{"controls":["sap.ui.table.AnalyticalColumnMenu","sap.ui.table.AnalyticalTable","sap.ui.table.ColumnMenu","sap.ui.table.CreationRow","sap.ui.table.Table","sap.ui.table.TreeTable","sap.ui.table.RowAction"],"elements":["sap.ui.table.AnalyticalColumn","sap.ui.table.Column","sap.ui.table.Row","sap.ui.table.RowActionItem","sap.ui.table.RowSettings","sap.ui.table.rowmodes.RowMode","sap.ui.table.rowmodes.FixedRowMode","sap.ui.table.rowmodes.InteractiveRowMode","sap.ui.table.rowmodes.AutoRowMode","sap.ui.table.plugins.MultiSelectionPlugin","sap.ui.table.plugins.SelectionPlugin"],"types":["sap.ui.table.NavigationMode","sap.ui.table.RowActionType","sap.ui.table.SelectionBehavior","sap.ui.table.SelectionMode","sap.ui.table.SortOrder","sap.ui.table.VisibleRowCountMode","sap.ui.table.TreeAutoExpandMode"],"interfaces":[]}}}}'
},"sap/ui/table/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/table/AnalyticalColumn.js":["sap/ui/core/Element.js","sap/ui/model/type/Boolean.js","sap/ui/model/type/DateTime.js","sap/ui/model/type/Float.js","sap/ui/model/type/Integer.js","sap/ui/model/type/Time.js","sap/ui/table/AnalyticalColumnMenu.js","sap/ui/table/Column.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/AnalyticalColumnMenu.js":["sap/ui/table/ColumnMenu.js","sap/ui/table/library.js","sap/ui/thirdparty/jquery.js","sap/ui/unified/MenuRenderer.js"],
"sap/ui/table/AnalyticalColumnMenuRenderer.js":["sap/ui/table/AnalyticalColumnMenu.js"],
"sap/ui/table/AnalyticalTable.js":["sap/base/Log.js","sap/base/assert.js","sap/base/util/UriParameters.js","sap/ui/model/SelectionModel.js","sap/ui/model/Sorter.js","sap/ui/model/analytics/ODataModelAdapter.js","sap/ui/table/AnalyticalColumn.js","sap/ui/table/Table.js","sap/ui/table/TableRenderer.js","sap/ui/table/TreeTable.js","sap/ui/table/library.js","sap/ui/table/plugins/BindingSelection.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js","sap/ui/unified/Menu.js","sap/ui/unified/MenuItem.js"],
"sap/ui/table/AnalyticalTableRenderer.js":["sap/ui/table/AnalyticalTable.js"],
"sap/ui/table/Column.js":["sap/base/Log.js","sap/base/util/JSTokenizer.js","sap/base/util/ObjectPath.js","sap/ui/core/Element.js","sap/ui/core/Popup.js","sap/ui/core/library.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js","sap/ui/model/FilterType.js","sap/ui/model/Sorter.js","sap/ui/model/Type.js","sap/ui/model/type/String.js","sap/ui/table/ColumnMenu.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/ColumnMenu.js":["sap/base/assert.js","sap/ui/Device.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js","sap/ui/unified/Menu.js","sap/ui/unified/MenuItem.js","sap/ui/unified/MenuRenderer.js","sap/ui/unified/MenuTextFieldItem.js"],
"sap/ui/table/ColumnMenuRenderer.js":["sap/ui/table/ColumnMenu.js"],
"sap/ui/table/CreationRow.js":["sap/m/Button.js","sap/m/OverflowToolbar.js","sap/m/ToolbarSpacer.js","sap/m/library.js","sap/ui/core/Control.js","sap/ui/table/Column.js","sap/ui/table/CreationRowRenderer.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/CreationRowRenderer.js":["sap/ui/core/Renderer.js","sap/ui/table/TableRenderer.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/Row.js":["sap/ui/core/Element.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/RowAction.js":["sap/ui/core/Control.js","sap/ui/core/Icon.js","sap/ui/core/Popup.js","sap/ui/table/RowActionRenderer.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/unified/Menu.js"],
"sap/ui/table/RowActionItem.js":["sap/ui/core/Element.js","sap/ui/core/IconPool.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/unified/MenuItem.js"],
"sap/ui/table/RowActionRenderer.js":["sap/ui/table/Row.js"],
"sap/ui/table/RowSettings.js":["sap/ui/base/DataType.js","sap/ui/core/Element.js","sap/ui/core/library.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/Table.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/Element.js","sap/ui/core/IconPool.js","sap/ui/core/util/PasteHelper.js","sap/ui/model/BindingMode.js","sap/ui/model/ChangeReason.js","sap/ui/model/Filter.js","sap/ui/model/Sorter.js","sap/ui/table/Column.js","sap/ui/table/Row.js","sap/ui/table/TableRenderer.js","sap/ui/table/extensions/Accessibility.js","sap/ui/table/extensions/DragAndDrop.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/extensions/Keyboard.js","sap/ui/table/extensions/Pointer.js","sap/ui/table/extensions/Scrolling.js","sap/ui/table/library.js","sap/ui/table/plugins/SelectionModelSelection.js","sap/ui/table/rowmodes/AutoRowMode.js","sap/ui/table/rowmodes/FixedRowMode.js","sap/ui/table/rowmodes/InteractiveRowMode.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/TablePersoController.js":["sap/base/Log.js","sap/ui/base/ManagedObject.js","sap/ui/core/syncStyleClass.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/TableRenderer.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/IconPool.js","sap/ui/core/Renderer.js","sap/ui/core/theming/Parameters.js","sap/ui/table/Column.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/TreeTable.js":["sap/base/Log.js","sap/base/assert.js","sap/ui/core/Element.js","sap/ui/model/ClientTreeBindingAdapter.js","sap/ui/model/TreeBindingCompatibilityAdapter.js","sap/ui/table/Table.js","sap/ui/table/TableRenderer.js","sap/ui/table/library.js","sap/ui/table/plugins/BindingSelection.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/TreeTableRenderer.js":["sap/ui/table/TreeTable.js"],
"sap/ui/table/extensions/Accessibility.js":["sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/table/extensions/AccessibilityRender.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/extensions/AccessibilityRender.js":["sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/extensions/DragAndDrop.js":["sap/ui/core/library.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/extensions/ExtensionBase.js":["sap/ui/base/Object.js"],
"sap/ui/table/extensions/Keyboard.js":["sap/ui/Device.js","sap/ui/core/delegate/ItemNavigation.js","sap/ui/dom/containsOrEquals.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/extensions/KeyboardDelegate.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/extensions/KeyboardDelegate.js":["sap/ui/Device.js","sap/ui/base/Object.js","sap/ui/events/KeyCodes.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/extensions/Pointer.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/core/Popup.js","sap/ui/dom/jquery/control.js","sap/ui/dom/jquery/scrollLeftRTL.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/extensions/Scrolling.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/performance/trace/Interaction.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/extensions/Synchronization.js":["sap/base/Log.js","sap/ui/table/Table.js","sap/ui/table/extensions/ExtensionBase.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/library.js":["sap/ui/core/Core.js","sap/ui/core/library.js","sap/ui/model/TreeAutoExpandMode.js","sap/ui/unified/library.js"],
"sap/ui/table/library.support.js":["sap/ui/table/rules/Accessibility.support.js","sap/ui/table/rules/Binding.support.js","sap/ui/table/rules/ColumnTemplate.support.js","sap/ui/table/rules/Plugins.support.js","sap/ui/table/rules/Rows.support.js"],
"sap/ui/table/plugins/BindingSelection.js":["sap/ui/table/library.js","sap/ui/table/plugins/SelectionPlugin.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/plugins/MultiSelectionPlugin.js":["sap/base/Log.js","sap/ui/core/Icon.js","sap/ui/core/IconPool.js","sap/ui/table/library.js","sap/ui/table/plugins/BindingSelection.js","sap/ui/table/plugins/SelectionModelSelection.js","sap/ui/table/plugins/SelectionPlugin.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/plugins/PluginBase.js":["sap/ui/core/Element.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/plugins/SelectionModelSelection.js":["sap/ui/model/SelectionModel.js","sap/ui/table/library.js","sap/ui/table/plugins/SelectionPlugin.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/plugins/SelectionPlugin.js":["sap/ui/core/Element.js","sap/ui/table/library.js","sap/ui/table/plugins/PluginBase.js"],
"sap/ui/table/plugins/V4Aggregation.js":["sap/ui/table/plugins/PluginBase.js","sap/ui/table/utils/TableUtils.js","sap/ui/unified/MenuItem.js"],
"sap/ui/table/rowmodes/AutoRowMode.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/table/library.js","sap/ui/table/rowmodes/RowMode.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/rowmodes/FixedRowMode.js":["sap/ui/table/library.js","sap/ui/table/rowmodes/RowMode.js","sap/ui/table/utils/TableUtils.js"],
"sap/ui/table/rowmodes/InteractiveRowMode.js":["sap/base/Log.js","sap/ui/table/library.js","sap/ui/table/rowmodes/RowMode.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/rowmodes/RowMode.js":["sap/base/Log.js","sap/ui/core/Element.js","sap/ui/table/library.js","sap/ui/table/utils/TableUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/rowmodes/VariableRowMode.js":["sap/ui/table/library.js","sap/ui/table/rowmodes/RowMode.js"],
"sap/ui/table/rules/Accessibility.support.js":["sap/ui/core/library.js","sap/ui/support/library.js","sap/ui/table/rules/TableHelper.support.js"],
"sap/ui/table/rules/Binding.support.js":["sap/base/Log.js","sap/ui/support/library.js","sap/ui/table/rules/TableHelper.support.js"],
"sap/ui/table/rules/ColumnTemplate.support.js":["sap/ui/support/library.js","sap/ui/table/rules/TableHelper.support.js"],
"sap/ui/table/rules/Plugins.support.js":["sap/ui/support/library.js","sap/ui/table/rules/TableHelper.support.js"],
"sap/ui/table/rules/Rows.support.js":["sap/ui/Device.js","sap/ui/support/library.js","sap/ui/table/rules/TableHelper.support.js"],
"sap/ui/table/rules/TableHelper.support.js":["sap/base/Log.js","sap/ui/support/library.js"],
"sap/ui/table/utils/TableUtils.js":["sap/base/util/restricted/_throttle.js","sap/ui/base/Object.js","sap/ui/core/ResizeHandler.js","sap/ui/core/library.js","sap/ui/core/theming/Parameters.js","sap/ui/model/ChangeReason.js","sap/ui/table/library.js","sap/ui/table/utils/_BindingUtils.js","sap/ui/table/utils/_ColumnUtils.js","sap/ui/table/utils/_GroupingUtils.js","sap/ui/table/utils/_HookUtils.js","sap/ui/table/utils/_MenuUtils.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/utils/_ColumnUtils.js":["sap/base/Log.js","sap/ui/Device.js","sap/ui/table/library.js"],
"sap/ui/table/utils/_GroupingUtils.js":["sap/ui/Device.js","sap/ui/core/Element.js","sap/ui/model/Sorter.js","sap/ui/table/library.js","sap/ui/thirdparty/jquery.js"],
"sap/ui/table/utils/_HookUtils.js":["sap/base/Log.js","sap/ui/base/DataType.js"],
"sap/ui/table/utils/_MenuUtils.js":["sap/ui/Device.js","sap/ui/core/Popup.js","sap/ui/unified/Menu.js","sap/ui/unified/MenuItem.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map