/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","ojs/ojeditablevalue","ojs/ojradiocheckbox"],function(a,g){(function(){a.ab("oj.ojCheckboxset",g.oj.editableValue,{version:"1.0.0",defaultElement:"\x3cdiv\x3e",widgetEventPrefix:"oj",options:{disabled:!1,required:!1,value:void 0},refresh:function(){this._super();this.hb()},widget:function(){return this.xVa},validate:a.pa.validate,Vg:function(b,c){var e=[],f;this._super(b,c);a.pa.dr([{ra:"disabled",Ue:!0},{ra:"title"},{ra:"placeholder"},{ra:"required",fj:!0,Ue:!0}],c,
this);this.Pg=this.JX();void 0===c.value?(f=this.Pg.filter(":checked"),0<f.length&&(f.each(function(){e.push(g(this).val())}),this.option("value",e,{_context:{zd:!0,kb:!0}})),void 0===this.options.value&&(this.options.value=[])):this.$aa(this.options.value)},_ComponentCreate:function(){this._super();if(this.element.is("fieldset"))throw Error("ojCheckboxset cannot be bound to a fieldset. Use a div instead.");this.Pg._ojRadioCheckbox().attr("data-oj-internal","");this.xVa=this.element.addClass("oj-checkboxset oj-component").attr("role",
"group").wrapInner("\x3cdiv class\x3d'oj-checkboxset-wrapper'\x3e\x3c/div\x3e");this._on(this.us);this.hb()},cV:function(){this.Pg=this.JX();this.Pg.filter(".oj-checkbox").each(function(){var a=void 0!==g(this).attr("disabled")?!!g(this).prop("disabled"):!1;g(this)._ojRadioCheckbox("option","disabled",a)});this.Pg.not(".oj-checkbox")._ojRadioCheckbox()},Focus:function(){this.cg().first().focus();return!0},fV:function(){},li:function(){return this.options.required},ve:a.pa.ve,JX:function(){var b;b=
this.element.find("input[type\x3dcheckbox]:first");0===b.length&&a.C.warn("Could not find any input type\x3dcheckbox within this element");b=b.attr("name");return void 0===b?(b=this.element.find("input[type\x3dcheckbox]"),b.not("[name]")):this.element.find("input[type\x3dcheckbox][name\x3d"+b+"]")},mi:function(a,c,e){a=this.element.find("input[type\x3dcheckbox]:tabbable").first();this.oi(c,e,{launcher:a})},_GetMessagingLauncherElement:function(){return this.widget()},hb:function(){this.lv(this.options.disabled);
null!==this.Pg&&(1===this.Pg.length?this.element.addClass("oj-checkboxset-single"):this.element.removeClass("oj-checkboxset-single"));this.element.hasClass("oj-choice-direction-column")||this.element.hasClass("oj-choice-direction-row")||this.element.addClass("oj-choice-direction-column");this.ve(this.options.required)},us:{change:function(a){this.eL(a)}},$aa:function(a){if(!Array.isArray(a))throw Error("Invalid 'value' set on JET Checkboxset: "+a+".It must be an Array. ");},eL:function(a){var d;d=
this.Pg;0<d.length&&d.each(function(){this===a.target&&g(this)._ojRadioCheckbox("setSelectedClass",a.target.checked)});d=this.ji();this.dc(d,a,c)},ji:function(){return this.fu()},Jj:function(a){var c,e,f=this.Pg.length,h;this.$aa(a);if(null===a||void 0===a||0===a.length)this.Pg._ojRadioCheckbox("option","checked",!1);else for(e=0;e<f;e++){h=g(this.Pg[e]);c=h[0].value;c=a.indexOf(c);var k=h._ojRadioCheckbox("option","checked");-1!==c?k||h._ojRadioCheckbox("option","checked",!0):k&&h._ojRadioCheckbox("option",
"checked",!1)}},fu:function(){var a=[],c=this.Pg.filter(":checked");if(0===c.length)return[];c.each(function(){a.push(g(this).val())});return a},_GetDefaultStyleClass:function(){return"oj-checkboxset"},cg:function(){if(null!=this.Pg)return this.Pg;this.JX()},Ww:function(){return!0},ag:a.pa.ag,lv:function(a){a=!!a;this.Pg.each(function(){g(this).data("oj-_ojRadioCheckbox").fF(a)});this.Pg._ojRadioCheckbox("refreshDisabled")},_setOption:function(a,c,e){this._super(a,c,e);"disabled"===a&&this.lv(c)},
Nr:function(a,c,e){this._superApply(arguments);switch(a){case "required":this.ag(a)}},getNodeBySubId:function(a){var c=this._super(a);return c||(a=a.subId,"oj-checkboxset-inputs"!==a)?c||null:this.Pg.get()},_destroy:function(){var a=this._super(),c=this.element[0].firstChild;this.Pg&&this.Pg._ojRadioCheckbox("destroy");g(c).contents().unwrap();return a}});var c={Hv:!1}})();a.U.qb("oj-checkboxset","editableValue",{properties:{disabled:{type:"boolean"},required:{type:"boolean"},value:{type:"Array"}},
methods:{destroy:{},refresh:{},widget:{},validate:{}},extension:{nb:"ojCheckboxset"}});a.U.register("oj-checkboxset",{metadata:a.U.getMetadata("oj-checkboxset")})});