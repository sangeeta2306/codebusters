/*
 * jQuery validation plug-in 1.7
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.validate.js 6403 2009-06-17 14:27:16Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}var validator=$.data(this[0],'validator');if(validator){return validator;}validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}this.submit(function(event){if(validator.settings.debug)event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}return false;}return true;}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}return handle();}else{validator.focusInvalid();return false;}});}return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}if(params.constructor!=Array){params=[params];}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.errorsFor(element).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)this.element(element);else if(element.parentNode.name in this.submitted)this.element(element.parentNode);},highlight:function(element,errorClass,validClass){$(element).addClass(errorClass).removeClass(validClass);},unhighlight:function(element,errorClass,validClass){$(element).removeClass(errorClass).addClass(validClass);}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");validator.settings[eventType]&&validator.settings[eventType].call(validator,this[0]);}$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",delegate).validateDelegate(":radio, :checkbox, select, option","click",delegate);if(this.settings.invalidHandler)$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)$(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name)[0];}var rules=$(element).rules();var dependencyMismatch=false;for(method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method",e);throw e;}}if(dependencyMismatch)return;if(this.objectLength(rules))this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)return arguments[i];}return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}if(!this.labelContainer.append(label).length)this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))return this.findByName(element.name).filter(':checked').length;}return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}if(rules.messages){delete rules.messages;}return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(previous.old!==value){previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=(previous.message=response||validator.defaultMessage(element,"remote"));errors[element.name]=$.isFunction(message)?message(value):message;validator.showErrors(errors);}previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}else if(this.pending[element.name]){return"pending";}return previous.valid;},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))return"dependency-mismatch";if(/[^0-9-]+/.test(value))return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)nDigit-=9;}nCheck+=nDigit;bEven=!bEven;}return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var ajax=$.ajax;var pendingRequests={};$.ajax=function(settings){settings=$.extend(settings,$.extend({},$.ajaxSettings,settings));var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}return(pendingRequests[port]=ajax.apply(this,arguments));}return ajax.apply(this,arguments);};})(jQuery);;(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});};$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});})(jQuery);
var renderGooglePlusBtn = function () {
    gapi.signin.render('google-plus-btn-id', {
        'clientid': askbot.settings.googlePlusPublicKey,
        'cookiepolicy': 'single_host_origin',
        'scope': 'https://www.googleapis.com/auth/plus.login'
    });
};

$.fn.authenticator = function () {
    var signin_page = $(this);
    var signin_form = $('#signin-form');
    var openid_login_token_input = $('input[name=openid_login_token]');
    var openid_login_token_input_fields = $('#openid-fs');
    var provider_name_input = $('input[name=login_provider_name]');
    var password_input_fields = $('#password-fs');
    var existing_login_methods_div = $('#existing-login-methods');
    var openid_submit_button = $('input[name=openid_login_with_extra_token]');
    var existing_login_methods = {};

    var setup_click_handler = function (elements, handler_function) {
        elements.unbind('click').click(handler_function);
    };

    var setup_enter_key_handler = function (elements, handler_function) {
        elements.each(
            function (index, element) {
                $(element).unbind('keypress').keypress(
                    function (e) {
                        if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                            if (handler_function) {
                                return handler_function ();
                            } else {
                                element.click();
                                return false;
                            }
                        }
                    }
                );
            }
        );
    };

    var setup_event_handlers = function (elements, handler_function) {
        setup_click_handler(elements, handler_function);
        setup_enter_key_handler(elements);
    };

    var get_provider_name = function (row_el) {
        var row = $(row_el);
        var name_span = row.find('.ab-provider-name');
        var provider_name = $.trim(name_span.html());
        return provider_name;
    };

    var read_existing_login_methods = function () {
        $('.ab-provider-row').each(
            function (i, provider_row) {
                var provider_name = get_provider_name(provider_row);
                existing_login_methods[provider_name] = true;
            }
        );
    };

    var setup_login_method_deleters = function () {
        $('.ab-provider-row').each(
            function (i, provider_row) {
                var provider_name = get_provider_name(provider_row);
                var remove_button = $(
                                    provider_row
                                ).find('button');
                remove_button.click(
                    function () {
                        var message = interpolate(gettext('Are you sure you want to remove your %s login?'), [provider_name]);
                        if (confirm(message)) {
                            $.ajax({
                                type: 'POST',
                                url: askbot.urls.deleteLoginMethod,
                                data: {provider_name: provider_name},
                                success: function (data, text_status, xhr) {
                                    $(provider_row).remove();
                                    delete existing_login_methods[provider_name];
                                    askbot.auth.providerCount -= 1;
                                    if (askbot.auth.providerCount <= 0) {
                                        askbot.auth.providerCount = 0;
                                    }
                                    if (askbot.auth.providerCount === 0) {
                                        $('#ab-existing-login-methods').remove();
                                        $('#ab-show-login-methods').remove();
                                        $('h1').html(
                                            gettext('Please add one or more login methods.')
                                        );
                                        $('.js-login-intro').html(
                                            gettext('You don\'t have a method to log in right now, please add one or more by clicking any of the icons below.')
                                        );
                                        existing_login_methods = null;
                                    }
                                }
                            });
                        }
                    }
                );
            }
        );
    };

    /**
     * field - jQuery element of input
     * returns error label for this field
     */
    var getErrorLabel = function (field) {
        var group = field.closest('.form-group');
        var error = group.find('.form-error');
        if (error.length) {
            return error;
        } else {
            field.before('<span class="error form-error" generated="true""></span>');
            return group.find('.form-error');
        }
    };

    /**
     * sets error text and .has-error class
     * to the .form-group
     * field - jQuery element of input field
     * text - text of error label
     */
    var setError = function(field, text) {
        var error = getErrorLabel(field);
        error.text(text);
        error.closest('.form-group').addClass('has-error');
    }

    var clearError = function(field) {
        setError(field, '');
        field.closest('.form-group').removeClass('has-error');
    };

    var submit_login_with_password = function () {
        var username = $('#id_username');
        var password = $('#id_password');
        var ok = true;
        var text;

        if (username.val().length < 1) {
            username.focus();
            if (askbot.settings.useLdapForPasswordLogin) {
                text = gettext('enter username');
            } else {
                text = gettext('enter username or email');
            }
            setError(username, text);
            ok = false;
        } else {
            clearError(username);
        }
        if (password.val().length < 1) {
            password.focus();
            setError(password, gettext('enter password'));
            ok = false;
        } else {
            clearError(password);
        }
        return ok;
    };

    var submit_change_password = function () {
        var newpass = $('#id_new_password');
        var newpass_retyped = $('#id_new_password_retyped');
        if (newpass.val().length < 1) {
            newpass.focus();
            return false;
        }
        if (newpass_retyped.val().length < 1) {
            newpass_retyped.focus();
            return false;
        }
        if (newpass.val() !== newpass_retyped.val()) {
            newpass_retyped.after(
                    '<span class="error">' +
                    gettext('passwords do not match') +
                    '</span>'
                );
            newpass.val('').focus();
            newpass_retyped.val('');
            return false;
        }
        return true;
    };

    //validator, may be extended to check url for openid
    var submit_with_extra_openid_token = function () {
        if (openid_login_token_input.val().length < 1) {
            openid_login_token_input.focus();
            return false;
        }
        return true;
    };

    var insert_login_list_enabler = function () {
        var enabler = $('#login-list-enabler');
        if (enabler.is('p#login-list-enabler')) {
            enabler.show();
        } else {
            enabler = $(
                    '<p id="login-list-enabler"><a href="#">' +
                    gettext('Show/change current login methods') +
                    '</a></p>');
            setup_event_handlers(
                enabler,
                function () {
                    if (askbot.settings.signin_always_show_local_login === false) {
                        password_input_fields.hide();
                    }
                    openid_login_token_input_fields.hide();
                    enabler.hide();
                    existing_login_methods_div.show();
                }
            );
            existing_login_methods_div.after(enabler);
        }
    };

    var reset_password_input_fields = function () {
        if (askbot.data.userIsAuthenticated) {
            $('#id_new_password').val('');
            $('#id_new_password_retyped').val('');
        } else {
            $('#id_username').val('');
            $('#id_password').val('');
        }
    };

    var reset_form = function () {
        openid_login_token_input_fields.hide();
        if (askbot.settings.signin_always_show_local_login === false) {
            password_input_fields.hide();
        }
        reset_password_input_fields();
        if (askbot.data.userIsAuthenticated !== false) {
            if (existing_login_methods !== null) {
                existing_login_methods_div.hide();
                insert_login_list_enabler();
            }
        }
    };

    var reset_form_and_errors = function () {
        reset_form();
        $('.error').remove();
    };

    var set_provider_name = function (element) {
        var provider_name = element.attr('name');
        provider_name_input.val(provider_name);
    };

    var show_openid_input_fields = function (provider_name) {
        reset_form_and_errors();
        var token_name = askbot.auth.extraTokenName[provider_name];
        if (askbot.data.userIsAuthenticated) {
            $('#openid-heading').html(
                interpolate(gettext('Please enter your %s, then proceed'), [token_name])
            );
            var button_text = gettext('Connect your %(provider_name)s account to %(site)s');
            var data = {
                provider_name: provider_name,
                site: askbot.settings.siteName
            };
            button_text = interpolate(button_text, data, true);
            openid_submit_button.val(button_text);
        } else {
            $('#openid-heading>span').html(token_name);
        }
        openid_login_token_input_fields.show();
        openid_login_token_input.focus();
    };

    var start_simple_login = function () {
        //$('#openid_form .providers td').removeClass('highlight');
        //$li.addClass('highlight');
        set_provider_name($(this));
        signin_form.submit();
        return true;
    };

    var start_login_with_extra_openid_token = function () {
        show_openid_input_fields($(this).attr('name'));
        set_provider_name($(this));

        setup_enter_key_handler(
            openid_login_token_input,
            function () {
                openid_submit_button.click();
                return false;
            }
        );

        setup_event_handlers(
            openid_submit_button,
            function () {
                signin_form.unbind(
                                'submit'
                            ).submit(
                                submit_with_extra_openid_token
                            );
            }
        );
        return false;
    };

    var start_facebook_login = function () {
        set_provider_name($(this));
        if (typeof FB !== 'undefined') {
            FB.getLoginStatus(function (response) {
                if (response.authResponse) {
                    signin_form.submit();
                } else {
                    if (FB.getAuthResponse()) {
                        signin_form.submit();
                    }
                    FB.login();
                }
            });
        }
        return false;
    };

    var start_password_login_or_change = function () {
        //called upon clicking on one of the password login buttons
        reset_form_and_errors();
        set_provider_name($(this));
        var provider_name = $(this).attr('name');
        return setup_password_login_or_change(provider_name);
    };

    var init_password_login = function () {
        //reset_form();
        //will break wordpress and ldap
        provider_name_input.val('local');
        setup_password_login_or_change('local');
    };

    var setup_password_login_or_change = function (provider_name) {
        var token_name = askbot.auth.extraTokenName[provider_name];
        var password_action_input = $('input[name=password_action]');
        var provider_cleaned_name;
        var password_heading_text;
        var password_button_text;
        var password_button = $('input[name=change_password]');
        var submit_action = submit_change_password;
        var focus_input = $('#id_new_password');
        var submittable_input = $('#id_new_password_retyped');

        if (askbot.data.userIsAuthenticated && !askbot.settings.useLdapForPasswordLogin) {

            if (provider_name === 'local') {
                provider_cleaned_name = askbot.settings.siteName;
            } else {
                provider_cleaned_name = provider_name;
            }
            if (existing_login_methods && existing_login_methods[provider_name]) {
                password_heading_text = interpolate(gettext('Change your %s password'), [provider_cleaned_name]);
                password_button_text = gettext('Change password');
            } else {
                password_heading_text = interpolate(gettext('Create a password for %s'), [provider_cleaned_name]);
                password_button_text = gettext('Create password');
            }
            $('#password-heading').html(password_heading_text);
            password_button.val(password_button_text);
            password_action_input.val('change_password');
        } else {
            $('#password-heading>span').html(token_name);
            password_button = $('input[name=login_with_password]');
            submit_action = submit_login_with_password;
            var create_pw_link = $('a.create-password-account');
            if (create_pw_link.length > 0) {
                create_pw_link.html(gettext('Create a password-protected account'));
                var url = create_pw_link.attr('href');
                if (url.indexOf('?') !== -1) {
                    url = url.replace(/\?.*$/, '?login_provider=' + provider_name);
                } else {
                    url += '?login_provider=' + provider_name;
                }
                create_pw_link.attr('href', url);
            }
            password_action_input.val('login');
            focus_input = $('#id_username');
            submittable_input = $('#id_password');
        }
        password_input_fields.show();
        focus_input.focus();

        var submit_password_login = function () {
            signin_form.unbind('submit').submit(submit_action);
        };

        setup_enter_key_handler(
            submittable_input,
            function () {
                password_button.click();
                return false;
            }
        );
        setup_event_handlers(password_button, submit_password_login);
        return false;
    };

    var start_mozilla_persona_login = function () {
        navigator.id.request();
        return false;
    };

    var clear_password_fields = function () {
        $('#id_password').val('');
        $('#id_new_password').val('');
        $('#id_new_password_retyped').val('');
    };

    var setupMozillaPersonaListeners = function () {
        navigator.id.watch({
            //loggedInUser: askbot.data.userEmail,
            onlogin: function (assertion) {
                var assertionElement = signin_form.find('input[name=persona_assertion]');
                assertionElement.val(assertion);
                provider_name_input.val('mozilla-persona');
                signin_form.submit();
                return false;
            }
        });
    };

    var activateGooglePlusBtn = function (btn) {
        //add id to button - so that the "render" call would find it
        btn.attr('id', 'google-plus-btn-id');
        //load script with the gplus button code
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        //the global function renderGooglePlusBtn defined above will activate the button
        po.src = 'https://apis.google.com/js/client:plusone.js?onload=renderGooglePlusBtn';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    };

    var setup_default_handlers = function () {

        setup_event_handlers(
            signin_page.find('input.openid-username'),
            start_login_with_extra_openid_token
        );

        setup_event_handlers(
            signin_page.find('input.openid-generic'),
            start_login_with_extra_openid_token
        );

        var mozillaPersonaBtn = signin_page.find('input.mozilla-persona');

        if (mozillaPersonaBtn.length) {
            var mozillaPersonaInitiated = false;
            var personaListener = function () {
                if (mozillaPersonaInitiated === false) {
                    setupMozillaPersonaListeners();
                    mozillaPersonaInitiated = true;
                }
                start_mozilla_persona_login();
                return false;
            };
            setup_event_handlers(
                signin_page.find('input.mozilla-persona'),
                personaListener
            );
        }

        setup_event_handlers(
            signin_page.find('input.oauth, input.oauth2, input.openid-direct, input.cas'),
            start_simple_login
        );

        setup_event_handlers(
            signin_page.find('input.password'),
            start_password_login_or_change
        );
        setup_event_handlers(
            signin_page.find('input.wordpress_site'),
            start_password_login_or_change
        );

        if (askbot.data.userIsAuthenticated) {
            read_existing_login_methods();
            setup_login_method_deleters();
        }
    };

    setup_default_handlers();
    init_password_login();
    clear_password_fields();
    return this;
};


/**
 * @constructor
 */
var ChangePasswordForm = function () {
    WrappedElement.call(this);
};
inherits(ChangePasswordForm, WrappedElement);

ChangePasswordForm.prototype.showMessage = function (message, callback) {
    var flash = new FlashAlert('...saved, thanks');
    if (callback) {
        flash.setPostRunHandler(callback);
    }
    this._passwordHeading.append(flash.getElement());
    flash.run();
};

ChangePasswordForm.prototype.clearErrors = function () {
    this._pwInput1Errors.html('');
    this._pwInput1Group.removeClass('has-error');
    this._pwInput2Errors.html('');
    this._pwInput2Group.removeClass('has-error');
};

ChangePasswordForm.prototype.showErrors = function (errors) {
    if (errors.new_password) {
        this._pwInput1Errors.html(errors.new_password[0]);
        this._pwInput1Group.addClass('has-error');
    }
    if (errors.new_password_retyped) {
        this._pwInput2Errors.html(errors.new_password_retyped[0]);
        this._pwInput2Group.addClass('has-error');
    }
    if (errors.__all__) {
        this._pwInput2Errors.html(errors.__all__[0]);
        this._pwInput2Group.addClass('has-error');
    }
};

ChangePasswordForm.prototype.getData = function () {
    return {
        'new_password': this._pwInput1.val(),
        'new_password_retyped': this._pwInput2.val()
    };
};

ChangePasswordForm.prototype.getSubmitHandler = function () {
    var me = this;
    return function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: me.getData(),
            url: askbot.urls.changePassword,
            success: function (data) {
                if (data.message) {
                    if (me.inAccountRecovery()) {
                        var callback = function () {
                            window.location.href = askbot.urls.questions;
                        };
                        me.showMessage(data.message, callback);
                    } else {
                        me.showMessage(data.message);
                    }
                    me.clearErrors();
                }
                if (data.errors) {
                    me.clearErrors();
                    me.showErrors(data.errors);
                }
            }
        });
        return false;
    };
};

ChangePasswordForm.prototype.inAccountRecovery = function () {
    return ($('input[name="in_recovery"]').length === 1);
};

ChangePasswordForm.prototype.decorate = function (element) {
    this._element = element;
    this._pwInput1 = element.find('#id_new_password');
    this._pwInput2 = element.find('#id_new_password_retyped');
    this._pwInput1Group = element.find('.js-new_password');
    this._pwInput2Group = element.find('.js-new_password_retyped');
    this._pwInput1Errors = element.find('.js-new_password .form-error');
    this._pwInput2Errors = element.find('.js-new_password_retyped .form-error');
    this._button = element.find('input[name="change_password"]');
    this._passwordHeading = element.find('#password-heading');
    setupButtonEventHandlers(this._button, this.getSubmitHandler());
};
