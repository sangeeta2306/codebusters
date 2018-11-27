/*
	jQuery TextAreaResizer plugin
	Created on 17th January 2008 by Ryan O'Dell
	Version 1.0.4
*/(function($){var textarea,staticOffset;var iLastMousePos=0;var iMin=32;var grip;$.fn.TextAreaResizer=function(){return this.each(function(){textarea=$(this).addClass('processed'),staticOffset=null;$(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').bind("mousedown",{el:this},startDrag));var grippie=$('div.grippie',$(this).parent())[0];grippie.style.marginRight=(grippie.offsetWidth-$(this)[0].offsetWidth)+'px'})};function startDrag(e){textarea=$(e.data.el);textarea.blur();iLastMousePos=mousePosition(e).y;staticOffset=textarea.height()-iLastMousePos;textarea.css('opacity',0.25);$(document).mousemove(performDrag).mouseup(endDrag);return false}function performDrag(e){var iThisMousePos=mousePosition(e).y;var iMousePos=staticOffset+iThisMousePos;if(iLastMousePos>=(iThisMousePos)){iMousePos-=5}iLastMousePos=iThisMousePos;iMousePos=Math.max(iMin,iMousePos);textarea.height(iMousePos+'px');if(iMousePos<iMin){endDrag(e)}return false}function endDrag(e){$(document).unbind('mousemove',performDrag).unbind('mouseup',endDrag);textarea.css('opacity',1);textarea.focus();textarea=null;staticOffset=null;iLastMousePos=0}function mousePosition(e){return{x:e.clientX+document.documentElement.scrollLeft,y:e.clientY+document.documentElement.scrollTop}}})(jQuery);
/*
 *	TypeWatch 2.0 - Original by Denny Ferrassoli / Refactored by Charles Christolini
 *  Copyright(c) 2007 Denny Ferrassoli - DennyDotNet.com
 *  Coprright(c) 2008 Charles Christolini - BinaryPie.com
 *  Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
*/(function(jQuery){jQuery.fn.typeWatch=function(o){var options=jQuery.extend({wait:750,callback:function(){},highlight:true,captureLength:2},o);function checkElement(timer,override){var elTxt=jQuery(timer.el).val();if((elTxt.length>options.captureLength&&elTxt.toUpperCase()!=timer.text)||(override&&elTxt.length>options.captureLength)){timer.text=elTxt.toUpperCase();timer.cb(elTxt)}};function watchElement(elem){if(elem.type.toUpperCase()=="TEXT"||elem.nodeName.toUpperCase()=="TEXTAREA"){var timer={timer:null,text:jQuery(elem).val().toUpperCase(),cb:options.callback,el:elem,wait:options.wait};if(options.highlight){jQuery(elem).focus(function(){this.select()})}var startWatch=function(evt){var timerWait=timer.wait;var overrideBool=false;if(evt.keyCode==13&&this.type.toUpperCase()=="TEXT"){timerWait=1;overrideBool=true}var timerCallbackFx=function(){checkElement(timer,overrideBool)};clearTimeout(timer.timer);timer.timer=setTimeout(timerCallbackFx,timerWait)};jQuery(elem).keydown(startWatch)}};return this.each(function(index){watchElement(this)})}})(jQuery);
/*
Ajax upload
*/jQuery.extend({createUploadIframe:function(d,b){var a="jUploadFrame"+d;if(window.ActiveXObject){var c=document.createElement('<iframe id="'+a+'" name="'+a+'" />');if(typeof b=="boolean"){c.src="javascript:false"}else{if(typeof b=="string"){c.src=b}}}else{var c=document.createElement("iframe");c.id=a;c.name=a}c.style.position="absolute";c.style.top="-1000px";c.style.left="-1000px";document.body.appendChild(c);return c},createUploadForm:function(g,b){var e="jUploadForm"+g;var a="jUploadFile"+g;var d=$('<form  action="" method="POST" name="'+e+'" id="'+e+'" enctype="multipart/form-data"></form>');var c=$("#"+b);var f=$(c).clone();$(c).attr("id",a);$(c).before(f);$(c).appendTo(d);$(d).css("position","absolute");$(d).css("top","-1200px");$(d).css("left","-1200px");$(d).appendTo("body");return d},ajaxFileUpload:function(k){k=jQuery.extend({},jQuery.ajaxSettings,k);var a=new Date().getTime();var b=jQuery.createUploadForm(a,k.fileElementId);var i=jQuery.createUploadIframe(a,k.secureuri);var h="jUploadFrame"+a;var j="jUploadForm"+a;if(k.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")}var c=false;var f={};if(k.global){jQuery.event.trigger("ajaxSend",[f,k])}var d=function(l){var p=document.getElementById(h);try{if(p.contentWindow){f.responseText=p.contentWindow.document.body?p.contentWindow.document.body.innerText:null;f.responseXML=p.contentWindow.document.XMLDocument?p.contentWindow.document.XMLDocument:p.contentWindow.document}else{if(p.contentDocument){f.responseText=p.contentDocument.document.body?p.contentDocument.document.body.textContent||document.body.innerText:null;f.responseXML=p.contentDocument.document.XMLDocument?p.contentDocument.document.XMLDocument:p.contentDocument.document}}}catch(o){jQuery.handleError(k,f,null,o)}if(f||l=="timeout"){c=true;var m;try{m=l!="timeout"?"success":"error";if(m!="error"){var n=jQuery.uploadHttpData(f,k.dataType);if(k.success){k.success(n,m)}if(k.global){jQuery.event.trigger("ajaxSuccess",[f,k])}}else{jQuery.handleError(k,f,m)}}catch(o){m="error";jQuery.handleError(k,f,m,o)}if(k.global){jQuery.event.trigger("ajaxComplete",[f,k])}if(k.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}if(k.complete){k.complete(f,m)}jQuery(p).unbind();setTimeout(function(){try{$(p).remove();$(b).remove()}catch(q){jQuery.handleError(k,f,null,q)}},100);f=null}};if(k.timeout>0){setTimeout(function(){if(!c){d("timeout")}},k.timeout)}try{var b=$("#"+j);$(b).attr("action",k.url);$(b).attr("method","POST");$(b).attr("target",h);if(b.encoding){b.encoding="multipart/form-data"}else{b.enctype="multipart/form-data"}$(b).submit()}catch(g){jQuery.handleError(k,f,null,g)}if(window.attachEvent){document.getElementById(h).attachEvent("onload",d)}else{document.getElementById(h).addEventListener("load",d,false)}return{abort:function(){}}},uploadHttpData:function(r,type){var data=!type;data=type=="xml"||data?r.responseXML:r.responseText;if(type=="script"){jQuery.globalEval(data)}if(type=="json"){eval("data = "+data)}if(type=="html"){jQuery("<div>").html(data).evalScripts()}return data}});
/**
 * Upload call. Used only once in the wmd file upload
 * this is used in the wmd file uploader and the
 * askbots image and attachment upload plugins
 * @todo refactor this code to "new style"
 */
function ajaxFileUpload(options) {

    var spinner = options['spinner'];
    var uploadInputId = options['uploadInputId'];
    var urlInput = $(options['urlInput']);
    var startUploadHandler = options['startUploadHandler'];

    spinner.ajaxStart(function(){
        $(this).show();
    }).ajaxComplete(function(){
        $(this).hide();
    });

    /* important!!! upload input must be loaded by id
     * because ajaxFileUpload monkey-patches the upload form */
    $('#' + uploadInputId).ajaxStart(function(){
        $(this).hide();
    }).ajaxComplete(function(){
        $(this).show();
    });

    //var localFilePath = upload_input.val();
    $.ajaxFileUpload({
        url: askbot['urls']['upload'],
        secureuri: false,
        fileElementId: uploadInputId,
        dataType: 'xml',
        success: function (data, status) {

            var fileURL = $(data).find('file_url').text();
            /*
            * hopefully a fix for the "fakepath" issue
            * https://www.mediawiki.org/wiki/Special:Code/MediaWiki/83225
            */
            fileURL = fileURL.replace(/\w:.*\\(.*)$/,'$1');
            var error = $(data).find('error').text();
            if(error != ''){
                alert(error);
            } else {
                urlInput.attr('value', fileURL);
            }

            /* re-install this as the upload extension
             * will remove the handler to prevent double uploading
             * this hack is a manipulation around the
             * ajaxFileUpload jQuery plugin. */
            $('#' + uploadInputId).unbind('change').change(startUploadHandler);
        },
        error: function (data, status, e) {
            if (startUploadHandler){
                /* re-install this as the upload extension
                * will remove the handler to prevent double uploading */
                $('#' + uploadInputId).unbind('change').change(startUploadHandler);
            }
        }
    });
    return false;
};

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

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settings.onsubmit ) {
		
			// allow suppresing validation by adding a cancel class to the submit button
			this.find("input, button").filter(".cancel").click(function() {
				validator.cancelSubmit = true;
			});
			
			// when a submitHandler is used, capture the submitting button
			if (validator.settings.submitHandler) {
				this.find("input, button").filter(":submit").click(function() {
					validator.submitButton = this;
				});
			}
		
			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug )
					// prevent form submit to be able to see console output
					event.preventDefault();
					
				function handle() {
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}
					
				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}
		
		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
        if ( $(this[0]).is('form')) {
            return this.validate().form();
        } else {
            var valid = true;
            var validator = $(this[0].form).validate();
            this.each(function() {
				valid &= validator.element(this);
            });
            return valid;
        }
    },
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];
		
		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages)
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}
		
		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.metadataRules(element),
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.staticRules(element)
		), element);
		
		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}
		
		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length == 1 ) 
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	if ( arguments.length > 2 && params.constructor != Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor != Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {
	
	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: [],
		ignoreTitle: false,
		onfocusin: function(element) {
			this.lastActive = element;
				
			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				this.errorsFor(element).hide();
			}
		},
		onfocusout: function(element) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element) {
			if ( element.name in this.submitted || element == this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted )
				this.element(element);
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted)
				this.element(element.parentNode);
		},
		highlight: function( element, errorClass, validClass ) {
			$(element).addClass(errorClass).removeClass(validClass);
		},
		unhighlight: function( element, errorClass, validClass ) {
			$(element).removeClass(errorClass).addClass(validClass);
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		accept: "Please enter a value with a valid extension.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},
	
	autoCreateRanges: false,
	
	prototype: {
		
		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();
			
			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				$.each(value.split(/\s/), function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});
			
			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				validator.settings[eventType] && validator.settings[eventType].call(validator, this[0] );
			}
			$(this.currentForm)
				.validateDelegate(":text, :password, :file, select, textarea", "focusin focusout keyup", delegate)
				.validateDelegate(":radio, :checkbox, select, option", "click", delegate);

			if (this.settings.invalidHandler)
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid())
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			this.showErrors();
			return this.valid();
		},
		
		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid(); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.clean( element );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element );
			if ( result ) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			this.settings.showErrors
				? this.settings.showErrors.call( this, this.errorMap, this.errorList )
				: this.defaultShowErrors();
		},
		
		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm )
				$( this.currentForm ).resetForm();
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass );
		},
		
		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},
		
		valid: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var validator = this,
				rulesCache = {};
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name )[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for( method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}			
			this.errorList.push({
				message: message,
				element: element
			});
			
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},
		
		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},
		
		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},
	
	addClassRules: function(className, rules) {
		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);
		
		for (method in $.validator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( previous.old !== value ) {
				previous.old = value;
				var validator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					success: function(response) {
						validator.settings.messages[element.name].remote = previous.originalMessage;
						var valid = response === true;
						if ( valid ) {
							var submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							validator.showErrors();
						} else {
							var errors = {};
							var message = (previous.message = response || validator.defaultMessage( element, "remote" ));
							errors[element.name] = $.isFunction(message) ? message(value) : message;
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					}
				}, param));
				return "pending";
			} else if( this.pending[element.name] ) {
				return "pending";
			}
			return previous.valid;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits and dashes
			if (/[^0-9-]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}
		
	}
	
});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var ajax = $.ajax;
	var pendingRequests = {};
	$.ajax = function(settings) {
		// create settings for compatibility with ajaxSetup
		settings = $.extend(settings, $.extend({}, $.ajaxSettings, settings));
		var port = settings.port;
		if (settings.mode == "abort") {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			return (pendingRequests[port] = ajax.apply(this, arguments));
		}
		return ajax.apply(this, arguments);
	};
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'	
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);

/* google prettify.js from google code */
var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function () {function L(a) {function m(a) {var f=a.charCodeAt(0);if(f!==92)return f;var b=a.charAt(1);return(f=r[b])?f:'0'<=b&&b<="7"?parseInt(a.substring(1),8):b==="u"||b==="x"?parseInt(a.substring(2),16):a.charCodeAt(1)}function e(a) {if(a<32)return(a<16?"\\x0":"\\x")+a.toString(16);a=String.fromCharCode(a);if(a==="\\"||a==="-"||a==="["||a==="]")a="\\"+a;return a}function h(a) {for(var f=a.substring(1,a.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),a=
[],b=[],o=f[0]==="^",c=o?1:0,i=f.length;c<i;++c) {var j=f[c];if(/\\[bdsw]/i.test(j))a.push(j);else{var j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.push([j,d]);d<65||j>122||(d<65||j>90||b.push([Math.max(65,j)|32,Math.min(d,90)|32]),d<97||j>122||b.push([Math.max(97,j)&-33,Math.min(d,122)&-33]))}}b.sort(function (a,f) {return a[0]-f[0]||f[1]-a[1]});f=[];j=[NaN,NaN];for(c=0;c<b.length;++c)i=b[c],i[0]<=j[1]+1?j[1]=Math.max(j[1],i[1]):f.push(j=i);b=["["];o&&b.push("^");b.push.apply(b,a);for(c=0;c<
f.length;++c)i=f[c],b.push(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.push("-"),b.push(e(i[1])));b.push("]");return b.join("")}function y(a) {for(var f=a.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),b=f.length,d=[],c=0,i=0;c<b;++c) {var j=f[c];j==='('?++i:"\\"===j.charAt(0)&&(j=+j.substring(1))&&j<=i&&(d[j]=-1)}for(c=1;c<d.length;++c)-1===d[c]&&(d[c]=++t);for(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===void 0&&(f[c]="(?:")):"\\"===j.charAt(0)&&
(j=+j.substring(1))&&j<=i&&(f[c]="\\"+d[i]);for(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");if(a.ignoreCase&&s)for(c=0;c<b;++c)j=f[c],a=j.charAt(0),j.length>=2&&a==="["?f[c]=h(j):a!=="\\"&&(f[c]=j.replace(/[A-Za-z]/g,function (a) {a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return f.join("")}for(var t=0,s=!1,l=!1,p=0,d=a.length;p<d;++p) {var g=a[p];if(g.ignoreCase)l=!0;else if(/[a-z]/i.test(g.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))) {s=!0;l=!1;break}}for(var r=
{b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.length;p<d;++p) {g=a[p];if(g.global||g.multiline)throw Error(""+g);n.push("(?:"+y(g)+')')}return RegExp(n.join("|"),l?"gi":"g")}function M(a) {function m(a) {switch(a.nodeType) {case 1:if(e.test(a.className))break;for(var g=a.firstChild;g;g=g.nextSibling)m(g);g=a.nodeName;if("BR"===g||"LI"===g)h[s]="\n",t[s<<1]=y++,t[s++<<1|1]=a;break;case 3:case 4:g=a.nodeValue,g.length&&(g=p?g.replace(/\r\n?/g,"\n"):g.replace(/[\t\n\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.length,
t[s++<<1|1]=a)}}var e=/(?:^|\s)nocode(?:\s|$)/,h=[],y=0,t=[],s=0,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);m(a);return{a:h.join("").replace(/\n$/,""),c:t}}function B(a,m,e,h) {m&&(a={a:m,d:a},e(a),h.push.apply(h,a.e))}function x(a,m) {function e(a) {for(var l=a.d,p=[l,"pln"],d=0,g=a.a.match(y)||[],r={},n=0,z=g.length;n<z;++n) {var f=g[n],b=r[f],o=void 0,c;if(typeof b===
"string")c=!1;else{var i=h[f.charAt(0)];if(i)o=f.match(i[1]),b=i[0];else{for(c=0;c<t;++c)if(i=m[c],o=f.match(i[1])) {b=i[0];break}o||(b="pln")}if((c=b.length>=5&&"lang-"===b.substring(0,5))&&!(o&&typeof o[1]==="string"))c=!1,b="src";c||(r[f]=b)}i=d;d+=f.length;if(c) {c=o[1];var j=f.indexOf(c),k=j+c.length;o[2]&&(k=f.length-o[2].length,j=k-c.length);b=b.substring(5);B(l+i,f.substring(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.substring(k),e,p)}else p.push(l+i,b)}a.e=p}var h={},y;(function () {for(var e=a.concat(m),
l=[],p={},d=0,g=e.length;d<g;++d) {var r=e[d],n=r[3];if(n)for(var k=n.length;--k>=0;)h[n.charAt(k)]=r;r=r[1];n=""+r;p.hasOwnProperty(n)||(l.push(r),p[n]=q)}l.push(/[\S\s]/);y=L(l)})();var t=m.length;return e}function u(a) {var m=[],e=[];a.tripleQuotedStrings?m.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?m.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):m.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&e.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var h=a.hashComments;h&&(a.cStyleComments?(h>1?m.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.push(["com",/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),e.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,q])):m.push(["com",/^#[^\n\r]*/,
q,"#"]));a.cStyleComments&&(e.push(["com",/^\/\/[^\n\r]*/,q]),e.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));a.regexLiterals&&e.push(["lang-regex",/^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);(h=a.types)&&e.push(["typ",h]);a=(""+a.keywords).replace(/^ | $/g,
"");a.length&&e.push(["kwd",RegExp("^(?:"+a.replace(/[\s,]+/g,"|")+")\\b"),q]);m.push(["pln",/^\s+/,q," \r\n\t\xa0"]);e.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,q],["pun",/^.[^\s\w"-$'./@\\`]*/,q]);return x(m,e)}function D(a,m) {function e(a) {switch(a.nodeType) {case 1:if(k.test(a.className))break;if("BR"===a.nodeName)h(a),
a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)e(a);break;case 3:case 4:if(p) {var b=a.nodeValue,d=b.match(t);if(d) {var c=b.substring(0,d.index);a.nodeValue=c;(b=b.substring(d.index+d[0].length))&&a.parentNode.insertBefore(s.createTextNode(b),a.nextSibling);h(a);c||a.parentNode.removeChild(a)}}}}function h(a) {function b(a,d) {var e=d?a.cloneNode(!1):a,f=a.parentNode;if(f) {var f=b(f,1),g=a.nextSibling;f.appendChild(e);for(var h=g;h;h=g)g=h.nextSibling,f.appendChild(h)}return e}
for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),e;(e=a.parentNode)&&e.nodeType===1;)a=e;d.push(a)}var k=/(?:^|\s)nocode(?:\s|$)/,t=/\r\n?|\n/,s=a.ownerDocument,l;a.currentStyle?l=a.currentStyle.whiteSpace:window.getComputedStyle&&(l=s.defaultView.getComputedStyle(a,q).getPropertyValue("white-space"));var p=l&&"pre"===l.substring(0,3);for(l=s.createElement("LI");a.firstChild;)l.appendChild(a.firstChild);for(var d=[l],g=0;g<d.length;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",
m);var r=s.createElement("OL");r.className="linenums";for(var n=Math.max(0,m-1|0)||0,g=0,z=d.length;g<z;++g)l=d[g],l.className="L"+(g+n)%10,l.firstChild||l.appendChild(s.createTextNode("\xa0")),r.appendChild(l);a.appendChild(r)}function k(a,m) {for(var e=m.length;--e>=0;) {var h=m[e];A.hasOwnProperty(h)?window.console&&console.warn("cannot override language handler %s",h):A[h]=a}}function C(a,m) {if(!a||!A.hasOwnProperty(a))a=/^\s*</.test(m)?"default-markup":"default-code";return A[a]}function E(a) {var m=
a.g;try{var e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);var k=/\bMSIE\b/.test(navigator.userAgent),m=/\n/g,t=a.a,s=t.length,e=0,l=a.c,p=l.length,h=0,d=a.e,g=d.length,a=0;d[g]=s;var r,n;for(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;for(n=r=0;n<g;) {for(var z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}for(d.length=r;h<p;) {var o=l[h+2]||s,c=d[a+2]||s,b=Math.min(o,c),i=l[h+1],j;if(i.nodeType!==1&&(j=t.substring(e,b))) {k&&(j=j.replace(m,"\r"));i.nodeValue=
j;var u=i.ownerDocument,v=u.createElement("SPAN");v.className=d[a+1];var x=i.parentNode;x.replaceChild(v,i);v.appendChild(i);e<o&&(l[h+1]=i=u.createTextNode(t.substring(b,o)),x.insertBefore(i,v.nextSibling))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}catch(w) {"console"in window&&console.log(w&&w.stack?w.stack:w)}}var v=["break,continue,do,else,for,if,return,while"],w=[[v,"auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],w=[w,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],I=[v,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
J=[v,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],v=[v,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,N=/\S/,O=u({keywords:[F,H,w,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END"+
I,J,v],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),A={};k(O,["default-code"]);k(x([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),
["default-markup","htm","html","mxml","xhtml","xml","xsl"]);k(x([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",
/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);k(x([],[["atv",/^[\S\s]+/]]),["uq.val"]);k(u({keywords:F,hashComments:!0,cStyleComments:!0,types:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({keywords:"null,true,false"}),["json"]);k(u({keywords:H,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:K}),["cs"]);k(u({keywords:G,cStyleComments:!0}),["java"]);k(u({keywords:v,hashComments:!0,multiLineStrings:!0}),["bsh","csh","sh"]);k(u({keywords:I,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),
["cv","py"]);k(u({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["perl","pl","pm"]);k(u({keywords:J,hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb"]);k(u({keywords:w,cStyleComments:!0,regexLiterals:!0}),["js"]);k(u({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);k(x([],[["str",/^[\S\s]+/]]),["regex"]);window.prettyPrintOne=function (a,m,e) {var h=document.createElement("PRE");h.innerHTML=a;e&&D(h,e);E({g:m,i:e,h:h});return h.innerHTML};window.prettyPrint=function (a) {function m() {for(var e=window.PR_SHOULD_USE_CONTINUATION?l.now()+250:Infinity;p<h.length&&l.now()<e;p++) {var n=h[p],k=n.className;if(k.indexOf("prettyprint")>=0) {var k=k.match(g),f,b;if(b=
!k) {b=n;for(var o=void 0,c=b.firstChild;c;c=c.nextSibling)var i=c.nodeType,o=i===1?o?b:c:i===3?N.test(c.nodeValue)?b:o:o;b=(f=o===b?void 0:o)&&"CODE"===f.tagName}b&&(k=f.className.match(g));k&&(k=k[1]);b=!1;for(o=n.parentNode;o;o=o.parentNode)if((o.tagName==="pre"||o.tagName==="code"||o.tagName==="xmp")&&o.className&&o.className.indexOf("prettyprint")>=0) {b=!0;break}b||((b=(b=n.className.match(/\blinenums\b(?::(\d+))?/))?b[1]&&b[1].length?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.length?setTimeout(m,
250):a&&a()}for(var e=[document.getElementsByTagName("pre"),document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],h=[],k=0;k<e.length;++k)for(var t=0,s=e[k].length;t<s;++t)h.push(e[k][t]);var e=q,l=Date;l.now||(l={now:function () {return+new Date}});var p=0,d,g=/\blang(?:uage)?-([\w.]+)(?!\S)/;m()};window.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",
PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ"}})();

var Toggle = function() {
    this._state = 'off-state';
    this._messages = {};
    this._states = [
        'on-state',
        'off-state',
        'on-prompt',
        'off-prompt'
    ];
};
inherits(Toggle, SimpleControl);

Toggle.prototype.resetStyles = function () {
    var element = this._element;
    var states = this._states;
    $.each(states, function (idx, state) {
        element.removeClass(state);
    });
    this.setText('');
};

Toggle.prototype.isOn = function () {
    return this._element.data('isOn');
};

Toggle.prototype.isCheckBox = function () {
    var element = this._element;
    return element.attr('type') === 'checkbox';
};

Toggle.prototype.setState = function (state) {
    var element = this._element;
    var oldState = this._state;
    this._state = state;
    if (element) {
        this.resetStyles();
        element.addClass(state);
        if (state === 'on-state') {
            element.data('isOn', true);
        } else if (state === 'off-state') {
            element.data('isOn', false);
        }
        if (this.isCheckBox()) {
            if (state === 'on-state') {
                element.attr('checked', true);
            } else if (state === 'off-state') {
                element.attr('checked', false);
            }
        } else {
            this.setText(this._messages[state]);
        }
        this._element.trigger(
            'askbot.Toggle.stateChange',
            {'oldState': oldState, 'newState': state}
        );
    }
};

Toggle.prototype.toggleState = function () {
    if (this.isOn()) {
        this.setState('off-state');
    } else {
        this.setState('on-state');
    }
};

Toggle.prototype.setText = function (text) {
    var btnText = this._element.find('.js-btn-text');
    var where  = btnText.length ? btnText : this._element;
    where.html(text);
};

Toggle.prototype.setMessages = function(messages) {
    $.extend(this._messages, messages);
};

Toggle.prototype.setMessage = function(state, text) {
    this._messages[state] = text;
};

Toggle.prototype.createDom = function () {
    //limitation is that we make a div with createDom
    var element = this.makeElement('div');
    this._element = element;

    var messages = this._messages || {};

    messages['on-state'] = messages['on-state'] || gettext('enabled');
    messages['off-state'] = messages['off-state'] || gettext('disabled');

    element.data('onStateText', messages['on-state']);
    element.data('offStateText', messages['off-state']);
    element.data('onPromptText', messages['on-prompt'] || messages['off-state']);
    element.data('offPromptText', messages['off-prompt'] || messages['on-state']);

    this.decorate(element);
};

Toggle.prototype.decorate = function (element) {
    this._element = element;
    //read messages for all states
    var messages = {};
    messages['on-state'] = element.data('onStateText') || gettext('enabled');
    messages['off-state'] = element.data('offStateText') || gettext('disabled');
    messages['on-prompt'] = element.data('onPromptText') || messages['off-state'];
    messages['off-prompt'] = element.data('offPromptText') || messages['on-state'];
    this._messages = messages;


    //detect state and save it
    if (this.isCheckBox()) {
        this._state = this._state || (element.is(':checked') ? 'on-state' : 'off-state');
    } else {
        this._state = element.data('isOn') ? 'on-state' : this._state;
    }
    this.setState(this._state);

    //set mouseover handler only for non-checkbox version
    if (this.isCheckBox() === false) {
        var me = this;
        element.mouseover(function () {
            var is_on = me.isOn();
            if (is_on) {
                me.setState('off-prompt');
            } else {
                me.setState('on-prompt');
            }
            return false;
        });
        element.mouseout(function () {
            var is_on = me.isOn();
            if (is_on) {
                me.setState('on-state');
            } else {
                me.setState('off-state');
            }
            return false;
        });
    }

    setupButtonEventHandlers(element, this.getHandler());
};

var ExpanderToggle = function (expandable) {
    Toggle.call(this);
    this.setExpandable(expandable);
    this._handler = this.getExpanderHandler();
};
inherits(ExpanderToggle, Toggle);

ExpanderToggle.prototype.setCollapsed = function (collapsed) {
    if (collapsed) {
        this.setState('off-state');
    } else {
        this.setState('on-state');
    }
};

ExpanderToggle.prototype.setExpandable = function(expandable) {
    this._expandable = expandable;
};

ExpanderToggle.prototype.getExpandable = function() {
    return this._expandable;
};

ExpanderToggle.prototype.getExpanderHandler = function () {
    var me = this;
    return function () {
        me.toggleState();
        var expandable = me.getExpandable();
        if (expandable) {
            if (me.isOn()) {
                expandable.show();
            } else {
                expandable.hide();
            }
        }
    };
};

/*
Scripts for cnprog.com
Project Name: Lanai
All Rights Resevred 2008. CNPROG.COM
*/
var lanai = {
    /**
     * Finds any <pre><code></code></pre> tags which aren't registered for
     * pretty printing, adds the appropriate class name and invokes prettify.
     */
    highlightSyntax: function () {
        var styled = false;
        $('pre code').parent().each(function () {
            if (!$(this).hasClass('prettyprint')) {
                $(this).addClass('prettyprint');
                styled = true;
            }
        });

        if (styled) {
            prettyPrint();
        }
    }
};

//todo: clean-up now there is utils:WaitIcon
function appendLoader(element) {
    loading = gettext('loading...');
    element.append('<img class="ajax-loader" ' +
        'src="' + mediaUrl('media/images/indicator.gif') + '" title="' +
        loading +
        '" alt="' +
        loading +
    '" />');
}

function removeLoader() {
    $('img.ajax-loader').remove();
}

function setSubmitButtonDisabled(form, isDisabled) {
    form.find('input[type="submit"]').attr('disabled', isDisabled);
}

function enableSubmitButton(form) {
    setSubmitButtonDisabled(form, false);
}

function disableSubmitButton(form) {
    setSubmitButtonDisabled(form, true);
}

function setupFormValidation(form, validationRules, validationMessages, onSubmitCallback) {
    enableSubmitButton(form);
    var placementLocation = askbot.settings.errorPlacement;
    var placementClass = placementLocation ? ' ' + placementLocation : '';
    form.validate({
        debug: true,
        rules: (validationRules ? validationRules : {}),
        messages: (validationMessages ? validationMessages : {}),
        errorElement: 'span',
        errorClass: 'form-error' + placementClass,
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            var formGroup = $(element).closest('.form-group');
            formGroup.removeClass('has-error');
            formGroup.find('.form-error').remove();
        },
        errorPlacement: function (error, element) {
            //bs3 error placement
            var label = element.closest('.form-group').find('label');
            if (placementLocation === 'in-label') {
                label.html(error);
                return;
            } else if (placementLocation === 'after-label') {
                var errorLabel = element.closest('.form-group').find('.form-error');
                if (errorLabel.length) {
                    errorLabel.replaceWith(error);
                } else {
                    label.after(error);
                }
                return;
            }

            //old askbot error placement
            var span = element.next().find('.form-error');
            if (span.length === 0) {
                span = element.parent().find('.form-error');
                if (span.length === 0) {
                    //for resizable textarea
                    var element_id = element.attr('id');
                    $('label[for="' + element_id + '"]').after(error);
                }
            } else {
                span.replaceWith(error);
            }
        },
        submitHandler: function (form_dom) {
            disableSubmitButton($(form_dom));

            if (onSubmitCallback) {
                onSubmitCallback(form_dom);
            } else {
                form_dom.submit();
            }
        }
    });
}

var validateTagLength = function (value) {
    var tags = getUniqueWords(value);
    var are_tags_ok = true;
    $.each(tags, function (index, value) {
        if (value.length > askbot.settings.maxTagLength) {
            are_tags_ok = false;
        }
    });
    return are_tags_ok;
};
var validateTagCount = function (value) {
    var tags = getUniqueWords(value);
    return (tags.length <= askbot.settings.maxTagsPerPost);
};

$.validator.addMethod('limit_tag_count', validateTagCount);
$.validator.addMethod('limit_tag_length', validateTagLength);

askbot.validators = askbot.validators || {};

askbot.validators.titleValidator = function (text) {
    text = $.trim(text);
    if (text.length < askbot.settings.minTitleLength) {
        throw interpolate(
                        ngettext(
                            'enter > %(length)s character',
                            'enter > %(length)s characters',
                            askbot.settings.minTitleLength
                        ),
                        {'length': askbot.settings.minTitleLength},
                        true
                    );
    }
};

askbot.validators.questionDetailsValidator = function (text) {
    text = $.trim(text);
    var minLength = askbot.settings.minQuestionBodyLength;
    if (minLength && (text.length < minLength)) {
        /* todo - for tinymce text extract text from html 
            otherwise html tags will be counted and user misled */
        throw interpolate(
                    ngettext(
                        'details must have > %s character',
                        'details must have > %s characters',
                        minLength
                    ),
                    [minLength]
                );
    }
};

askbot.validators.answerValidator = function (text) {
    var minLength = askbot.settings.minAnswerBodyLength;
    var textLength
    text = $.trim(text);
    if (askbot.settings.editorType == 'tinymce') {
        textLength = $('<p>' + text + '</p>').text().length;
    } else {
        textLength = text.length;
    }
    if (minLength && (textLength < minLength)) {
        throw interpolate(
                ngettext(
                    'enter > %(length)s character',
                    'enter > %(length)s characters',
                    minLength
                ),
                {'length': minLength},
                true
            );
    }
};

var CPValidator = (function () {
    return {
        getQuestionFormRules: function () {
            return {
                tags: {
                    required: askbot.settings.tagsAreRequired,
                    maxlength: 105,
                    limit_tag_count: true,
                    limit_tag_length: true
                },
                text: {
                    required: !!askbot.settings.minQuestionBodyLength,
                    minlength: askbot.settings.minQuestionBodyLength
                },
                title: {
                    required: true,
                    minlength: askbot.settings.minTitleLength
                }
            };
        },
        getQuestionFormMessages: function () {
            return {
                tags: {
                    required: ' ' + gettext('tags cannot be empty'),
                    maxlength: askbot.messages.tagLimits,
                    limit_tag_count: askbot.messages.maxTagsPerPost,
                    limit_tag_length: askbot.messages.maxTagLength
                },
                text: {
                    required: ' ' + gettext('details are required'),
                    minlength: interpolate(
                                    ngettext(
                                        'details must have > %s character',
                                        'details must have > %s characters',
                                        askbot.settings.minQuestionBodyLength
                                    ),
                                    [askbot.settings.minQuestionBodyLength]
                                )
                },
                title: {
                    required: ' ' + gettext('enter your question'),
                    minlength: interpolate(
                                    ngettext(
                                        'enter > %(length)s character',
                                        'enter > %(length)s characters',
                                        askbot.settings.minTitleLength
                                    ),
                                    {'length': askbot.settings.minTitleLength},
                                    true
                                )
                }
            };
        },
        getAnswerFormRules: function () {
            return {
                text: {
                    required: true,
                    minlength: askbot.settings.minAnswerBodyLength
                }
            };
        },
        getAnswerFormMessages: function () {
            return {
                text: {
                    required: ' ' + gettext('content cannot be empty'),
                    minlength: interpolate(
                                    ngettext(
                                        'enter > %(length)s character',
                                        'enter > %(length)s characters',
                                        askbot.settings.minAnswerBodyLength
                                    ),
                                    {'length': askbot.settings.minAnswerBodyLength},
                                    true
                                )
                }
            };
        }
    };
})();

/**
 * @constructor
 */
var ThreadUsersDialog = function () {
    SimpleControl.call(this);
    this._heading_text = 'Add heading with the setHeadingText()';
};
inherits(ThreadUsersDialog, SimpleControl);

ThreadUsersDialog.prototype.setHeadingText = function (text) {
    this._heading_text = text;
};

ThreadUsersDialog.prototype.showUsers = function (html) {
    this._dialog.setContent(html);
    this._dialog.show();
};

ThreadUsersDialog.prototype.startShowingUsers = function () {
    var me = this;
    var threadId = this._threadId;
    var url = this._url;
    $.ajax({
        type: 'GET',
        data: {'thread_id': threadId},
        dataType: 'json',
        url: url,
        cache: false,
        success: function (data) {
            if (data.success) {
                me.showUsers(data.html);
            } else {
                showMessage(me.getElement(), data.message, 'after');
            }
        }
    });
};

ThreadUsersDialog.prototype.decorate = function (element) {
    this._element = element;
    ThreadUsersDialog.superClass_.decorate.call(this, element);
    this._threadId = element.data('threadId');
    this._url = element.data('url');
    var dialog = new ModalDialog();
    dialog.setRejectButtonText('');
    dialog.setAcceptButtonText(gettext('Back to the question'));
    dialog.setHeadingText(this._heading_text);
    dialog.setAcceptHandler(function () { dialog.hide(); });
    var dialog_element = dialog.getElement();
    $(dialog_element).find('.modal-footer').css('text-align', 'center');
    $('body').append(dialog_element);
    this._dialog = dialog;
    var me = this;
    this.setHandler(function () {
        me.startShowingUsers();
    });
};

var MergeQuestionsDialog = function () {
    ModalDialog.call(this);
    this._tags = [];
    this._prevQuestionId = undefined;
};
inherits(MergeQuestionsDialog, ModalDialog);

MergeQuestionsDialog.prototype.show = function () {
    MergeQuestionsDialog.superClass_.show.call(this);
    this._idInput.focus();
};

MergeQuestionsDialog.prototype.getStartMergingHandler = function () {
    var me = this;
    return function () {
        $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: askbot.urls.mergeQuestions,
            data: JSON.stringify({
                from_id: me.getFromId(),
                to_id: me.getToId()
            }),
            success: function (data) {
                window.location.reload();
            }
        });
    };
};

MergeQuestionsDialog.prototype.setPreview = function (data) {
    this._previewTitle.html(data.title);
    this._previewBody.html(data.summary);
    for (var i = 0; i < this._tags.length; i++) {
        this._tags[i].dispose();
    }
    for (i = 0; i < data.tags.length; i++) {
        var tag = new Tag();
        tag.setLinkable(false);
        tag.setName(data.tags[i]);
        this._previewTags.append(tag.getElement());
        this._tags.push(tag);
    }
    this._preview.fadeIn();
};

MergeQuestionsDialog.prototype.clearIdInput = function () {
    this._idInput.val('');
};

MergeQuestionsDialog.prototype.clearPreview = function () {
    for (var i = 0; i < this._tags.length; i++) {
        this._tags[i].dispose();
    }
    this._previewTitle.html('');
    this._previewBody.html('');
    this._previewTags.html('');
    this.setAcceptButtonText(gettext('Load preview'));
    this._preview.hide();
};

MergeQuestionsDialog.prototype.getFromId = function () {
    return this._fromId;
};

MergeQuestionsDialog.prototype.getToId = function () {
    return this._idInput.val();
};

MergeQuestionsDialog.prototype.getPrevToId = function () {
    return this._prevQuestionId;
};

MergeQuestionsDialog.prototype.setPrevToId = function (toId) {
    this._prevQuestionId = toId;
};

MergeQuestionsDialog.prototype.getLoadPreviewHandler = function () {
    var me = this;
    return function () {
        var prevId = me.getPrevToId();
        var curId = me.getToId();
        // here I am disabling eqeqeq because it looks like there's a type coercion going on, can't be sure
        // so skipping it
        /*jshint eqeqeq:false*/
        if (curId) {// && curId != prevId) {
        /*jshint eqeqeq:true*/
            $.ajax({
                type: 'GET',
                cache: false,
                dataType: 'json',
                url: askbot.urls.apiV1Questions + curId + '/',
                success: function (data) {
                    me.setPreview(data);
                    me.setPrevToId(curId);
                    me.setAcceptButtonText(gettext('Merge'));
                    me.setPreviewLoaded(true);
                    return false;
                },
                error: function () {
                    me.clearPreview();
                    me.setAcceptButtonText(gettext('Load preview'));
                    me.setPreviewLoaded(false);
                    return false;
                }
            });
        }
    };
};

MergeQuestionsDialog.prototype.setPreviewLoaded = function(isLoaded) {
    this._isPreviewLoaded = isLoaded;
};

MergeQuestionsDialog.prototype.isPreviewLoaded = function() {
    return this._isPreviewLoaded;
};

MergeQuestionsDialog.prototype.getAcceptHandler = function() {
    var me = this;
    return function() {
        var handler;
        if (me.isPreviewLoaded()) {
            handler = me.getStartMergingHandler();
        } else {
            handler = me.getLoadPreviewHandler();
        }
        handler();
        return false;
    };
};

MergeQuestionsDialog.prototype.getRejectHandler = function() {
    var me = this;
    return function() {
        me.clearPreview();
        me.clearIdInput();
        me.setPreviewLoaded(false);
        me.hide();
    };
};

MergeQuestionsDialog.prototype.createDom = function () {
    //make content
    var content = this.makeElement('div');
    var label = this.makeElement('label');
    label.attr('for', 'question_id');
    label.html(gettext(askbot.messages.enterDuplicateQuestionId));
    content.append(label);
    var input = this.makeElement('input');
    input.attr('type', 'text');
    input.attr('name', 'question_id');
    content.append(input);
    this._idInput = input;

    var preview = this.makeElement('div');
    content.append(preview);
    this._preview = preview;
    preview.hide();

    var title = this.makeElement('h3');
    preview.append(title);
    this._previewTitle = title;

    var tags = this.makeElement('div');
    tags.addClass('tags');
    this._preview.append(tags);
    this._previewTags = tags;

    var clr = this.makeElement('div');
    clr.addClass('clearfix');
    this._preview.append(clr);

    var body = this.makeElement('div');
    body.addClass('body');
    this._preview.append(body);
    this._previewBody = body;

    var previewHandler = this.getLoadPreviewHandler();
    var enterHandler = makeKeyHandler(13, previewHandler);
    input.keydown(enterHandler);
    input.blur(previewHandler);

    this.setContent(content);

    this.setClass('merge-questions');
    this.setRejectButtonText(gettext('Cancel'));
    this.setAcceptButtonText(gettext('Load preview'));
    this.setHeadingText(askbot.messages.mergeQuestions);
    this.setRejectHandler(this.getRejectHandler());
    this.setAcceptHandler(this.getAcceptHandler());

    MergeQuestionsDialog.superClass_.createDom.call(this);
    this._element.hide();

    this._fromId = $('.js-question').data('postId');
    //have to do this on document since _element is not in the DOM yet
    $(document).trigger('askbot.afterMergeQuestionsDialogCreateDom', [this]);
};

/**
 * @constructor
 */
var DraftPost = function () {
    WrappedElement.call(this);
};
inherits(DraftPost, WrappedElement);

/**
 * @return {string}
 */
DraftPost.prototype.getUrl = function () {
    throw 'Not Implemented';
};

/**
 * @return {boolean}
 */
DraftPost.prototype.shouldSave = function () {
    throw 'Not Implemented';
};

/**
 * @return {object} data dict
 */
DraftPost.prototype.getData = function () {
    throw 'Not Implemented';
};

DraftPost.prototype.backupData = function () {
    this._old_data = this.getData();
};

DraftPost.prototype.showNotification = function () {
    var note = $('.editor-status span');
    note.hide();
    note.html(gettext('draft saved...'));
    note.fadeIn().delay(3000).fadeOut();
};

DraftPost.prototype.getSaveHandler = function () {
    var me = this;
    return function (save_synchronously) {
        if (me.shouldSave()) {
            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                async: save_synchronously ? false : true,
                url: me.getUrl(),
                data: me.getData(),
                success: function (data) {
                    if (data.success && !save_synchronously) {
                        me.showNotification();
                    }
                    me.backupData();
                }
            });
        }
    };
};

DraftPost.prototype.decorate = function (element) {
    this._element = element;
    this.assignContentElements();
    this.backupData();
    setInterval(this.getSaveHandler(), 30000);//auto-save twice a minute
    var me = this;
    window.onbeforeunload = function () {
        var saveHandler = me.getSaveHandler();
        saveHandler(true);
        //var msg = gettext("%s, we've saved your draft, but...");
        //return interpolate(msg, [askbot.data.userName]);
    };
};


/**
 * @contstructor
 */
var DraftQuestion = function () {
    DraftPost.call(this);
};
inherits(DraftQuestion, DraftPost);

DraftQuestion.prototype.getUrl = function () {
    return askbot.urls.saveDraftQuestion;
};

DraftQuestion.prototype.shouldSave = function () {
    var newd = this.getData();
    var oldd = this._old_data;
    return (
        newd.title !== oldd.title ||
        newd.text !== oldd.text ||
        newd.tagnames !== oldd.tagnames
    );
};

DraftQuestion.prototype.getData = function () {
    return {
        'title': this._title_element.val(),
        'text': this._text_element.val(),
        'tagnames': this._tagnames_element.val()
    };
};

DraftQuestion.prototype.assignContentElements = function () {
    this._title_element = $('#id_title');
    this._text_element = $('#editor');
    this._tagnames_element = $('#id_tags');
};

var DraftAnswer = function () {
    DraftPost.call(this);
};
inherits(DraftAnswer, DraftPost);

DraftAnswer.prototype.setThreadId = function (id) {
    this._threadId = id;
};

DraftAnswer.prototype.getUrl = function () {
    return askbot.urls.saveDraftAnswer;
};

DraftAnswer.prototype.shouldSave = function () {
    return this.getData().text !== this._old_data.text;
};

DraftAnswer.prototype.getData = function () {
    return {
        'text': this._textElement.val(),
        'thread_id': this._threadId
    };
};

DraftAnswer.prototype.assignContentElements = function () {
    this._textElement = $('#editor');
};


/**
 * @constructor
 * @extends {SimpleControl}
 * @param {Comment} comment to upvote
 */
var CommentVoteButton = function (comment) {
    SimpleControl.call(this);
    /**
     * @param {Comment}
     */
    this._comment = comment;
    /**
     * @type {boolean}
     */
    this._voted = false;
    /**
     * @type {number}
     */
    this._score = 0;
};
inherits(CommentVoteButton, SimpleControl);
/**
 * @param {number} score
 */
CommentVoteButton.prototype.setScore = function (score) {
    this._score = score;
    if (this._element) {
        this._element.html(score || '');
    }
    this._element.trigger('askbot.afterSetScore', [this, score]);
};
/**
 * @param {boolean} voted
 */
CommentVoteButton.prototype.setVoted = function (voted) {
    this._voted = voted;
    if (this._element && voted) {
        this._element.addClass('upvoted');
    } else if (this._element) {
        this._element.removeClass('upvoted');
    }
};

CommentVoteButton.prototype.getVoteHandler = function () {
    var me = this;
    var comment = this._comment;
    return function () {
        var cancelVote =  me._voted ? true: false;
        var post_id = me._comment.getId();
        var data = {
            cancel_vote: cancelVote,
            post_id: post_id
        };
        $.ajax({
            type: 'POST',
            data: data,
            dataType: 'json',
            url: askbot.urls.upvote_comment,
            cache: false,
            success: function (data) {
                if (data.success) {
                    me.setScore(data.score);
                    me.setVoted(!cancelVote);
                } else {
                    showMessage(comment.getElement(), data.message, 'after');
                }
            }
        });
    };
};

CommentVoteButton.prototype.decorate = function (element) {
    this._element = element;
    this.setHandler(this.getVoteHandler());

    element = this._element;
    var comment = this._comment;
    /* can't call comment.getElement() here due
     * an issue in the getElement() of comment
     * so use an "illegal" access to comment._element here
     */
    comment._element.mouseenter(function () {
        //outside height may not be known
        //var height = comment.getElement().height();
        //element.height(height);
        element.addClass('hover');
    });
    comment._element.mouseleave(function () {
        element.removeClass('hover');
    });

};

CommentVoteButton.prototype.createDom = function () {
    this._element = this.makeElement('div');
    if (this._score > 0) {
        this._element.html(this._score);
    }
    this._element.addClass('upvote');
    if (this._voted) {
        this._element.addClass('upvoted');
    }
    this.decorate(this._element);
};

/**
 * an updater of the follower count
 */
var updateQuestionFollowerCount = function (evt, data) {
    var fav = $('.js-question-follower-count');
    var count = data.num_followers;
    if (count === 0) {
        fav.text('');
    } else {
        var fmt = ngettext('%s follower', '%s followers', count);
        fav.text(interpolate(fmt, [count]));
    }
};

/**
 * legacy Vote class
 * handles all sorts of vote-like operations
 */
var Vote = (function () {
    // All actions are related to a question
    var questionId;
    //question slug to build redirect urls
    var questionSlug;
    // The object we operate on actually. It can be a question or an answer.
    var postId;
    var questionAuthorId;
    var currentUserId;
    var answerContainerIdPrefix = 'post-id-';
    var voteContainerId = 'vote-buttons';
    var imgIdPrefixAccept = 'answer-img-accept-';
    var imgIdPrefixQuestionVoteup = 'question-img-upvote-';
    var imgIdPrefixQuestionVotedown = 'question-img-downvote-';
    var imgIdPrefixAnswerVoteup = 'answer-img-upvote-';
    var imgIdPrefixAnswerVotedown = 'answer-img-downvote-';
    var voteNumberClass = 'vote-number';
    var offensiveIdPrefixQuestionFlag = 'question-offensive-flag-';
    var removeOffensiveIdPrefixQuestionFlag = 'question-offensive-remove-flag-';
    var removeAllOffensiveIdPrefixQuestionFlag = 'question-offensive-remove-all-flag-';
    var offensiveIdPrefixAnswerFlag = 'answer-offensive-flag-';
    var removeOffensiveIdPrefixAnswerFlag = 'answer-offensive-remove-flag-';
    var removeAllOffensiveIdPrefixAnswerFlag = 'answer-offensive-remove-all-flag-';
    var offensiveClassFlag = 'offensive-flag';
    var questionControlsId = 'question-controls';
    var removeAnswerLinkIdPrefix = 'answer-delete-link-';
    var questionSubscribeUpdates = 'question-subscribe-updates';
    var questionSubscribeSidebar = 'question-subscribe-sidebar';

    var acceptAnonymousMessage = gettext('insufficient privilege');

    var pleaseLogin = ' <a href="' + askbot.urls.user_signin + '">' + gettext('please login') + '</a>';

    //todo: this below is probably not used
    var subscribeAnonymousMessage = gettext('anonymous users cannot subscribe to questions') + pleaseLogin;
    var voteAnonymousMessage = gettext('anonymous users cannot vote') + pleaseLogin;
    //there were a couple of more messages...
    var offensiveAnonymousMessage = gettext('anonymous users cannot flag offensive posts') + pleaseLogin;
    var removeConfirmation = gettext('confirm delete');
    var removeAnonymousMessage = gettext('anonymous users cannot delete/undelete') + pleaseLogin;
    var recoveredMessage = gettext('post recovered');
    var deletedMessage = gettext('post deleted');

    var VoteType = {
        acceptAnswer: 0,
        questionUpVote: 1,
        questionDownVote: 2,
        answerUpVote: 5,
        answerDownVote:6,
        offensiveQuestion: 7,
        removeOffensiveQuestion: 7.5,
        removeAllOffensiveQuestion: 7.6,
        offensiveAnswer: 8,
        removeOffensiveAnswer: 8.5,
        removeAllOffensiveAnswer: 8.6,
        removeQuestion: 9,//deprecate
        removeAnswer: 10,//deprecate
        questionSubscribeUpdates: 11,
        questionUnsubscribeUpdates: 12
    };

    var getQuestionVoteUpButton = function () {
        var questionVoteUpButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixQuestionVoteup + '"]';
        return $(questionVoteUpButton);
    };
    var getQuestionVoteDownButton = function () {
        var questionVoteDownButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixQuestionVotedown + '"]';
        return $(questionVoteDownButton);
    };
    var getAnswerVoteUpButtons = function () {
        var answerVoteUpButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixAnswerVoteup + '"]';
        return $(answerVoteUpButton);
    };
    var getAnswerVoteDownButtons = function () {
        var answerVoteDownButton = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixAnswerVotedown + '"]';
        return $(answerVoteDownButton);
    };
    var getAnswerVoteUpButton = function (id) {
        var answerVoteUpButton = 'div.' + voteContainerId + ' div[id="' + imgIdPrefixAnswerVoteup + id + '"]';
        return $(answerVoteUpButton);
    };
    var getAnswerVoteDownButton = function (id) {
        var answerVoteDownButton = 'div.' + voteContainerId + ' div[id="' + imgIdPrefixAnswerVotedown + id + '"]';
        return $(answerVoteDownButton);
    };

    var getOffensiveQuestionFlag = function () {
        var offensiveQuestionFlag = 'span[id^="' + offensiveIdPrefixQuestionFlag + '"]';
        return $(offensiveQuestionFlag);
    };

    var getRemoveOffensiveQuestionFlag = function () {
        var removeOffensiveQuestionFlag = 'span[id^="' + removeOffensiveIdPrefixQuestionFlag + '"]';
        return $(removeOffensiveQuestionFlag);
    };

    var getRemoveAllOffensiveQuestionFlag = function () {
        var removeAllOffensiveQuestionFlag = 'span[id^="' + removeAllOffensiveIdPrefixQuestionFlag + '"]';
        return $(removeAllOffensiveQuestionFlag);
    };

    var getOffensiveAnswerFlags = function () {
        var offensiveQuestionFlag = 'span[id^="' + offensiveIdPrefixAnswerFlag + '"]';
        return $(offensiveQuestionFlag);
    };

    var getRemoveOffensiveAnswerFlag = function () {
        var removeOffensiveAnswerFlag = 'span[id^="' + removeOffensiveIdPrefixAnswerFlag + '"]';
        return $(removeOffensiveAnswerFlag);
    };

    var getRemoveAllOffensiveAnswerFlag = function () {
        var removeAllOffensiveAnswerFlag = 'span[id^="' + removeAllOffensiveIdPrefixAnswerFlag + '"]';
        return $(removeAllOffensiveAnswerFlag);
    };

    var getquestionSubscribeUpdatesCheckbox = function () {
        return $('#' + questionSubscribeUpdates);
    };

    var getquestionSubscribeSidebarCheckbox = function () {
        return $('#' + questionSubscribeSidebar);
    };

    var getremoveAnswersLinks = function () {
        var removeAnswerLinks = 'a[id^="' + removeAnswerLinkIdPrefix + '"]';
        return $(removeAnswerLinks);
    };

    var setVoteImage = function (voteType, undo, object) {
        var flag = undo ? false : true;
        if (object.hasClass('on')) {
            object.removeClass('on');
        } else {
            object.addClass('on');
        }

        if (undo) {
            if (voteType === VoteType.questionUpVote || voteType === VoteType.questionDownVote) {
                $(getQuestionVoteUpButton()).removeClass('on');
                $(getQuestionVoteDownButton()).removeClass('on');
            } else {
                $(getAnswerVoteUpButton(postId)).removeClass('on');
                $(getAnswerVoteDownButton(postId)).removeClass('on');
            }
        }
    };

    var setVoteNumber = function (object, number) {
        var voteNumber = object.parent('div.' + voteContainerId).find('div.' + voteNumberClass);
        $(voteNumber).text(number);
    };

    var bindEvents = function () {
        // accept answers
        var acceptedButtons = 'div.' + voteContainerId + ' div[id^="' + imgIdPrefixAccept + '"]';
        $(acceptedButtons).unbind('click').click(function (event) {
            Vote.accept($(event.target));
        });

        // question vote up
        var questionVoteUpButton = getQuestionVoteUpButton();
        questionVoteUpButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.questionUpVote);
        });

        var questionVoteDownButton = getQuestionVoteDownButton();
        questionVoteDownButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.questionDownVote);
        });

        var answerVoteUpButton = getAnswerVoteUpButtons();
        answerVoteUpButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.answerUpVote);
        });

        var answerVoteDownButton = getAnswerVoteDownButtons();
        answerVoteDownButton.unbind('click').click(function (event) {
            Vote.vote($(event.target), VoteType.answerDownVote);
        });

        getOffensiveQuestionFlag().unbind('click').click(function (event) {
            Vote.offensive(this, VoteType.offensiveQuestion);
        });

        getRemoveOffensiveQuestionFlag().unbind('click').click(function (event) {
            Vote.remove_offensive(this, VoteType.removeOffensiveQuestion);
        });

        getRemoveAllOffensiveQuestionFlag().unbind('click').click(function (event) {
            Vote.remove_all_offensive(this, VoteType.removeAllOffensiveQuestion);
        });

        getOffensiveAnswerFlags().unbind('click').click(function (event) {
            Vote.offensive(this, VoteType.offensiveAnswer);
        });

        getRemoveOffensiveAnswerFlag().unbind('click').click(function (event) {
            Vote.remove_offensive(this, VoteType.removeOffensiveAnswer);
        });

        getRemoveAllOffensiveAnswerFlag().unbind('click').click(function (event) {
            Vote.remove_all_offensive(this, VoteType.removeAllOffensiveAnswer);
        });

        getquestionSubscribeUpdatesCheckbox().unbind('click').click(function (event) {
            //despeluchar esto
            if (this.checked) {
                getquestionSubscribeSidebarCheckbox().attr({'checked': true});
                Vote.vote($(event.target), VoteType.questionSubscribeUpdates);
            } else {
                getquestionSubscribeSidebarCheckbox().attr({'checked': false});
                Vote.vote($(event.target), VoteType.questionUnsubscribeUpdates);
            }
        });

        getquestionSubscribeSidebarCheckbox().unbind('click').click(function (event) {
            if (this.checked) {
                getquestionSubscribeUpdatesCheckbox().attr({'checked': true});
                Vote.vote($(event.target), VoteType.questionSubscribeUpdates);
            } else {
                getquestionSubscribeUpdatesCheckbox().attr({'checked': false});
                Vote.vote($(event.target), VoteType.questionUnsubscribeUpdates);
            }
        });

        getremoveAnswersLinks().unbind('click').click(function (event) {
            Vote.remove(this, VoteType.removeAnswer);
        });
    };

    var submit = function (object, voteType, callback) {
        //this function submits votes
        $.ajax({
            type: 'POST',
            cache: false,
            dataType: 'json',
            url: askbot.urls.vote_url,
            data: { type: voteType, postId: postId },
            error: handleFail,
            success: function (data) {
                callback(object, voteType, data);
            }
        });
    };

    var handleFail = function (xhr, msg) {
        alert('Callback invoke error: ' + msg);
    };

    // callback function for Accept Answer action
    var callback_accept = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        if (data.allowed == '0' && data.success == '0') {
            showMessage(object, acceptAnonymousMessage);
        } else if (data.allowed == '-1') {
            var message = interpolate(
                gettext('sorry, you cannot %(accept_own_answer)s'),
                {'accept_own_answer': askbot.messages.acceptOwnAnswer},
                true
            );
            showMessage(object, message);
        } else if (data.status == '1') {
            $('#' + answerContainerIdPrefix + postId).removeClass('accepted-answer');
            object.trigger('askbot.unacceptAnswer', [object, data]);
        } else if (data.success == '1') {
            var answers = ('div[id^="' + answerContainerIdPrefix + '"]');
            $(answers).removeClass('accepted-answer');
            $('#' + answerContainerIdPrefix + postId).addClass('accepted-answer');
            object.trigger('askbot.acceptAnswer', [object, data]);
        } else {
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_vote = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        if (data.success == '0') {
            showMessage(object, data.message);
            return;
        } else {
            if (data.status == '1') {
                setVoteImage(voteType, true, object);
                object.trigger('askbot.voteDown', [object, data]);
            } else {
                setVoteImage(voteType, false, object);
                object.trigger('askbot.voteUp', [object, data]);
            }
            setVoteNumber(object, data.count);
            if (data.message && data.message.length > 0) {
                showMessage(object, data.message);
            }
            return;
        }
        /*jshint eqeqeq:true */
    };

    var callback_offensive = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        //todo: transfer proper translations of these from i18n.js
        //to django.po files
        //_('anonymous users cannot flag offensive posts') + pleaseLogin;
        if (data.success == '1') {
            if (data.count > 0) {
                $(object).children('span[class="darkred"]').text('(' + data.count + ')');
            } else {
                $(object).children('span[class="darkred"]').text('');
            }

            // Change the link text and rebind events
            $(object).find('.question-flag').html(gettext('remove flag'));
            var obj_id = $(object).attr('id');
            $(object).attr('id', obj_id.replace('flag-', 'remove-flag-'));

            getRemoveOffensiveQuestionFlag().unbind('click').click(function (event) {
                Vote.remove_offensive(this, VoteType.removeOffensiveQuestion);
            });

            getRemoveOffensiveAnswerFlag().unbind('click').click(function (event) {
                Vote.remove_offensive(this, VoteType.removeOffensiveAnswer);
            });
        } else {
            object = $(object);
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_remove_offensive = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        //todo: transfer proper translations of these from i18n.js
        //to django.po files
        //_('anonymous users cannot flag offensive posts') + pleaseLogin;
        if (data.success == '1') {
            if (data.count > 0) {
                $(object).children('span[class="darkred"]').text('(' + data.count + ')');
            } else {
                $(object).children('span[class="darkred"]').text('');
                // Remove "remove all flags link" since there are no more flags to remove
                var remove_all = $(object).siblings('span.offensive-flag[id*="-offensive-remove-all-flag-"]');
                $(remove_all).next('span.sep').remove();
                $(remove_all).remove();
            }
            // Change the link text and rebind events
            $(object).find('.question-flag').html(gettext('flag offensive'));
            var obj_id = $(object).attr('id');
            $(object).attr('id', obj_id.replace('remove-flag-', 'flag-'));

            getOffensiveQuestionFlag().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveQuestion);
            });

            getOffensiveAnswerFlags().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveAnswer);
            });
        } else {
            object = $(object);
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_remove_all_offensive = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        //todo: transfer proper translations of these from i18n.js
        //to django.po files
        //_('anonymous users cannot flag offensive posts') + pleaseLogin;
        if (data.success == '1') {
            if (data.count > 0) {
                $(object).children('span[class="darkred"]').text('(' + data.count + ')');
            } else {
                $(object).children('span[class="darkred"]').text('');
            }
            // remove the link. All flags are gone
            var remove_own = $(object).siblings('span.offensive-flag[id*="-offensive-remove-flag-"]');
            $(remove_own).find('.question-flag').html(gettext('flag offensive'));
            $(remove_own).attr('id', $(remove_own).attr('id').replace('remove-flag-', 'flag-'));

            $(object).next('span.sep').remove();
            $(object).remove();

            getOffensiveQuestionFlag().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveQuestion);
            });

            getOffensiveAnswerFlags().unbind('click').click(function (event) {
                Vote.offensive(this, VoteType.offensiveAnswer);
            });
        } else {
            object = $(object);
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    var callback_remove = function (object, voteType, data) {
        /*jshint eqeqeq:false */
        if (data.success == '1') {
            if (removeActionType == 'delete') {
                postNode.addClass('deleted');
                postRemoveLink.innerHTML = gettext('undelete');
                showMessage(object, deletedMessage);
            } else if (removeActionType == 'undelete') {
                postNode.removeClass('deleted');
                postRemoveLink.innerHTML = gettext('delete');
                showMessage(object, recoveredMessage);
            }
        } else {
            showMessage(object, data.message);
        }
        /*jshint eqeqeq:true */
    };

    return {
        init: function (qId, qSlug, questionAuthor, userId) {
            questionId = qId;
            questionSlug = qSlug;
            questionAuthorId = questionAuthor;
            currentUserId = '' + userId;//convert to string
            bindEvents();
        },

        //accept answer
        accept: function (object) {
            object = object.closest('.answer-img-accept');
            postId = object.attr('id').substring(imgIdPrefixAccept.length);
            submit(object, VoteType.acceptAnswer, callback_accept);
        },

        vote: function (object, voteType) {
            object = object.closest('.post-vote');
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                if (voteType === VoteType.questionSubscribeUpdates || voteType === VoteType.questionUnsubscribeUpdates) {
                    getquestionSubscribeSidebarCheckbox().removeAttr('checked');
                    getquestionSubscribeUpdatesCheckbox().removeAttr('checked');
                    showMessage(object, subscribeAnonymousMessage);
                } else {
                    showMessage(
                        $(object),
                        voteAnonymousMessage.replace(
                                '{{QuestionID}}',
                                questionId
                            ).replace(
                                '{{questionSlug}}',
                                questionSlug
                            )
                    );
                }
                return false;
            }
            // up and downvote processor
            if (voteType === VoteType.answerUpVote) {
                postId = object.attr('id').substring(imgIdPrefixAnswerVoteup.length);
            } else if (voteType === VoteType.answerDownVote) {
                postId = object.attr('id').substring(imgIdPrefixAnswerVotedown.length);
            } else {
                postId = questionId;
            }

            submit(object, voteType, callback_vote);
        },
        //flag offensive
        offensive: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    offensiveAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                );
                return false;
            }
            postId = object.id.substr(object.id.lastIndexOf('-') + 1);
            submit(object, voteType, callback_offensive);
        },
        //remove flag offensive
        remove_offensive: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    offensiveAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                );
                return false;
            }
            postId = object.id.substr(object.id.lastIndexOf('-') + 1);
            submit(object, voteType, callback_remove_offensive);
        },
        remove_all_offensive: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    offensiveAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                );
                return false;
            }
            postId = object.id.substr(object.id.lastIndexOf('-') + 1);
            submit(object, voteType, callback_remove_all_offensive);
        },
        //delete question or answer (comments are deleted separately)
        remove: function (object, voteType) {
            if (!currentUserId || currentUserId.toUpperCase() === 'NONE') {
                showMessage(
                    $(object),
                    removeAnonymousMessage.replace(
                            '{{QuestionID}}',
                            questionId
                        ).replace(
                            '{{questionSlug}}',
                            questionSlug
                        )
                    );
                return false;
            }
            bits = object.id.split('-');
            postId = bits.pop();/* this seems to be used within submit! */
            postType = bits.shift();

            var do_proceed = false;
            postNode = $('#post-id-' + postId);
            postRemoveLink = object;
            if (postNode.hasClass('deleted')) {
                removeActionType = 'undelete';
                do_proceed = true;
            } else {
                removeActionType = 'delete';
                do_proceed = confirm(removeConfirmation);
            }
            if (do_proceed) {
                submit($(object), voteType, callback_remove);
            }
        }
    };
})();

var questionRetagger = (function () {

    var oldTagsHTML = '';
    var tagInput = null;
    var tagsList = null;
    var retagLink = null;

    var restoreEventHandlers = function () {
        $(document).unbind('click', cancelRetag);
    };

    var cancelRetag = function () {
        tagsList.html(oldTagsHTML);
        tagsList.removeClass('post-retag');
        tagsList.addClass('post-tags');
        restoreEventHandlers();
        initRetagger();
    };

    var drawNewTags = function (new_tags) {
        tagsList.empty();
        if (new_tags === '') {
            return;
        }
        new_tags = new_tags.split(/\s+/);
        var tags_html = '';
        $.each(new_tags, function (index, name) {
            var tag = new Tag();
            tag.setName(name);
            var li = $('<li></li>');
            tagsList.append(li);
            li.append(tag.getElement());
        });
    };

    var doRetag = function () {
        $.ajax({
            type: 'POST',
            url: askbot.urls.retag,
            dataType: 'json',
            data: { tags: getUniqueWords(tagInput.val()).join(' ') },
            success: function (json) {
                if (json.success) {
                    new_tags = getUniqueWords(json.new_tags);
                    oldTagsHtml = '';
                    cancelRetag();
                    drawNewTags(new_tags.join(' '));
                    if (json.message) {
                        notify.show(json.message);
                    }
                } else {
                    cancelRetag();
                    showMessage(tagsList, json.message);
                }
            },
            error: function (xhr, textStatus) {
                showMessage(tagsList, gettext('sorry, something is not right here'));
                cancelRetag();
            }
        });
        return false;
    };

    var setupInputEventHandlers = function (input) {
        input.keydown(function (e) {
            if ((e.which && e.which === 27) || (e.keyCode && e.keyCode === 27)) {
                cancelRetag();
            }
        });
        $(document).unbind('click', cancelRetag).click(cancelRetag);
        input.closest('form').click(function (e) {
            e.stopPropagation();
        });
    };

    var createRetagForm = function (old_tags_string) {
        var div = $('<form method="post"></form>');
        tagInput = $('<input id="retag_tags" type="text" autocomplete="off" name="tags" size="30"/>');
        addExtraCssClasses(tagInput, 'textInputClasses');
        //var tagLabel = $('<label for="retag_tags" class="error"></label>');
        //populate input
        var tagAc = new AutoCompleter({
            url: askbot.urls.get_tag_list,
            minChars: 1,
            useCache: true,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10
        });
        tagAc.decorate(tagInput);
        tagAc._results.on('click', function (e) {
            //click on results should not trigger cancelRetag
            e.stopPropagation();
        });
        tagInput.val(old_tags_string);
        div.append(tagInput);
        //div.append(tagLabel);
        setupInputEventHandlers(tagInput);

        //button = $('<input type="submit" />');
        //button.val(gettext('save tags'));
        //div.append(button);
        //setupButtonEventHandlers(button);
        $(document).trigger('askbot.afterCreateRetagForm', [div]);

        div.validate({//copy-paste from utils.js
            rules: {
                tags: {
                    required: askbot.settings.tagsAreRequired,
                    maxlength: askbot.settings.maxTagsPerPost * askbot.settings.maxTagLength,
                    limit_tag_count: true,
                    limit_tag_length: true
                }
            },
            messages: {
                tags: {
                    required: gettext('tags cannot be empty'),
                    maxlength: askbot.messages.tagLimits,
                    limit_tag_count: askbot.messages.maxTagsPerPost,
                    limit_tag_length: askbot.messages.maxTagLength
                }
            },
            submitHandler: doRetag,
            errorClass: 'retag-error'
        });

        $(document).trigger('askbot.afterSetupValidationRetagForm', [div]);

        return div;
    };

    var getTagsAsString = function (tags_div) {
        var links = tags_div.find('.js-tag-name');
        var tags_str = '';
        links.each(function (index, element) {
            if (index === 0) {
                //this is pretty bad - we should use Tag.getName()
                tags_str = $(element).data('tagName');
            } else {
                tags_str += ' ' + $(element).data('tagName');
            }
        });
        return tags_str;
    };

    var noopHandler = function () {
        tagInput.focus();
        return false;
    };

    var deactivateRetagLink = function () {
        retagLink.unbind('click').click(noopHandler);
        retagLink.unbind('keypress').keypress(noopHandler);
    };

    var startRetag = function () {
        tagsList = $('#question-tags');
        oldTagsHTML = tagsList.html();//save to restore on cancel
        var old_tags_string = getTagsAsString(tagsList);
        var retag_form = createRetagForm(old_tags_string);
        tagsList.html('');
        tagsList.append(retag_form);
        tagsList.removeClass('post-tags');
        tagsList.addClass('post-retag');
        tagInput.focus();
        deactivateRetagLink();
        return false;
    };

    var setupClickAndEnterHandler = function (element, callback) {
        element.unbind('click').click(callback);
        element.unbind('keypress').keypress(function (e) {
            if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
                callback();
            }
        });
    };

    var initRetagger = function () {
        setupClickAndEnterHandler(retagLink, startRetag);
    };

    return {
        init: function () {
            retagLink = $('#retag');
            initRetagger();
        }
    };
})();

/**
 * @constructor
 * Controls vor voting for a post
 */
var VoteControls = function () {
    WrappedElement.call(this);
    this._postAuthorId = undefined;
    this._postId = undefined;
};
inherits(VoteControls, WrappedElement);

VoteControls.prototype.setPostId = function (postId) {
    this._postId = postId;
};

VoteControls.prototype.getPostId = function () {
    return this._postId;
};

VoteControls.prototype.setPostAuthorId = function (userId) {
    this._postAuthorId = userId;
};

VoteControls.prototype.setSlug = function (slug) {
    this._slug = slug;
};

VoteControls.prototype.setPostType = function (postType) {
    this._postType = postType;
};

VoteControls.prototype.getPostType = function () {
    return this._postType;
};

VoteControls.prototype.clearVotes = function () {
    this._upvoteButton.removeClass('on');
    this._downvoteButton.removeClass('on');
};

VoteControls.prototype.toggleButton = function (button) {
    if (button.hasClass('on')) {
        button.removeClass('on');
    } else {
        button.addClass('on');
    }
};

VoteControls.prototype.toggleVote = function (voteType) {
    if (voteType === 'upvote') {
        this.toggleButton(this._upvoteButton);
    } else {
        this.toggleButton(this._downvoteButton);
    }
};

VoteControls.prototype.setVoteCount = function (count) {
    this._voteCount.html(count);
};

VoteControls.prototype.updateDisplay = function (voteType, data) {
    /* jshint eqeqeq:false */
    if (data.status == '1') {
        this.clearVotes();
    } else {
        this.toggleVote(voteType);
    }
    this.setVoteCount(data.count);
    if (data.message && data.message.length > 0) {
        showMessage(this._element, data.message);
    }
    /* jshint eqeqeq:true */
};

VoteControls.prototype.getAnonymousMessage = function (message) {
    var pleaseLogin = ' <a href="' + askbot.urls.user_signin + '">' + gettext('please login') + '</a>';
    message += pleaseLogin;
    message = message.replace('{{QuestionID}}', this._postId);
    return message.replace('{{questionSlug}}', this._slug);
};

VoteControls.prototype.getVoteHandler = function (voteType) {
    var me = this;
    return function () {
        if (askbot.data.userIsAuthenticated === false) {
            var message = me.getAnonymousMessage(gettext('anonymous users cannot vote'));
            showMessage(me.getElement(), message);
        } else {
            //this function submits votes
            var voteMap = {
                'question': { 'upvote': 1, 'downvote': 2 },
                'answer': { 'upvote': 5, 'downvote': 6 }
            };
            var legacyVoteType = voteMap[me.getPostType()][voteType];
            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                url: askbot.urls.vote_url,
                data: {
                    type: legacyVoteType,
                    postId: me.getPostId()
                },
                error: function () {
                    showMessage(me.getElement(), gettext('sorry, something is not right here'));
                },
                success: function (data) {
                    if (data.success) {
                        me.updateDisplay(voteType, data);
                    } else {
                        showMessage(me.getElement(), data.message);
                    }
                }
            });
        }
    };
};

VoteControls.prototype.decorate = function (element) {
    this._element = element;
    var upvoteButton = element.find('.upvote');
    this._upvoteButton = upvoteButton;
    setupButtonEventHandlers(upvoteButton, this.getVoteHandler('upvote'));
    var downvoteButton = element.find('.downvote');
    this._downvoteButton = downvoteButton;
    setupButtonEventHandlers(downvoteButton, this.getVoteHandler('downvote'));
    this._voteCount = element.find('.vote-number');
};

var DeletePostLink = function () {
    SimpleControl.call(this);
    this._post_id = null;
};
inherits(DeletePostLink, SimpleControl);

DeletePostLink.prototype.setPostId = function (id) {
    this._post_id = id;
};

DeletePostLink.prototype.getPostId = function () {
    return this._post_id;
};

DeletePostLink.prototype.getPostElement = function () {
    return $('#post-id-' + this.getPostId());
};

DeletePostLink.prototype.isPostDeleted = function () {
    return this._post_deleted;
};

DeletePostLink.prototype.setPostDeleted = function (is_deleted) {
    var post = this.getPostElement();
    if (is_deleted === true) {
        post.addClass('deleted');
        this._post_deleted = true;
        this.getElement().html(gettext('undelete'));
    } else if (is_deleted === false) {
        post.removeClass('deleted');
        this._post_deleted = false;
        this.getElement().html(gettext('delete'));
    }
};

DeletePostLink.prototype.getDeleteHandler = function () {
    var me = this;
    var post_id = this.getPostId();
    return function () {
        var data = {
            'post_id': me.getPostId(),
            //todo rename cancel_vote -> undo
            'cancel_vote': me.isPostDeleted() ? true : false
        };
        $.ajax({
            type: 'POST',
            data: data,
            dataType: 'json',
            url: askbot.urls.delete_post,
            cache: false,
            success: function (data) {
                if (data.success) {
                    me.setPostDeleted(data.is_deleted);
                } else {
                    showMessage(me.getElement(), data.message);
                }
            }
        });
    };
};

DeletePostLink.prototype.decorate = function (element) {
    this._element = element;
    this._post_deleted = this.getPostElement().hasClass('deleted');
    this.setHandler(this.getDeleteHandler());
};

/**
 * @constructor
 * a simple textarea-based editor
 */
var SimpleEditor = function (attrs) {
    WrappedElement.call(this);
    attrs = attrs || {};
    this._rows = attrs.rows || 10;
    this._cols = attrs.cols || 60;
    this._minLines = attrs.minLines || 1;
    this._maxlength = attrs.maxlength || 1000;
};
inherits(SimpleEditor, WrappedElement);

SimpleEditor.prototype.focus = function (onFocus) {
    this._textarea.focus();
    if (onFocus) {
        onFocus();
    }
};

SimpleEditor.prototype.putCursorAtEnd = function () {
    putCursorAtEnd(this._textarea);
};

SimpleEditor.prototype.start = function () {
    this.getAutoResizeHandler()();
};

SimpleEditor.prototype.setHighlight = function (isHighlighted) {
    if (isHighlighted === true) {
        this._textarea.addClass('highlight');
    } else {
        this._textarea.removeClass('highlight');
    }
};

SimpleEditor.prototype.setTextareaName = function (name) {
    this._textareaName = name;
};


SimpleEditor.prototype.getText = function () {
    return $.trim(this._textarea.val());
};

SimpleEditor.prototype.getHtml = function () {
    return '<div class="transient-comment"><p>' + this.getText() + '</p></div>';
};

SimpleEditor.prototype.setText = function (text) {
    this._text = text;
    if (this._textarea) {
        this._textarea.val(text);
        this.getAutoResizeHandler()();
    }
};

SimpleEditor.prototype.getAutoResizeHandler = function() {
    var textarea = this._textarea;
    var mirror = this._mirror;
    var minLines = this._minLines;
    var me = this;
    return function(evt) {
        me.setMirrorStyle();
        var text = me.getText();
        if (evt) {
            if (evt.type == 'keydown' && getKeyCode(evt) == 13) {
                text += '\nZ';//add one char after newline
            } else if (/(\r|\n)$/.exec(evt.target.value)) {
                text += '\nZ';//add one char after newline
            }
        }
        mirror.text(text);
        var height = mirror.height();
        var lineHeight = parseInt(textarea.css('line-height')) || 10;
        height = lineHeight * Math.max(Math.ceil(height/lineHeight), minLines);
        textarea.css('height', height + 8);
    }
};

SimpleEditor.prototype.setMirrorStyle = function() {
    //copy styles into mirror from the textarea
    var textarea = this._textarea;
    var mirrorCss = {
        'position': 'absolute',
        'top': '-999em',
        'padding': textarea.css('padding'),
        'margin': textarea.css('margin'),
        'width': textarea.css('width'),
        'word-wrap': textarea.css('word-wrap'),
        'word-break': textarea.css('word-break'),
        'overflow': textarea.css('overflow')
    };
    //for IE, as .css('font') fails
    var fontProps = getFontProps(textarea);
    mirrorCss = $.extend(mirrorCss, fontProps);
    this._mirror.css(mirrorCss);
};

/**
 * a textarea inside a div,
 * the reason for this is that we subclass this
 * in WMD, and that one requires a more complex structure
 */
SimpleEditor.prototype.createDom = function () {
    this._element = getTemplate('.js-simple-editor');
    var textarea = this._element.find('textarea');
    var mirror = this._element.find('.mirror');

    this._textarea = textarea;
    this._mirror = mirror;


    if (askbot.settings.tinymceEditorDeselector) {
        textarea.addClass(askbot.settings.tinymceEditorDeselector);//suppress tinyMCE
    }
    addExtraCssClasses(textarea, 'editorClasses');
    if (this._text) {
        textarea.val(this._text);
    }
    textarea.attr({
        'cols': this._cols,
        'rows': this._rows,
        'maxlength': this._maxlength
    });
    if (this._textareaName) {
        textarea.attr('name', this._textareaName);
    }

    textarea.on('change paste keyup keydown', this.getAutoResizeHandler());
};

var WMDExpanderToggle = function (editor) {
    ExpanderToggle.call(this, editor.getPreviewerElement());
    this._editor = editor.getEditorElement();
    this._state = 'on-state';
    this._messages = {
        'on-state': gettext('Preview: (hide)'),
        'off-state': gettext('Show preview')
    }
};
inherits(WMDExpanderToggle, ExpanderToggle);

WMDExpanderToggle.prototype.getEditor = function () {
    return this._editor;
};

WMDExpanderToggle.prototype.setPreviewerCollapsedClass = function (collapsed) {
    var ed = this.getEditor();
    if (collapsed) {
        ed.addClass('wmd-previewer-collapsed');
    } else {
        ed.removeClass('wmd-previewer-collapsed');
    }
};

WMDExpanderToggle.prototype.createDom = function () {
    getSuperClass(WMDExpanderToggle).createDom.call(this);
    this._element.addClass('wmd-previewer-toggle');
    var editor = this.getEditor();

    var me = this;
    this._element.on('askbot.Toggle.stateChange', function (evt, data) {
        var newState = data['newState'];
        var collapsed = (newState == 'off-state' || newState == 'on-prompt');
        me.setPreviewerCollapsedClass(collapsed);
        return false;
    });
    this._element.on('askbot.WrappedElement.show askbot.WrappedElement.hide', function () {
        me.setPreviewerCollapsedClass(!me.isOn());
        return false;
    });
}

/**
 * @constructor
 * a wrapper for the WMD editor
 */
var WMD = function (opts) {
    SimpleEditor.call(this, opts);
    this._text = undefined;
    this._enabled_buttons = 'bold italic link blockquote code ' +
        'image attachment ol ul heading hr';
    this._previewerEnabled = true;
};
inherits(WMD, SimpleEditor);

//@todo: implement getHtml method that runs text through showdown renderer

WMD.prototype.setEnabledButtons = function (buttons) {
    this._enabled_buttons = buttons;
};

WMD.prototype.setPreviewerEnabled = function (enabledStatus) {
    this._previewerEnabled = enabledStatus;
    if (this._previewer) {
        if (enabledStatus) {
            this._previewer.show();
            this._previewerToggle.show();
        } else {
            this._previewer.hide();
            this._previewerToggle.hide();
        }
    }
};

WMD.prototype.getPreviewerEnabled = function () {
    return this._previewerEnabled;
};

WMD.prototype.getPreviewerElement = function () {
    return this._previewer;
};

WMD.prototype.getEditorElement = function () {
    return this._editor;
};

WMD.prototype.createDom = function () {
    this._element = this.makeElement('div');
    var clearfix = this.makeElement('div').addClass('clearfix');
    this._element.append(clearfix);

    var wmd_container = this.makeElement('div');
    wmd_container.addClass('wmd-container');
    this._editor = wmd_container;

    this._element.append(wmd_container);

    var wmd_buttons = this.makeElement('div')
                        .attr('id', this.makeId('wmd-button-bar'))
                        .addClass('wmd-panel');
    wmd_container.append(wmd_buttons);

    var editor = this.makeElement('textarea')
                        .attr('id', this.makeId('editor'));
    addExtraCssClasses(editor, 'editorClasses');
    if (this._textareaName) {
        editor.attr('name', this._textareaName);
    }

    wmd_container.append(editor);
    this._textarea = editor;

    var mirror = this.makeElement('pre').addClass('mirror');
    wmd_container.append(mirror);
    this._mirror = mirror;
    $(editor).on('change paste keyup keydown', this.getAutoResizeHandler());


    if (this._text) {
        editor.val(this._text);
    }

    var previewer = this.makeElement('div')
                        .attr('id', this.makeId('previewer'))
                        .addClass('wmd-preview');
    this._previewer = previewer;

    var toggle = new WMDExpanderToggle(this);
    this._previewerToggle = toggle;
    wmd_container.append(toggle.getElement());

    wmd_container.append(previewer);

    if (this._previewerEnabled === false) {
        previewer.hide();
        this._previewerToggle.hide();
    }
};

WMD.prototype.decorate = function (element) {
    this._element = element;
    this._textarea = element.find('textarea');
    this._previewer = element.find('.wmd-preview');
    this._mirror = element.find('.mirror');
    this._textarea.on('change paste keyup keydown', this.getAutoResizeHandler());
};

WMD.prototype.start = function () {
    Attacklab.Util.startEditor(true, this._enabled_buttons, this.getIdSeed());
    getSuperClass(WMD).start.call(this);
};

/**
 * @constructor
 */
var TinyMCE = function (config) {
    WrappedElement.call(this);
    var defaultConfig = JSON.parse(askbot['settings']['tinyMCEConfigJson']);
    this._config = $.extend(defaultConfig, config || {});

    this._id = 'editor';//desired id of the textarea
};
inherits(TinyMCE, WrappedElement);

TinyMCE.prototype.setTextareaName = function (name) {
    this._textareaName = name;
};

/*
 * not passed onto prototoype on purpose!!!
 */
TinyMCE.onInitHook = function () {
    //set initial content
    var ed = tinyMCE.activeEditor;
    //if we have spellchecker - enable it by default
    if (inArray('spellchecker', askbot.settings.tinyMCEPlugins)) {
        setTimeout(function () {
            ed.controlManager.setActive('spellchecker', true);
            tinyMCE.execCommand('mceSpellCheck', true);
        }, 1);
    }
    $('.mceStatusbar').remove();
};

TinyMCE.onChangeHook = function (editor) {
    tinyMCE.triggerSave();
    $(tinyMCE.get(editor.id).getElement()).change();
};

/* 3 dummy functions to match WMD api */
TinyMCE.prototype.setEnabledButtons = function () {};

TinyMCE.prototype.start = function () {
    //copy the options, because we need to modify them
    var opts = $.extend({}, this._config);
    var me = this;
    var extraOpts = {
        'mode': 'exact',
        'elements': this._id
    };
    opts = $.extend(opts, extraOpts);
    tinyMCE.init(opts);
    if (this._text) {
        this.setText(this._text);
    }
};
TinyMCE.prototype.setPreviewerEnabled = function () {};
TinyMCE.prototype.setHighlight = function () {};

TinyMCE.prototype.putCursorAtEnd = function () {
    var ed = tinyMCE.activeEditor;
    //add an empty span with a unique id
    var endId = tinymce.DOM.uniqueId();
    ed.dom.add(ed.getBody(), 'span', {'id': endId}, '');
    //select that span
    var newNode = ed.dom.select('span#' + endId);
    ed.selection.select(newNode[0]);
};

TinyMCE.prototype.focus = function (onFocus) {
    var editorId = this._id;
    var winH = $(window).height();
    var winY = $(window).scrollTop();
    var edY = this._element.offset().top;
    var edH = this._element.height();

    //@todo: the fallacy of this method is timeout - should instead use queue
    //because at the time of calling focus() the editor may not be initialized yet
    setTimeout(
        function () {
            tinyMCE.execCommand('mceFocus', false, editorId);

            //@todo: make this general to all editors

            //if editor bottom is below viewport
            var isBelow = ((edY + edH) > (winY + winH));
            var isAbove = (edY < winY);
            if (isBelow || isAbove) {
                //then center on screen
                $(window).scrollTop(edY - edH / 2 - winY / 2);
            }
            if (onFocus) {
                onFocus();
            }
        },
        100
    );


};

TinyMCE.prototype.setId = function (id) {
    this._id = id;
};

TinyMCE.prototype.setText = function (text) {
    this._text = text;
    if (this.isLoaded()) {
        tinymce.get(this._id).setContent(text);
    }
};

TinyMCE.prototype.getText = function () {
    return tinyMCE.activeEditor.getContent();
};

TinyMCE.prototype.getHtml = TinyMCE.prototype.getText;

TinyMCE.prototype.isLoaded = function () {
    return (typeof tinymce !== 'undefined' && tinymce.get(this._id) !== undefined);
};

TinyMCE.prototype.createDom = function () {
    var editorBox = this.makeElement('div');
    editorBox.addClass('wmd-container');
    this._element = editorBox;
    var textarea = this.makeElement('textarea');
    textarea.attr('id', this._id);
    textarea.addClass('editor');
    if (this._textareaName) {
        textarea.attr('name', this._textareaName);
    }
    //textarea.addClass(askbot.settings.tinymceEditorDeselector);
    this._element.append(textarea);
};

TinyMCE.prototype.decorate = function (element) {
    this._element = element;
    this._id = element.attr('id');
};

/**
 * Form for editing and posting new comment
 * supports 3 editors: markdown, tinymce and plain textarea.
 * There is only one instance of this form in use on the question page.
 * It can be attached to any comment on the page, or to a new blank
 * comment.
 */
var EditCommentForm = function () {
    WrappedElement.call(this);
    this._comment = null;
    this._commentsWidget = null;
    this._element = null;
    this._editorReady = false;
    this._text = '';
};
inherits(EditCommentForm, WrappedElement);

EditCommentForm.prototype.hide = function () {
    this._element.hide();
};

EditCommentForm.prototype.show = function () {
    this._element.show();
};

EditCommentForm.prototype.getEditor = function () {
    return this._editor;
};

EditCommentForm.prototype.getEditorType = function () {
    if (askbot.settings.commentsEditorType === 'rich-text') {
        return askbot.settings.editorType;
    } else {
        return 'plain-text';
    }
};

EditCommentForm.prototype.startTinyMCEEditor = function () {
    var editorId = this.makeId('comment-editor');
    var opts = {
        mode: 'exact',
        content_css: mediaUrl('media/style/tinymce/comments-content.css'),
        elements: editorId,
        theme: 'advanced',
        theme_advanced_toolbar_location: 'top',
        theme_advanced_toolbar_align: 'left',
        theme_advanced_buttons1: 'bold, italic, |, link, |, numlist, bullist',
        theme_advanced_buttons2: '',
        theme_advanced_path: false,
        plugins: '',
        width: '100%',
        height: '70'
    };
    var editor = new TinyMCE(opts);
    editor.setId(editorId);
    editor.setText(this._text);
    this._editorBox.prepend(editor.getElement());
    editor.start();
    this._editor = editor;
};

EditCommentForm.prototype.startWMDEditor = function () {
    var editor = new WMD({minLines: 3});
    editor.setEnabledButtons('bold italic link code ol ul');
    editor.setPreviewerEnabled(false);
    editor.setText(this._text);
    this._editorBox.prepend(editor.getElement());//attach DOM before start
    editor.start();//have to start after attaching DOM
    this._editor = editor;
};

EditCommentForm.prototype.startSimpleEditor = function () {
    this._editor = new SimpleEditor({minLines: 3});
    this._editorBox.prepend(this._editor.getElement());
};

EditCommentForm.prototype.startEditor = function () {
    var editorType = this.getEditorType();
    if (editorType === 'tinymce') {
        this.startTinyMCEEditor();
        //@todo: implement save on enter and character counter in tinyMCE
        return;
    } else if (editorType === 'markdown') {
        this.startWMDEditor();
    } else {
        this.startSimpleEditor();
    }

    //code below is common to SimpleEditor and WMD
    var editor = this._editor;
    var editorElement = this._editor.getElement();

    var limitLength = this.getCommentTruncator();
    editorElement.blur(limitLength);
    editorElement.focus(limitLength);
    editorElement.keyup(limitLength);
    editorElement.keyup(limitLength);

    var updateCounter = this.getCounterUpdater();
    var escapeHandler = makeKeyHandler(27, this.getCancelHandler());
    //todo: try this on the div
    //this should be set on the textarea!
    editorElement.blur(updateCounter);
    editorElement.focus(updateCounter);
    editorElement.keyup(updateCounter);
    editorElement.keyup(escapeHandler);

    if (askbot.settings.saveCommentOnEnter) {
        var save_handler = makeKeyHandler(13, this.getSaveHandler());
        editor.getElement().keydown(save_handler);
    }

    editorElement.trigger('askbot.afterStartEditor', [editor]);
};

EditCommentForm.prototype.getCommentsWidget = function () {
    return this._commentsWidget;
};

/**
 * attaches comment editor to a particular comment
 */
EditCommentForm.prototype.attachTo = function (comment, mode) {
    this._comment = comment;
    this._type = mode;//action: 'add' or 'edit'
    this._commentsWidget = comment.getContainerWidget();
    this._text = comment.getText();
    comment.getElement().after(this.getElement());
    comment.getElement().hide();
    this._commentsWidget.hideOpenEditorButton();//hide add comment button
    //fix up the comment submit button, depending on the mode
    if (this._type === 'add') {
        this._submit_btn.html(gettext('add comment'));
        if (this._minorEditBox) {
            this._minorEditBox.hide();
        }
    } else {
        this._submit_btn.html(gettext('save comment'));
        if (this._minorEditBox) {
            this._minorEditBox.show();
        }
    }
    //enable the editor
    this.getElement().show();
    this.enableForm();
    this.startEditor();
    this._editor.setText(this._text);
    var ed = this._editor;
    var onFocus = function () {
        ed.putCursorAtEnd();
    };
    this._editor.focus(onFocus);
    setupButtonEventHandlers(this._submit_btn, this.getSaveHandler());
    setupButtonEventHandlers(this._cancel_btn, this.getCancelHandler());

    this.getElement().trigger('askbot.afterEditCommentFormAttached', [this, mode]);
};

EditCommentForm.prototype.getCounterUpdater = function () {
    //returns event handler
    var counter = this._text_counter;
    var editor = this._editor;
    var handler = function () {
        var maxCommentLength = askbot.data.maxCommentLength;
        var length = editor.getText().length;
        var length1 = maxCommentLength - 100;

        if (length1 < 0) {
            length1 = Math.round(0.7 * maxCommentLength);
        }
        var length2 = maxCommentLength - 30;
        if (length2 < 0) {
            length2 = Math.round(0.9 * maxCommentLength);
        }

        /* todo make smooth color transition, from gray to red
         * or rather - from start color to end color */
        var color = 'maroon';
        var chars = askbot.settings.minCommentBodyLength;
        var feedback = '';
        if (length === 0) {
            feedback = interpolate(gettext('enter at least %s characters'), [chars]);
        } else if (length < chars) {
            feedback = interpolate(gettext('enter at least %s more characters'), [chars - length]);
        } else {
            if (length > length2) {
                color = '#f00';
            } else if (length > length1) {
                color = '#f60';
            } else {
                color = '#999';
            }
            chars = maxCommentLength - length;
            feedback = '';
            if (chars > 0) {
                feedback = interpolate(gettext('%s characters left'), [chars]);
            } else {
                feedback = gettext('maximum comment length reached');
            }
        }
        counter.html(feedback);
        counter.css('color', color);
        return true;
    };
    return handler;
};

EditCommentForm.prototype.getCommentTruncator = function () {
    var me = this;
    return function () {
        var editor = me.getEditor();
        var text = editor.getText();
        var maxLength = askbot.data.maxCommentLength;
        if (text.length > maxLength) {
            text = text.substr(0, maxLength);
            editor.setText(text);
        }
    };
};

/**
 * @todo: clean up this method so it does just one thing
 */
EditCommentForm.prototype.canCancel = function () {
    if (this._element === null) {
        return true;
    }
    if (this._editor === undefined) {
        return true;
    }
    var ctext = this._editor.getText();
    if ($.trim(ctext) === $.trim(this._text)) {
        return true;
    } else if (this.confirmAbandon()) {
        return true;
    }
    this._editor.focus();
    return false;
};

EditCommentForm.prototype.getCancelHandler = function () {
    var me = this;
    return function (evt) {
        if (me.canCancel()) {
            var widget = me.getCommentsWidget();
            widget.handleDeletedComment();
            me.detach();
            evt.preventDefault();
            $(document).trigger('askbot.afterEditCommentFormCancel', [me]);
        }
        return false;
    };
};

EditCommentForm.prototype.detach = function () {
    if (this._comment === null) {
        return;
    }
    this._comment.getContainerWidget().showOpenEditorButton();
    if (this._comment.isBlank()) {
        this._comment.dispose();
    } else {
        this._comment.getElement().show();
    }
    this.reset();
    this._element = this._element.detach();

    this._editor.dispose();
    this._editor = undefined;

    removeButtonEventHandlers(this._submit_btn);
    removeButtonEventHandlers(this._cancel_btn);
};

EditCommentForm.prototype.createDom = function () {
    this._element = $('<form></form>');
    this._element.attr('class', 'post-comments');

    var div = $('<div></div>');
    this._element.append(div);

    /** a stub container for the editor */
    this._editorBox = div;
    /**
     * editor itself will live at this._editor
     * and will be initialized by the attachTo()
     */

    this._controlsBox = this.makeElement('div');
    this._controlsBox.addClass('edit-comment-buttons');
    div.append(this._controlsBox);

    this._text_counter = $('<span></span>').attr('class', 'counter');
    this._controlsBox.append(this._text_counter);

    this._submit_btn = $('<button></button>');
    addExtraCssClasses(this._submit_btn, 'primaryButtonClasses');
    this._controlsBox.append(this._submit_btn);
    this._cancel_btn = $('<button class="cancel"></button>');
    addExtraCssClasses(this._cancel_btn, 'cancelButtonClasses');
    this._cancel_btn.html(gettext('cancel'));
    this._controlsBox.append(this._cancel_btn);

    //if email alerts are enabled, add a checkbox "suppress_email"
    if (askbot.settings.enableEmailAlerts === true) {
        this._minorEditBox = this.makeElement('div');
        this._minorEditBox.addClass('checkbox');
        this._controlsBox.append(this._minorEditBox);
        var checkBox = this.makeElement('input');
        checkBox.attr('type', 'checkbox');
        checkBox.attr('name', 'suppress_email');
        checkBox.attr('id', 'suppress_email');
        this._minorEditBox.append(checkBox);
        var label = this.makeElement('label');
        label.attr('for', 'suppress_email');
        label.html(gettext('minor edit (don\'t send alerts)'));
        this._minorEditBox.append(label);
    }

};

EditCommentForm.prototype.isEnabled = function () {
    return (this._submit_btn.attr('disabled') !== 'disabled');//confusing! setters use boolean
};

EditCommentForm.prototype.enableForm = function () {
    this._submit_btn.attr('disabled', false);
    this._cancel_btn.attr('disabled', false);
};

EditCommentForm.prototype.disableForm = function () {
    this._submit_btn.attr('disabled', true);
    this._cancel_btn.attr('disabled', true);
};

EditCommentForm.prototype.reset = function () {
    this._comment = null;
    this._text = '';
    this._editor.setText('');
    this.enableForm();
};

EditCommentForm.prototype.confirmAbandon = function () {
    this._editor.focus();
    this._editor.getElement().scrollTop();
    this._editor.setHighlight(true);
    var answer = confirm(
        gettext('Are you sure you don\'t want to post this comment?')
    );
    this._editor.setHighlight(false);
    return answer;
};

EditCommentForm.prototype.getSuppressEmail = function () {
    return this._element.find('input[name="suppress_email"]').is(':checked');
};

EditCommentForm.prototype.setSuppressEmail = function (bool) {
    this._element.find('input[name="suppress_email"]').prop('checked', bool).trigger('change');
};

EditCommentForm.prototype.updateUserPostsData = function(json) {
    //add any posts by the user to the list
    var data = askbot.data.user_posts;
    $.each(json, function(idx, item) {
        if (item.user_id === askbot.data.userId && !data[item.id]) {
            data[item.id] = 1;
        }
    });
};

EditCommentForm.prototype.getSaveHandler = function () {
    var me = this;
    var editor = this._editor;
    return function () {
        var commentData, timestamp, userName;
        if (me.isEnabled() === false) {//prevent double submits
            return false;
        }
        me.disableForm();

        var text = editor.getText();
        if (text.length < askbot.settings.minCommentBodyLength) {
            editor.focus();
            me.enableForm();
            return false;
        }

        //display the comment and show that it is not yet saved
        me.hide();
        me._comment.getElement().show();
        commentData = me._comment.getData();
        timestamp = commentData.comment_added_at || gettext('just now');
        if (me._comment.isBlank()) {
            userName = askbot.data.userName;
        } else {
            userName = commentData.user_display_name;
        }

        me._comment.setContent({
            'html': editor.getHtml(),
            'text': text,
            'user_display_name': userName,
            'comment_added_at': timestamp,
            'user_profile_url': askbot.data.userProfileUrl,
            'user_avatar_url': askbot.data.userCommentAvatarUrl
        });
        me._comment.setDraftStatus(true);
        var postCommentsWidget = me._comment.getContainerWidget();
        if (postCommentsWidget.canAddComment()) {
            postCommentsWidget.showOpenEditorButton();
        }
        var commentsElement = postCommentsWidget.getElement();
        commentsElement.trigger('askbot.beforeCommentSubmit');

        var post_data = {
            comment: text,
            avatar_size: askbot.settings.commentAvatarSize
        };

        if (me._type === 'edit') {
            post_data.comment_id = me._comment.getId();
            post_url = askbot.urls.editComment;
            post_data.suppress_email = me.getSuppressEmail();
            me.setSuppressEmail(false);
        } else {
            post_data.post_type = me._comment.getParentType();
            post_data.post_id = me._comment.getParentId();
            post_url = askbot.urls.postComments;
        }

        $.ajax({
            type: 'POST',
            url: post_url,
            dataType: 'json',
            data: post_data,
            success: function (json) {
                //type is 'edit' or 'add'
                me._comment.setDraftStatus(false);
                if (me._type === 'add') {
                    me._comment.dispose();
                    me.updateUserPostsData(json);
                    me._comment.getContainerWidget().reRenderComments(json);
                } else {
                    me._comment.setContent(json);
                }
                me.detach();
                commentsElement.trigger('askbot.afterCommentSubmitSuccess');
            },
            error: function (xhr, textStatus) {
                me._comment.getElement().show();
                showMessage(me._comment.getElement(), xhr.responseText, 'after');
                me._comment.setDraftStatus(false);
                me.detach();
                me.enableForm();
                commentsElement.trigger('askbot.afterCommentSubmitError');
            }
        });
        return false;
    };
};

var Comment = function (widget, data) {
    WrappedElement.call(this);
    this._container_widget = widget;
    this._data = data || {};
    this._element = null;
    this._is_convertible = askbot.data.userIsAdminOrMod;
    this.convert_link = null;
    this._delete_prompt = gettext('delete this comment');
    this._editorForm = undefined;
    if (data && data.is_deletable) {
        this._deletable = data.is_deletable;
    } else {
        this._deletable = false;
    }
    if (data && data.is_editable) {
        this._editable = data.is_deletable;
    } else {
        this._editable = false;
    }
};
inherits(Comment, WrappedElement);

Comment.prototype.getData = function () {
    return this._data;
};

Comment.prototype.startEditing = function () {
    var form = this._editorForm || new EditCommentForm();
    this._editorForm = form;
    // if new comment:
    if (this.isBlank()) {
        form.attachTo(this, 'add');
    } else {
        form.attachTo(this, 'edit');
    }
    form.show();
};

Comment.prototype.decorate = function (element) {
    this._element = $(element);
    var parent_type = this._element.closest('.comments').data('parentPostType');
    var comment_id = this._element.data('postId') || undefined;
    this._data = {'id': comment_id};

    this._contentBox = this._element.find('.comment-content');

    var timestamp = this._element.find('.timeago');
    this._dateElement = timestamp;
    this._data.comment_added_at = timestamp.attr('title');
    var userLink = this._element.find('.author');
    this._data.user_display_name = userLink.html();
    // @todo: read other data

    var commentBody = this._element.find('.comment-body');
    if (commentBody.length > 0) {
        this._comment_body = commentBody;
    }

    var delete_img = this._element.find('.js-delete-icon');
    if (delete_img.length > 0) {
        this._deletable = true;
        this._delete_icon = new DeleteIcon(this.deletePrompt);
        this._delete_icon.setHandler(this.getDeleteHandler());
        this._delete_icon.decorate(delete_img);
    }
    var edit_link = this._element.find('.js-edit');
    if (edit_link.length > 0) {
        this._editable = true;
        this._edit_link = new EditLink();
        this._edit_link.setHandler(this.getEditHandler());
        this._edit_link.decorate(edit_link);
    }

    var convert_link = this._element.find('.convert-comment');
    if (this._is_convertible) {
        this._convert_link = new CommentConvertLink(comment_id);
        this._convert_link.decorate(convert_link);
    } else {
        convert_link.remove();
    }

    var deleter = this._element.find('.comment-delete');
    if (deleter.length > 0) {
        this._comment_delete = deleter;
    }

    var vote = new CommentVoteButton(this);
    vote.decorate(this._element.find('.upvote'));
    this._voteButton = vote;

    this._userLink = this._element.find('.author');

    this._element.trigger('askbot.afterCommentDecorate', [this]);
};

Comment.prototype.setDraftStatus = function (isDraft) {
    return;
    //@todo: implement nice feedback about posting in progress
    //maybe it should be an element that lasts at least a second
    //to avoid the possible brief flash
    // if (isDraft === true) {
    //     this._normalBackground = this._element.css('background');
    //     this._element.css('background', 'rgb(255, 243, 195)');
    // } else {
    //     this._element.css('background', this._normalBackground);
    // }
};


Comment.prototype.isBlank = function () {
    return this.getId() === undefined;
};

Comment.prototype.getId = function () {
    return this._data ? this._data.id : undefined;
};

Comment.prototype.hasContent = function () {
    return ('id' in this._data);
    //shortcut for 'user_profile_url' 'html' 'user_display_name' 'comment_age'
};

Comment.prototype.hasText = function () {
    return ('text' in this._data);
};

Comment.prototype.getContainerWidget = function () {
    return this._container_widget;
};

Comment.prototype.getParentType = function () {
    return this._container_widget.getPostType();
};

Comment.prototype.getParentId = function () {
    return this._container_widget.getPostId();
};

/**
 * this function is basically an "updateDom"
 */
Comment.prototype.setContent = function (data) {
    this._data = $.extend(this._data, data);
    data = this._data;
    this._element.data('postId', data.id);
    this._element.attr('data-post-id', data.id);
    this._element.attr('id', 'post-id-' + data.id);

    // 1) create the votes element if it is not there
    var vote = this._voteButton;
    vote.setVoted(data.upvoted_by_user);
    vote.setScore(data.score);

    // 2) maybe adjust deletable status
    //set id of the comment deleter
    if (data.id) {
        var deleter = this._element.find('.comment-delete');
        deleter.attr('id', 'post-' + data.id.toString() + '-delete');
    }

    // 3) set the comment html
    if (EditCommentForm.prototype.getEditorType() === 'tinymce') {
        var theComment = $('<div/>');
        theComment.html(data.html);
        //sanitize, just in case
        this._comment_body.empty();
        this._comment_body.append(theComment);
        this._data.text = data.html;
    } else {
        this._comment_body.empty();
        this._comment_body.html(data.html);
    }

    // 4) update user info
    this._userLink.attr('href', data.user_profile_url);
    this._userLink.html(data.user_display_name);

    // 5) update avatar
    var avatar = this._element.find('.js-avatar-box');
    if (avatar.length) {
        avatar.attr('href', data.user_profile_url);
        var img = avatar.find('.js-avatar');
        img.attr('src', decodeHtml(data.user_avatar_url));//with decoded &amp;
    }

    // 6) update the timestamp
    this._dateElement.html(data.comment_added_at);
    this._dateElement.attr('title', data.comment_added_at);
    this._dateElement.timeago();

    // 7) set comment score
    if (data.score) {
        var votes = this._element.find('.js-score');
        votes.text(data.score);
        votes.attr('id', 'comment-img-upvote-' + data.id.toString());
    }

    // 8) possibly add edit link
    if (this._editable) {
        var oldEditLink = this._edit_link;
        this._edit_link = new EditLink();
        this._edit_link.setHandler(this.getEditHandler());
        oldEditLink.getElement().replaceWith(this._edit_link.getElement());
        oldEditLink.dispose();
    }

    if (this._is_convertible) {
        var oldConvertLink = this._convert_link;
        this._convert_link = new CommentConvertLink(this._data.id);
        oldConvertLink.getElement().replaceWith(this._convert_link.getElement());
        //this has to be here, because if we trigger events inside of the
        //CommentConvertLink functions since the element is not yet in the dom we
        //will never catch the event
        this._convert_link.getElement().trigger('askbot.afterCommentConvertLinkInserted', [this._convert_link]);
        oldConvertLink.dispose();
    }
    //maybe hide edit/delete buttons
    if (data.id) {
        askbot['functions']['renderPostControls'](data.id.toString());
        askbot['functions']['renderPostVoteButtons']('comment', data.id.toString());
    }
    if (askbot.settings.mathjaxEnabled === true) {
        runMathJax();
    }
    this._element.trigger('askbot.afterCommentSetData', [this, data]);
};

Comment.prototype.dispose = function () {
    if (this._comment_body) {
        this._comment_body.remove();
    }
    if (this._comment_delete) {
        this._comment_delete.remove();
    }
    if (this._user_link) {
        this._user_link.remove();
    }
    if (this._comment_added_at) {
        this._comment_added_at.remove();
    }
    if (this._delete_icon) {
        this._delete_icon.dispose();
    }
    if (this._edit_link) {
        this._edit_link.dispose();
    }
    if (this._convert_link) {
        this._convert_link.dispose();
    }
    this._data = null;
    Comment.superClass_.dispose.call(this);
};

Comment.prototype.getElement = function () {
    Comment.superClass_.getElement.call(this);
    if (this.isBlank() && this.hasContent()) {
        this.setContent();
    }
    return this._element;
};

Comment.prototype.loadText = function (on_load_handler) {
    var me = this;
    $.ajax({
        type: 'GET',
        url: askbot.urls.getComment,
        data: {id: this._data.id},
        success: function (json) {
            if (json.success) {
                me._data.text = json.text;
                on_load_handler();
            } else {
                showMessage(me.getElement(), json.message, 'after');
            }
        },
        error: function (xhr, textStatus, exception) {
            showMessage(me.getElement(), xhr.responseText, 'after');
        }
    });
};

Comment.prototype.getText = function () {
    if (!this.isBlank()) {
        if ('text' in this._data) {
            return this._data.text;
        }
    }
    return '';
};

Comment.prototype.getEditHandler = function () {
    var me = this;
    return function () {
        if (me.hasText()) {
            me.startEditing();
        } else {
            me.loadText(function () { me.startEditing(); });
        }
    };
};

Comment.prototype.getDeleteHandler = function () {
    var comment = this;
    var del_icon = this._delete_icon;
    return function () {
        if (confirm(gettext('confirm delete comment'))) {
            //comment.getElement().hide();
            $.ajax({
                type: 'POST',
                url: askbot.urls.deleteComment,
                data: {
                    comment_id: comment.getId(),
                    avatar_size: askbot.settings.commentAvatarSize
                },
                success: function (json, textStatus, xhr) {
                    var widget = comment.getContainerWidget();
                    comment.dispose();
                    widget.handleDeletedComment();
                },
                error: function (xhr, textStatus, exception) {
                    comment.getElement().show();
                    showMessage(del_icon.getElement(), xhr.responseText);
                },
                dataType: 'json'
            });
        }
    };
};

var PostCommentsWidget = function () {
    WrappedElement.call(this);
    this._denied = false;
};
inherits(PostCommentsWidget, WrappedElement);

PostCommentsWidget.prototype.decorate = function (element) {
    this._element = element;
    this._post_id = element.data('parentPostId');
    this._post_type = element.data('parentPostType');
    //var widget_id = element.attr('id');
    //this._userCanPost = askbot['data'][widget_id]['can_post'];
    this._commentsReversed = askbot.settings.commentsReversed;

    //see if user can comment here
    this._loadCommentsButton = element.find('.js-load-comments-btn');

    if (this._loadCommentsButton.length) {
        if (this._commentsReversed/* || this._userCanPost */) {
            setupButtonEventHandlers(
                this._loadCommentsButton,
                this.getLoadCommentsHandler()
            );
        } else {
            setupButtonEventHandlers(
                this._loadCommentsButton,
                this.getAllowEditHandler()
            );
        }
    }

    this._openEditorButton = element.find('.js-open-editor-btn');
    if (this._openEditorButton.length) {
        setupButtonEventHandlers(
            this._openEditorButton,
            this.getOpenEditorHandler(this._openEditorButton)
        );
    }

    this._isTruncated = this._openEditorButton.hasClass('hidden');

    this._cbox = element.find('.content');
    var comments = [];
    var me = this;
    this._cbox.children('.comment').each(function (index, element) {
        var comment = new Comment(me);
        comments.push(comment);
        comment.decorate(element);
    });
    this._comments = comments;
};

PostCommentsWidget.prototype.handleDeletedComment = function () {
    /* if the widget does not have any comments, set
    the 'empty' class on the widget element */
    if (this._cbox.children('.comment').length === 0) {
        if (this._commentsReversed === false) {
            this._element.siblings('.comment-title').hide();
        }
        this._element.addClass('empty');
    }
};

PostCommentsWidget.prototype.getPostType = function () {
    return this._post_type;
};

PostCommentsWidget.prototype.getPostId = function () {
    return this._post_id;
};

PostCommentsWidget.prototype.getLoadCommentsButton = function () {
    return this._loadCommentsButton;
};

PostCommentsWidget.prototype.getOpenEditorButton = function () {
    return this._openEditorButton;
};

PostCommentsWidget.prototype.hideOpenEditorButton = function () {
    this._openEditorButton.hide();
    this._openEditorButton.addClass('hidden');
};

PostCommentsWidget.prototype.showOpenEditorButton = function () {
    this._openEditorButton.show();
    this._openEditorButton.removeClass('hidden');
};

PostCommentsWidget.prototype.startNewComment = function () {
    //find comment template, clone it's dom
    var comment = new Comment(this);
    var commentElem = getTemplate('.js-comment');
    if (this._commentsReversed) {
        this._cbox.prepend(commentElem);
    } else {
        this._cbox.append(commentElem);
    }
    comment.decorate(commentElem);
    this._element.removeClass('empty');
    this._element.trigger('askbot.beforeCommentStart');
    comment.startEditing();
};

PostCommentsWidget.prototype.canAddComment = function () {
    return this._commentsReversed || this._isTruncated === false;
};

PostCommentsWidget.prototype.userCanPost = function () {
    var data = askbot.data;
    if (data.userIsAuthenticated) {
        //true if admin, post owner or high rep user
        if (data.userIsAdminOrMod) {
            return true;
        } else if (this.getPostId() in data.user_posts) {
            return true;
        }
    }
    return false;
};

PostCommentsWidget.prototype.getAllowEditHandler = function () {
    var me = this;
    return function () {
        me.reloadAllComments(function (json) {
            me.reRenderComments(json);
            //2) change button text to "post a comment"
            me.getLoadCommentsButton().remove();
            me.showOpenEditorButton();
        });
    };
};

PostCommentsWidget.prototype.getOpenEditorHandler = function (button) {
    var me = this;
    return function () {
        //if user can't post, we tell him something and refuse
        var message;
        if (askbot.settings.readOnlyModeEnabled === true) {
            message = askbot.messages.readOnlyMessage;
            showMessage(button, message, 'after');
        } else if (askbot.data.userIsAuthenticated) {
            me.startNewComment();
        } else {
            message = gettext(
                'please sign in or register to post comments'
            );
            showMessage(button, message, 'after');
        }
    };
};

PostCommentsWidget.prototype.getLoadCommentsHandler = function () {
    var me = this;
    return function () {
        me.reloadAllComments(function (json) {
            me.reRenderComments(json);
            me.getLoadCommentsButton().remove();
        });
    };
};


PostCommentsWidget.prototype.reloadAllComments = function (callback) {
    var post_data = {
        post_id: this._post_id,
        post_type: this._post_type,
        avatar_size: askbot.settings.commentAvatarSize
    };
    var me = this;
    $.ajax({
        type: 'GET',
        url: askbot.urls.postComments,
        data: post_data,
        success: function (json) {
            callback(json);
            me._isTruncated = false;
        },
        dataType: 'json'
    });
};

PostCommentsWidget.prototype.reRenderComments = function (json) {
    var me = this;
    me._cbox.trigger('askbot.beforeReRenderComments', [this, json]);
    $.each(this._comments, function (i, item) {
        item.dispose();
    });
    this._comments = [];
    $.each(json, function (i, item) {
        var comment = new Comment(me);
        var commentElem = getTemplate('.js-comment');
        me._cbox.append(commentElem);
        comment.decorate(commentElem);
        comment.setContent(item);
        me._comments.push(comment);
    });
    me._cbox.trigger('askbot.afterReRenderComments', [this, json]);
};


var socialSharing = (function () {

    var SERVICE_DATA = {
        //url - template for the sharing service url, params are for the popup
        identica: {
            url: 'http://identi.ca/notice/new?status_textarea={TEXT}%20{URL}',
            params: 'width=820, height=526,toolbar=1,status=1,resizable=1,scrollbars=1'
        },
        twitter: {
            url: 'http://twitter.com/share?url={URL}&ref=twitbtn&text={TEXT}',
            params: 'width=820,height=526,toolbar=1,status=1,resizable=1,scrollbars=1'
        },
        facebook: {
            url: 'http://www.facebook.com/sharer.php?u={URL}&ref=fbshare&t={TEXT}',
            params: 'width=630,height=436,toolbar=1,status=1,resizable=1,scrollbars=1'
        },
        linkedin: {
            url: 'http://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TEXT}',
            params: 'width=630,height=436,toolbar=1,status=1,resizable=1,scrollbars=1'
        }
    };
    var URL = '';
    var TEXT = '';

    var share_page = function (service_name) {
        if (SERVICE_DATA[service_name]) {
            var url = SERVICE_DATA[service_name].url;
            url = url.replace('{TEXT}', TEXT);
            url = url.replace('{URL}', URL);
            var params = SERVICE_DATA[service_name].params;
            if (!window.open(url, 'sharing', params)) {
                window.location.href = url;
            }
            return false;
            //@todo: change to some other url shortening service
            // $.ajax({
            //     url: "http://json-tinyurl.appspot.com/?&callback=?",
            //     dataType: 'json',
            //     data: {'url':URL},
            //     success: function (data) {
            //         url = url.replace('{URL}', data.tinyurl);
            //     },
            //     error: function (xhr, opts, error) {
            //         url = url.replace('{URL}', URL);
            //     },
            //     complete: function (data) {
            //         url = url.replace('{TEXT}', TEXT);
            //         var params = SERVICE_DATA[service_name].params;
            //         if (!window.open(url, "sharing", params)) {
            //             window.location.href=url;
            //         }
            //     }
            // });
        }
    };

    return {
        init: function () {
            URL = window.location.href;
            var urlBits = URL.split('/');
            URL = urlBits.slice(0, -2).join('/') + '/';
            TEXT = encodeURIComponent($('h1 > a').text());
            var hashtag = encodeURIComponent(
                                askbot.settings.sharingSuffixText
                            );
            TEXT = TEXT.substr(0, 134 - URL.length - hashtag.length);
            TEXT = TEXT + '... ' + hashtag;
            var fb = $('a.facebook-share');
            var tw = $('a.twitter-share');
            var ln = $('a.linkedin-share');
            var ica = $('a.identica-share');
            copyAltToTitle(fb);
            copyAltToTitle(tw);
            copyAltToTitle(ln);
            copyAltToTitle(ica);
            setupButtonEventHandlers(fb, function () { share_page('facebook'); });
            setupButtonEventHandlers(tw, function () { share_page('twitter'); });
            setupButtonEventHandlers(ln, function () { share_page('linkedin'); });
            setupButtonEventHandlers(ica, function () { share_page('identica'); });
        }
    };
})();

/**
 * @constructor
 * @todo: change this to generic object description editor
 */
var TagWikiEditor = function () {
    WrappedElement.call(this);
    this._state = 'display';//'edit' or 'display'
    this._content_backup  = '';
    this._is_editor_loaded = false;
    this._enabled_editor_buttons = null;
    this._previewerEnabled = false;
};
inherits(TagWikiEditor, WrappedElement);

TagWikiEditor.prototype.backupContent = function () {
    this._content_backup = this._content_box.contents();
};

TagWikiEditor.prototype.setEnabledEditorButtons = function (buttons) {
    this._enabled_editor_buttons = buttons;
};

TagWikiEditor.prototype.setPreviewerEnabled = function (state) {
    this._previewerEnabled = state;
    if (this.isEditorLoaded()) {
        this._editor.setPreviewerEnabled(this._previewerEnabled);
    }
};

TagWikiEditor.prototype.setContent = function (content) {
    this._content_box.empty();
    this._content_box.append(content);
};

TagWikiEditor.prototype.setState = function (state) {
    if (state === 'edit') {
        this._state = state;
        this._edit_btn.hide();
        this._cancel_btn.show();
        this._save_btn.show();
        this._cancel_sep.show();
    } else if (state === 'display') {
        this._state = state;
        this._edit_btn.show();
        this._cancel_btn.hide();
        this._cancel_sep.hide();
        this._save_btn.hide();
    }
};

TagWikiEditor.prototype.restoreContent = function () {
    var content_box = this._content_box;
    content_box.empty();
    $.each(this._content_backup, function (idx, element) {
        content_box.append(element);
    });
};

TagWikiEditor.prototype.getTagId = function () {
    return this._tag_id;
};

TagWikiEditor.prototype.isEditorLoaded = function () {
    return this._is_editor_loaded;
};

TagWikiEditor.prototype.setEditorLoaded = function () {
    this._is_editor_loaded = true;
    return true;
};

/**
 * loads initial data for the editor input and activates
 * the editor
 */
TagWikiEditor.prototype.startActivatingEditor = function () {
    var editor = this._editor;
    var me = this;
    var data = {
        object_id: me.getTagId(),
        model_name: 'Group'
    };
    $.ajax({
        type: 'GET',
        url: askbot.urls.load_object_description,
        data: data,
        cache: false,
        success: function (data) {
            me.backupContent();
            editor.setText(data);
            me.setContent(editor.getElement());
            me.setState('edit');
            if (me.isEditorLoaded() === false) {
                editor.start();
                me.setEditorLoaded();
            }
        }
    });
};

TagWikiEditor.prototype.saveData = function () {
    var me = this;
    var text = this._editor.getText();
    var data = {
        object_id: me.getTagId(),
        model_name: 'Group',//todo: fixme
        text: text
    };
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: askbot.urls.save_object_description,
        data: data,
        cache: false,
        success: function (data) {
            if (data.success) {
                me.setState('display');
                me.setContent(data.html);
            } else {
                showMessage(me.getElement(), data.message);
            }
        }
    });
};

TagWikiEditor.prototype.cancelEdit = function () {
    this.restoreContent();
    this.setState('display');
};

TagWikiEditor.prototype.decorate = function (element) {
    //expect <div id='group-wiki-{{id}}'><div class="content"/><a class="edit"/></div>
    this._element = element;
    var edit_btn = element.find('.edit-description');
    this._edit_btn = edit_btn;

    //adding two buttons...
    var save_btn = this.makeElement('a');
    save_btn.html(gettext('save'));
    edit_btn.after(save_btn);
    save_btn.hide();
    this._save_btn = save_btn;

    var cancel_btn = this.makeElement('a');
    cancel_btn.html(gettext('cancel'));
    save_btn.after(cancel_btn);
    cancel_btn.hide();
    this._cancel_btn = cancel_btn;

    this._cancel_sep = $('<span> | </span>');
    cancel_btn.before(this._cancel_sep);
    this._cancel_sep.hide();

    this._content_box = element.find('.content');
    this._tag_id = element.attr('id').split('-').pop();

    var me = this;
    var editor;
    if (askbot.settings.editorType === 'markdown') {
        editor = new WMD({minLines: 3});
    } else {
        editor = new TinyMCE({//override defaults
            theme_advanced_buttons1: 'bold, italic, |, link, |, numlist, bullist',
            theme_advanced_buttons2: '',
            theme_advanced_path: false,
            plugins: ''
        });
    }
    if (this._enabled_editor_buttons) {
        editor.setEnabledButtons(this._enabled_editor_buttons);
    }
    editor.setPreviewerEnabled(this._previewerEnabled);
    this._editor = editor;
    setupButtonEventHandlers(edit_btn, function () { me.startActivatingEditor(); });
    setupButtonEventHandlers(cancel_btn, function () {me.cancelEdit(); });
    setupButtonEventHandlers(save_btn, function () {me.saveData(); });
};

var ImageChanger = function () {
    WrappedElement.call(this);
    this._image_element = undefined;
    this._delete_button = undefined;
    this._save_url = undefined;
    this._delete_url = undefined;
    this._messages = undefined;
};
inherits(ImageChanger, WrappedElement);

ImageChanger.prototype.setImageElement = function (image_element) {
    this._image_element = image_element;
};

ImageChanger.prototype.setMessages = function (messages) {
    this._messages = messages;
};

ImageChanger.prototype.setDeleteButton = function (delete_button) {
    this._delete_button = delete_button;
};

ImageChanger.prototype.setSaveUrl = function (url) {
    this._save_url = url;
};

ImageChanger.prototype.setDeleteUrl = function (url) {
    this._delete_url = url;
};

ImageChanger.prototype.setAjaxData = function (data) {
    this._ajax_data = data;
};

ImageChanger.prototype.showImage = function (image_url) {
    this._image_element.attr('src', image_url);
    this._image_element.show();
};

ImageChanger.prototype.deleteImage = function () {
    this._image_element.attr('src', '');
    this._image_element.css('display', 'none');

    var me = this;
    var delete_url = this._delete_url;
    var data = this._ajax_data;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: delete_url,
        data: data,
        cache: false,
        success: function (data) {
            if (data.success) {
                showMessage(me.getElement(), data.message, 'after');
            }
        }
    });
};

ImageChanger.prototype.saveImageUrl = function (image_url) {
    var me = this;
    var data = this._ajax_data;
    data.image_url = image_url;
    var save_url = this._save_url;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: save_url,
        data: data,
        cache: false,
        success: function (data) {
            if (!data.success) {
                showMessage(me.getElement(), data.message, 'after');
            }
        }
    });
};

ImageChanger.prototype.startDialog = function () {
    //reusing the wmd's file uploader
    var me = this;
    var change_image_text = this._messages.change_image;
    var change_image_button = this._element;
    Attacklab.Util.prompt(
        '<h3>' + gettext('Enter the logo url or upload an image') + '</h3>',
        'http://',
        function (image_url) {
            if (image_url) {
                me.saveImageUrl(image_url);
                me.showImage(image_url);
                change_image_button.html(change_image_text);
                me.showDeleteButton();
            }
        },
        'image'
    );
};

ImageChanger.prototype.showDeleteButton = function () {
    this._delete_button.show();
    this._delete_button.prev().show();
};

ImageChanger.prototype.hideDeleteButton = function () {
    this._delete_button.hide();
    this._delete_button.prev().hide();
};


ImageChanger.prototype.startDeleting = function () {
    if (confirm(gettext('Do you really want to remove the image?'))) {
        this.deleteImage();
        this._element.html(this._messages.add_image);
        this.hideDeleteButton();
        this._delete_button.hide();
        var sep = this._delete_button.prev();
        sep.hide();
    }
};

/**
 * decorates an element that will serve as the image changer button
 */
ImageChanger.prototype.decorate = function (element) {
    this._element = element;
    var me = this;
    setupButtonEventHandlers(
        element,
        function () {
            me.startDialog();
        }
    );
    setupButtonEventHandlers(
        this._delete_button,
        function () {
            me.startDeleting();
        }
    );
};

var UserGroupProfileEditor = function () {
    TagWikiEditor.call(this);
};
inherits(UserGroupProfileEditor, TagWikiEditor);

UserGroupProfileEditor.prototype.toggleEmailModeration = function () {
    var btn = this._moderate_email_btn;
    var group_id = this.getTagId();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        cache: false,
        data: {group_id: group_id},
        url: askbot.urls.toggle_group_email_moderation,
        success: function (data) {
            if (data.success) {
                btn.html(data.new_button_text);
            } else {
                showMessage(btn, data.message);
            }
        }
    });
};

UserGroupProfileEditor.prototype.decorate = function (element) {
    this.setEnabledEditorButtons('bold italic link ol ul');
    this.setPreviewerEnabled(false);
    UserGroupProfileEditor.superClass_.decorate.call(this, element);
    var change_logo_btn = element.find('.change-logo');
    this._change_logo_btn = change_logo_btn;

    var moderate_email_toggle = new AjaxToggle();
    moderate_email_toggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'moderate_email'
    });
    var moderate_email_btn = element.find('#moderate-email');
    this._moderate_email_btn = moderate_email_btn;
    moderate_email_toggle.decorate(moderate_email_btn);

    var moderate_publishing_replies_toggle = new AjaxToggle();
    moderate_publishing_replies_toggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'moderate_answers_to_enquirers'
    });
    var btn = element.find('#moderate-answers-to-enquirers');
    moderate_publishing_replies_toggle.decorate(btn);

    var vip_toggle = new AjaxToggle();
    vip_toggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'is_vip'
    });
    btn = element.find('#vip-toggle');
    vip_toggle.decorate(btn);

    var readOnlyToggle = new AjaxToggle();
    readOnlyToggle.setPostData({
        group_id: this.getTagId(),
        property_name: 'read_only'
    });
    btn = element.find('#read-only-toggle');
    readOnlyToggle.decorate(btn);

    var opennessSelector = new DropdownSelect();
    var selectorElement = element.find('#group-openness-selector');
    opennessSelector.setPostData({
        group_id: this.getTagId(),
        property_name: 'openness'
    });
    opennessSelector.decorate(selectorElement);

    var email_editor = new TextPropertyEditor();
    email_editor.decorate(element.find('#preapproved-emails'));

    var domain_editor = new TextPropertyEditor();
    domain_editor.decorate(element.find('#preapproved-email-domains'));

    var logo_changer = new ImageChanger();
    logo_changer.setImageElement(element.find('.group-logo'));
    logo_changer.setAjaxData({
        group_id: this.getTagId()
    });
    logo_changer.setSaveUrl(askbot.urls.save_group_logo_url);
    logo_changer.setDeleteUrl(askbot.urls.delete_group_logo_url);
    logo_changer.setMessages({
        change_image: gettext('change logo'),
        add_image: gettext('add logo')
    });
    var delete_logo_btn = element.find('.delete-logo');
    logo_changer.setDeleteButton(delete_logo_btn);
    logo_changer.decorate(change_logo_btn);
};

var GroupJoinButton = function () {
    AjaxToggle.call(this);
};
inherits(GroupJoinButton, AjaxToggle);

GroupJoinButton.prototype.getPostData = function () {
    return { group_id: this._group_id };
};

GroupJoinButton.prototype.getHandler = function () {
    var me = this;
    return function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            cache: false,
            data: me.getPostData(),
            url: askbot.urls.join_or_leave_group,
            success: function (data) {
                if (data.success) {
                    var level = data.membership_level;
                    var new_state = 'off-state';
                    if (level === 'full' || level === 'pending') {
                        new_state = 'on-state';
                    }
                    me.setState(new_state);
                } else {
                    showMessage(me.getElement(), data.message);
                }
            }
        });
    };
};
GroupJoinButton.prototype.decorate = function (elem) {
    GroupJoinButton.superClass_.decorate.call(this, elem);
    this._group_id = this._element.data('groupId');
};

var TagEditor = function () {
    WrappedElement.call(this);
    this._has_hot_backspace = false;
    this._settings = JSON.parse(askbot.settings.tag_editor);
};
inherits(TagEditor, WrappedElement);

TagEditor.prototype.getSelectedTags = function () {
    return $.trim(this._hidden_tags_input.val()).split(/\s+/);
};

TagEditor.prototype.setSelectedTags = function (tag_names) {
    this._hidden_tags_input.val($.trim(tag_names.join(' ')));
};

TagEditor.prototype.addSelectedTag = function (tag_name) {
    var tag_names = this._hidden_tags_input.val();
    this._hidden_tags_input.val(tag_names + ' ' + tag_name);
    $('.acResults').hide();//a hack to hide the autocompleter
};

TagEditor.prototype.isSelectedTagName = function (tag_name) {
    var tag_names = this.getSelectedTags();
    return $.inArray(tag_name, tag_names) !== -1;
};

TagEditor.prototype.removeSelectedTag = function (tag_name) {
    var tag_names = this.getSelectedTags();
    var idx = $.inArray(tag_name, tag_names);
    if (idx !== -1) {
        tag_names.splice(idx, 1);
    }
    this.setSelectedTags(tag_names);
};

TagEditor.prototype.getTagDeleteHandler = function (tag) {
    var me = this;
    return function () {
        me.removeSelectedTag(tag.getName());
        me.clearErrorMessage();
        var li = tag.getElement().parent();
        tag.dispose();
        li.remove();
        $('.acResults').hide();//a hack to hide the autocompleter
        me.fixHeight();
    };
};

TagEditor.prototype.cleanTag = function (tag_name, reject_dupe) {
    tag_name = $.trim(tag_name);
    tag_name = tag_name.replace(/\s+/, ' ');

    var force_lowercase = this._settings.force_lowercase_tags;
    if (force_lowercase) {
        tag_name = tag_name.toLowerCase();
    }

    if (reject_dupe && this.isSelectedTagName(tag_name)) {
        throw interpolate(
            gettext('tag "%s" was already added, no need to repeat (press "escape" to delete)'),
            [tag_name]
        );
    }

    var max_tags = this._settings.max_tags_per_post;
    if (this.getSelectedTags().length + 1 > max_tags) {//count current
        throw interpolate(
            ngettext(
                'a maximum of %s tag is allowed',
                'a maximum of %s tags are allowed',
                max_tags
            ),
            [max_tags]
        );
    }

    //generic cleaning
    return cleanTag(tag_name, this._settings);
};

TagEditor.prototype.addTag = function (tag_name) {
    var tag = new Tag();
    tag.setName(tag_name);
    tag.setDeletable(true);
    tag.setLinkable(true);
    tag.setDeleteHandler(this.getTagDeleteHandler(tag));
    var li = this.makeElement('li');
    this._tags_container.append(li);
    li.append(tag.getElement());
    this.addSelectedTag(tag_name);
};

TagEditor.prototype.immediateClearErrorMessage = function () {
    this._error_alert.html('');
    this._error_alert.show();
    //this._element.css('margin-top', '18px');//todo: the margin thing is a hack
};

TagEditor.prototype.clearErrorMessage = function (fade) {
    if (fade) {
        var me = this;
        this._error_alert.fadeOut(function () {
            me.immediateClearErrorMessage();
        });
    } else {
        this.immediateClearErrorMessage();
    }
};

TagEditor.prototype.setErrorMessage = function (text) {
    var old_text = this._error_alert.html();
    this._error_alert.html(text);
    if (old_text === '') {
        this._error_alert.hide();
        this._error_alert.fadeIn(100);
    }
    //this._element.css('margin-top', '0');//todo: remove this hack
};

TagEditor.prototype.getAddTagHandler = function () {
    var me = this;
    return function (tag_name) {
        if (me.isSelectedTagName(tag_name)) {
            return;
        }
        try {
            var clean_tag_name = me.cleanTag($.trim(tag_name));
            me.addTag(clean_tag_name);
            me.clearNewTagInput();
            me.fixHeight();
        } catch (error) {
            me.setErrorMessage(error);
            setTimeout(function () {
                me.clearErrorMessage(true);
            }, 1000);
        }
    };
};

TagEditor.prototype.getRawNewTagValue = function () {
    return this._visible_tags_input.val();//without trimming
};

TagEditor.prototype.clearNewTagInput = function () {
    return this._visible_tags_input.val('');
};

TagEditor.prototype.editLastTag = function () {
    //delete rendered tag
    var tc = this._tags_container;
    tc.find('li:last').remove();
    //remove from hidden tags input
    var tags = this.getSelectedTags();
    var last_tag = tags.pop();
    this.setSelectedTags(tags);
    //populate the tag editor
    this._visible_tags_input.val(last_tag);
    putCursorAtEnd(this._visible_tags_input);
};

TagEditor.prototype.setHotBackspace = function (is_hot) {
    this._has_hot_backspace = is_hot;
};

TagEditor.prototype.hasHotBackspace = function () {
    return this._has_hot_backspace;
};

TagEditor.prototype.completeTagInput = function (reject_dupe) {
    var tag_name = $.trim(this._visible_tags_input.val());
    try {
        tag_name = this.cleanTag(tag_name, reject_dupe);
        this.addTag(tag_name);
        this.clearNewTagInput();
    } catch (error) {
        this.setErrorMessage(error);
    }
};

TagEditor.prototype.saveHeight = function () {
    return;
    // var elem = this._visible_tags_input;
    // this._height = elem.offset().top;
};

TagEditor.prototype.fixHeight = function () {
    return;
    // var new_height = this._visible_tags_input.offset().top;
    // //@todo: replace this by real measurement
    // var element_height = parseInt(
    //     this._element.css('height').replace('px', '')
    // );
    // if (new_height > this._height) {
    //     this._element.css('height', element_height + 28);//magic number!!!
    // } else if (new_height < this._height) {
    //     this._element.css('height', element_height - 28);//magic number!!!
    // }
    // this.saveHeight();
};

TagEditor.prototype.closeAutoCompleter = function () {
    this._autocompleter.finish();
};

TagEditor.prototype.getTagInputKeyHandler = function () {
    var new_tags = this._visible_tags_input;
    var me = this;
    return function (e) {
        if (e.shiftKey) {
            return;
        }
        me.saveHeight();
        var key = e.which || e.keyCode;
        var text = me.getRawNewTagValue();

        //space 32, enter 13
        if (key === 32 || key === 13) {
            var tag_name = $.trim(text);
            if (tag_name.length > 0) {
                try {
                    tag_name = me.cleanTag(tag_name, true);
                    $.ajax({
                        type: 'POST',
                        url: askbot['urls']['cleanTagName'],
                        data: {'tag_name': tag_name},
                        dataType: 'json',
                        cache: false,
                        success: function (data) {
                            if (data['success']) {
                                me.addTag(data['cleaned_tag_name']);
                                me.clearNewTagInput();
                                me.fixHeight();
                            } else if (data['message']) {
                                me.setErrorMessage(data['message']);
                                setTimeout(function () {
                                    me.clearErrorMessage(true);
                                }, 1000);
                            }
                        }
                    });
                } catch (error) {
                    me.setErrorMessage(error);
                }
            }
            return false;
        }

        if (text === '') {
            me.clearErrorMessage();
            me.closeAutoCompleter();
        } else {
            try {
                /* do-nothing validation here
                 * just to report any errors while
                 * the user is typing */
                me.cleanTag(text);
                me.clearErrorMessage();
            } catch (error) {
                me.setErrorMessage(error);
            }
        }

        //8 is backspace
        if (key === 8 && text.length === 0) {
            if (me.hasHotBackspace() === true) {
                me.editLastTag();
                me.setHotBackspace(false);
            } else {
                me.setHotBackspace(true);
            }
        }

        //27 is escape
        if (key === 27) {
            me.clearNewTagInput();
            me.clearErrorMessage();
        }

        if (key !== 8) {
            me.setHotBackspace(false);
        }
        me.fixHeight();
        return false;
    };
};

TagEditor.prototype.decorate = function (element) {
    this._element = element;
    this._hidden_tags_input = element.find('input[name="tags"]');//this one is hidden
    this._tags_container = element.find('ul.tags');
    this._error_alert = $('.tag-editor-error-alert > span');

    var me = this;
    this._tags_container.children().each(function (idx, elem) {
        var tag = new Tag();
        tag.setDeletable(true);
        tag.setLinkable(false);
        tag.decorate($(elem));
        tag.setDeleteHandler(me.getTagDeleteHandler(tag));
    });

    var visible_tags_input = element.find('.new-tags-input');
    this._visible_tags_input = visible_tags_input;
    this.saveHeight();

    var tagsAc = new AutoCompleter({
        url: askbot.urls.get_tag_list,
        onItemSelect: function (item) {
            if (me.isSelectedTagName(item.value) === false) {
                me.completeTagInput();
            } else {
                me.clearNewTagInput();
            }
        },
        minChars: 1,
        useCache: true,
        matchInside: true,
        maxCacheLength: 100,
        delay: 10
    });
    tagsAc.decorate(visible_tags_input);
    this._autocompleter = tagsAc;
    visible_tags_input.keyup(this.getTagInputKeyHandler());

    element.click(function (e) {
        visible_tags_input.focus();
        return false;
    });
};

/**
 * @constructor
 * Category is a select box item
 * that has CategoryEditControls
 */
var Category = function () {
    SelectBoxItem.call(this);
    this._state = 'display';
    this._settings = JSON.parse(askbot.settings.tag_editor);
};
inherits(Category, SelectBoxItem);

Category.prototype.setCategoryTree = function (tree) {
    this._tree = tree;
};

Category.prototype.getCategoryTree = function () {
    return this._tree;
};

Category.prototype.getName = function () {
    return this.getContent().getContent();
};

Category.prototype.getPath = function () {
    return this._tree.getPathToItem(this);
};

Category.prototype.setState = function (state) {
    this._state = state;
    if (!this._element) {
        return;
    }
    this._input_box.val('');
    if (state === 'display') {
        this.showContent();
        this.hideEditor();
        this.hideEditControls();
    } else if (state === 'editable') {
        this._tree._state = 'editable';//a hack
        this.showContent();
        this.hideEditor();
        this.showEditControls();
    } else if (state === 'editing') {
        this._prev_tree_state = this._tree.getState();
        this._tree._state = 'editing';//a hack
        this._input_box.val(this.getName());
        this.hideContent();
        this.showEditor();
        this.hideEditControls();
    }
};

Category.prototype.hideEditControls = function () {
    this._delete_button.hide();
    this._edit_button.hide();
    this._element.unbind('mouseenter mouseleave');
};

Category.prototype.showEditControls = function () {
    var del = this._delete_button;
    var edit = this._edit_button;
    this._element.hover(
        function () {
            del.show();
            edit.show();
        },
        function () {
            del.hide();
            edit.hide();
        }
    );
};

Category.prototype.showEditControlsNow = function () {
    this._delete_button.show();
    this._edit_button.show();
};

Category.prototype.hideContent = function () {
    this.getContent().getElement().hide();
};

Category.prototype.showContent = function () {
    this.getContent().getElement().show();
};

Category.prototype.showEditor = function () {
    this._input_box.show();
    this._input_box.focus();
    this._save_button.show();
    this._cancel_button.show();
};

Category.prototype.hideEditor = function () {
    this._input_box.hide();
    this._save_button.hide();
    this._cancel_button.hide();
};

Category.prototype.getInput = function () {
    return this._input_box.val();
};

Category.prototype.getDeleteHandler = function () {
    var me = this;
    return function () {
        if (confirm(gettext('Delete category?'))) {
            var tree = me.getCategoryTree();
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    tag_name: me.getName(),
                    path: me.getPath()
                }),
                cache: false,
                url: askbot.urls.delete_tag,
                success: function (data) {
                    if (data.success) {
                        //rebuild category tree based on data
                        tree.setData(data.tree_data);
                        //re-open current branch
                        tree.selectPath(tree.getCurrentPath());
                        tree.setState('editable');
                    } else {
                        alert(data.message);
                    }
                }
            });
        }
        return false;
    };
};

Category.prototype.getSaveHandler = function () {
    var me = this;
    var settings = this._settings;
    //here we need old value and new value
    return function () {
        var to_name = me.getInput();
        try {
            to_name = cleanTag(to_name, settings);
            var data = {
                from_name: me.getOriginalName(),
                to_name: to_name,
                path: me.getPath()
            };
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                cache: false,
                url: askbot.urls.rename_tag,
                success: function (data) {
                    if (data.success) {
                        me.setName(to_name);
                        me.setState('editable');
                        me.showEditControlsNow();
                    } else {
                        alert(data.message);
                    }
                }
            });
        } catch (error) {
            alert(error);
        }
        return false;
    };
};

Category.prototype.addControls = function () {
    var input_box = this.makeElement('input');
    input_box.attr('type', 'text');
    this._input_box = input_box;
    this._element.append(input_box);

    var save_button = this.makeButton(
        gettext('save'),
        this.getSaveHandler()
    );
    this._save_button = save_button;
    this._element.append(save_button);

    var me = this;
    var cancel_button = this.makeButton(
        'x',
        function () {
            me.setState('editable');
            me.showEditControlsNow();
            return false;
        }
    );
    this._cancel_button = cancel_button;
    this._element.append(cancel_button);

    var edit_button = this.makeButton(
        gettext('edit'),
        function () {
            //todo: I would like to make only one at a time editable
            //var tree = me.getCategoryTree();
            //tree.closeAllEditors();
            //tree.setState('editable');
            //calc path, then select it
            var tree = me.getCategoryTree();
            tree.selectPath(me.getPath());
            me.setState('editing');
            return false;
        }
    );
    this._edit_button = edit_button;
    this._element.append(edit_button);

    var delete_button = this.makeButton(
        'x', this.getDeleteHandler()
    );
    this._delete_button = delete_button;
    this._element.append(delete_button);
};

Category.prototype.getOriginalName = function () {
    return this._original_name;
};

Category.prototype.createDom = function () {
    Category.superClass_.createDom.call(this);
    this.addControls();
    this.setState('display');
    this._original_name = this.getName();
};

Category.prototype.decorate = function (element) {
    Category.superClass_.decorate.call(this, element);
    this.addControls();
    this.setState('display');
    this._original_name = this.getName();
};

var CategoryAdder = function () {
    WrappedElement.call(this);
    this._state = 'disabled';//waitedit
    this._tree = undefined;//category tree
    this._settings = JSON.parse(askbot.settings.tag_editor);
};
inherits(CategoryAdder, WrappedElement);

CategoryAdder.prototype.setCategoryTree = function (tree) {
    this._tree = tree;
};

CategoryAdder.prototype.setLevel = function (level) {
    this._level = level;
};

CategoryAdder.prototype.setState = function (state) {
    this._state = state;
    if (!this._element) {
        return;
    }
    if (state === 'waiting') {
        this._element.show();
        this._input.val('');
        this._input.hide();
        this._save_button.hide();
        this._cancel_button.hide();
        this._trigger.show();
    } else if (state === 'editable') {
        this._element.show();
        this._input.show();
        this._input.val('');
        this._input.focus();
        this._save_button.show();
        this._cancel_button.show();
        this._trigger.hide();
    } else if (state === 'disabled') {
        this.setState('waiting');//a little hack
        this._state = 'disabled';
        this._element.hide();
    }
};

CategoryAdder.prototype.cleanCategoryName = function (name) {
    name = $.trim(name);
    if (name === '') {
        throw gettext('category name cannot be empty');
    }
    //if ( this._tree.hasCategory(name) ) {
        //throw interpolate(
        //throw gettext('this category already exists');
        //    [this._tree.getDisplayPathByName(name)]
        //)
    //}
    return cleanTag(name, this._settings);
};

CategoryAdder.prototype.getPath = function () {
    var path = this._tree.getCurrentPath();
    if (path.length > this._level + 1) {
        return path.slice(0, this._level + 1);
    } else {
        return path;
    }
};

CategoryAdder.prototype.getSelectBox = function () {
    return this._tree.getSelectBox(this._level);
};

CategoryAdder.prototype.startAdding = function () {
    var name;
    try {
        name = this._input.val();
        name = this.cleanCategoryName(name);
    } catch (error) {
        alert(error);
        return;
    }

    //don't add dupes to the same level
    var existing_names = this.getSelectBox().getNames();
    if ($.inArray(name, existing_names) !== -1) {
        alert(gettext('already exists at the current level!'));
        return;
    }

    var me = this;
    var tree = this._tree;
    var adder_path = this.getPath();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            path: adder_path,
            new_category_name: name
        }),
        url: askbot.urls.add_tag_category,
        cache: false,
        success: function (data) {
            if (data.success) {
                //rebuild category tree based on data
                tree.setData(data.tree_data);
                tree.selectPath(data.new_path);
                tree.setState('editable');
                me.setState('waiting');
            } else {
                alert(data.message);
            }
        }
    });
};

CategoryAdder.prototype.createDom = function () {
    this._element = this.makeElement('li');
    //add open adder link
    var trigger = this.makeElement('a');
    this._trigger = trigger;
    trigger.html(gettext('add category'));
    this._element.append(trigger);
    //add input box and the add button
    var input = this.makeElement('input');
    this._input = input;
    input.addClass('add-category');
    input.attr({
        'name': 'add_category',
        'type': 'text'
    });
    this._element.append(input);
    //add save category button
    var save_button = this.makeElement('button');
    this._save_button = save_button;
    save_button.html(gettext('save'));
    this._element.append(save_button);

    var cancel_button = this.makeElement('button');
    this._cancel_button = cancel_button;
    cancel_button.html('x');
    this._element.append(cancel_button);

    this.setState(this._state);

    var me = this;
    setupButtonEventHandlers(
        trigger,
        function () { me.setState('editable'); }
    );
    setupButtonEventHandlers(
        save_button,
        function () {
            me.startAdding();
            return false;//prevent form submit
        }
    );
    setupButtonEventHandlers(
        cancel_button,
        function () {
            me.setState('waiting');
            return false;//prevent submit
        }
    );
    //create input box, button and the "activate" link
};

/**
 * @constructor
 * SelectBox subclass to create/edit/delete
 * categories
 */
var CategorySelectBox = function () {
    SelectBox.call(this);
    this._item_class = Category;
    this._category_adder = undefined;
    this._tree = undefined;//cat tree
    this._level = undefined;
};
inherits(CategorySelectBox, SelectBox);

CategorySelectBox.prototype.setState = function (state) {
    this._state = state;
    if (state === 'select') {
        if (this._category_adder) {
            this._category_adder.setState('disabled');
        }
        $.each(this._items, function (idx, item) {
            item.setState('display');
        });
    } else if (state === 'editable') {
        this._category_adder.setState('waiting');
        $.each(this._items, function (idx, item) {
            item.setState('editable');
        });
    }
};

CategorySelectBox.prototype.setCategoryTree = function (tree) {
    this._tree = tree;
};

CategorySelectBox.prototype.getCategoryTree = function () {
};

CategorySelectBox.prototype.setLevel = function (level) {
    this._level = level;
};

CategorySelectBox.prototype.getNames = function () {
    var names = [];
    $.each(this._items, function (idx, item) {
        names.push(item.getName());
    });
    return names;
};

CategorySelectBox.prototype.appendCategoryAdder = function () {
    var adder = new CategoryAdder();
    adder.setLevel(this._level);
    adder.setCategoryTree(this._tree);
    this._category_adder = adder;
    this._element.append(adder.getElement());
};

CategorySelectBox.prototype.createDom = function () {
    CategorySelectBox.superClass_.createDom.call(this);
    if (askbot.data.userIsAdmin) {
        this.appendCategoryAdder();
    }
};

CategorySelectBox.prototype.decorate = function (element) {
    CategorySelectBox.superClass_.decorate.call(this, element);
    this.setState(this._state);
    if (askbot.data.userIsAdmin) {
        this.appendCategoryAdder();
    }
};

/**
 * @constructor
 * turns on/off the category editor
 */
var CategoryEditorToggle = function () {
    AjaxToggle.call(this);
};
inherits(CategoryEditorToggle, AjaxToggle);

CategoryEditorToggle.prototype.setCategorySelector = function (sel) {
    this._category_selector = sel;
};

CategoryEditorToggle.prototype.getCategorySelector = function () {
    return this._category_selector;
};

CategoryEditorToggle.prototype.decorate = function (element) {
    CategoryEditorToggle.superClass_.decorate.call(this, element);
};

CategoryEditorToggle.prototype.getDefaultHandler = function () {
    var me = this;
    return function () {
        var editor = me.getCategorySelector();
        if (me.isOn()) {
            me.setState('off-state');
            editor.setState('select');
        } else {
            me.setState('on-state');
            editor.setState('editable');
        }
    };
};

var CategorySelector = function () {
    Widget.call(this);
    this._data = null;
    this._select_handler = function () {};//dummy default
    this._current_path = [0];//path points to selected item in tree
};
inherits(CategorySelector, Widget);

/**
 * propagates state to the individual selectors
 */
CategorySelector.prototype.setState = function (state) {
    this._state = state;
    if (state === 'editing') {
        return;//do not propagate this state
    }
    $.each(this._selectors, function (idx, selector) {
        selector.setState(state);
    });
};

CategorySelector.prototype.getPathToItem = function (item) {
    function findPathToItemInTree(tree, item) {
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (node[2] === item) {
                return [i];
            }
            var path = findPathToItemInTree(node[1], item);
            if (path.length > 0) {
                path.unshift(i);
                return path;
            }
        }
        return [];
    }
    return findPathToItemInTree(this._data, item);
};

CategorySelector.prototype.applyToDataItems = function (func) {
    function applyToDataItems(tree) {
        $.each(tree, function (idx, item) {
            func(item);
            applyToDataItems(item[1]);
        });
    }
    if (this._data) {
        applyToDataItems(this._data);
    }
};

CategorySelector.prototype.setData = function (data) {
    this._data = data;
    var tree = this;
    function attachCategory(item) {
        var cat = new Category();
        cat.setName(item[0]);
        cat.setCategoryTree(tree);
        item[2] = cat;
    }
    this.applyToDataItems(attachCategory);
};

/**
 * clears contents of selector boxes starting from
 * the given level, in range 0..2
 */
CategorySelector.prototype.clearCategoryLevels = function (level) {
    for (var i = level; i < 3; i++) {
        this._selectors[i].detachAllItems();
    }
};

CategorySelector.prototype.getLeafItems = function (selection_path) {
    //traverse the tree down to items pointed to by the path
    var data = this._data[0];
    for (var i = 1; i < selection_path.length; i++) {
        data = data[1][selection_path[i]];
    }
    return data[1];
};

/**
 * called when a sub-level needs to open
 */
CategorySelector.prototype.populateCategoryLevel = function (source_path) {
    var level = source_path.length - 1;
    if (level >= 3) {
        return;
    }
    //clear all items downstream
    this.clearCategoryLevels(level);

    //populate current selector
    var selector = this._selectors[level];
    var items  = this.getLeafItems(source_path);

    $.each(items, function (idx, item) {
        var category_name = item[0];
        var category_subtree = item[1];
        var category_object = item[2];
        selector.addItemObject(category_object);
        if (category_subtree.length > 0) {
            category_object.addCssClass('tree');
        }
    });

    this.setState(this._state);//update state

    selector.clearSelection();
};

CategorySelector.prototype.selectPath = function (path) {
    var i;
    for (i = 1; i <= path.length; i++) {
        this.populateCategoryLevel(path.slice(0, i));
    }
    for (i = 1; i < path.length; i++) {
        var sel_box = this._selectors[i - 1];
        var category = sel_box.getItemByIndex(path[i]);
        sel_box.selectItem(category);
    }
};

CategorySelector.prototype.getSelectBox = function (level) {
    return this._selectors[level];
};

CategorySelector.prototype.getSelectedPath = function (selected_level) {
    var path = [0];//root, todo: better use names for path???
    /*
     * upper limit capped by current clicked level
     * we ignore all selection above the current level
     */
    for (var i = 0; i < selected_level + 1; i++) {
        var selector = this._selectors[i];
        var item = selector.getSelectedItem();
        if (item) {
            path.push(selector.getItemIndex(item));
        } else {
            return path;
        }
    }
    return path;
};

/** getter and setter are not symmetric */
CategorySelector.prototype.setSelectHandler = function (handler) {
    this._select_handler = handler;
};

CategorySelector.prototype.getSelectHandlerInternal = function () {
    return this._select_handler;
};

CategorySelector.prototype.setCurrentPath = function (path) {
    this._current_path = path;
    return true;
};

CategorySelector.prototype.getCurrentPath = function () {
    return this._current_path;
};

CategorySelector.prototype.getEditorToggle = function () {
    return this._editor_toggle;
};

/*CategorySelector.prototype.closeAllEditors = function () {
    $.each(this._selectors, function (idx, sel) {
        sel._category_adder.setState('wait');
        $.each(sel._items, function (idx2, item) {
            item.setState('editable');
        });
    });
};*/

CategorySelector.prototype.getSelectHandler = function (level) {
    var me = this;
    return function (item_data) {
        if (me.getState() === 'editing') {
            return;//don't navigate when editing
        }
        //1) run the assigned select handler
        var tag_name = item_data.title;
        if (me.getState() === 'select') {
            /* this one will actually select the tag
             * maybe a bit too implicit
             */
            me.getSelectHandlerInternal()(tag_name);
        }
        //2) if appropriate, populate the higher level
        if (level < 2) {
            var current_path = me.getSelectedPath(level);
            me.setCurrentPath(current_path);
            me.populateCategoryLevel(current_path);
        }
    };
};

CategorySelector.prototype.decorate = function (element) {
    this._element = element;
    this._selectors = [];

    var selector0 = new CategorySelectBox();
    selector0.setLevel(0);
    selector0.setCategoryTree(this);
    selector0.decorate(element.find('.cat-col-0'));
    selector0.setSelectHandler(this.getSelectHandler(0));
    this._selectors.push(selector0);

    var selector1 = new CategorySelectBox();
    selector1.setLevel(1);
    selector1.setCategoryTree(this);
    selector1.decorate(element.find('.cat-col-1'));
    selector1.setSelectHandler(this.getSelectHandler(1));
    this._selectors.push(selector1);

    var selector2 = new CategorySelectBox();
    selector2.setLevel(2);
    selector2.setCategoryTree(this);
    selector2.decorate(element.find('.cat-col-2'));
    selector2.setSelectHandler(this.getSelectHandler(2));
    this._selectors.push(selector2);

    if (askbot.data.userIsAdminOrMod) {
        var editor_toggle = new CategoryEditorToggle();
        editor_toggle.setCategorySelector(this);
        var toggle_element = $('.category-editor-toggle');
        toggle_element.show();
        editor_toggle.decorate(toggle_element);
        this._editor_toggle = editor_toggle;
    }

    this.populateCategoryLevel([0]);
};

/**
 * @constructor
 * loads html for the category selector from
 * the server via ajax and activates the
 * CategorySelector on the loaded HTML
 */
var CategorySelectorLoader = function () {
    WrappedElement.call(this);
    this._is_loaded = false;
};
inherits(CategorySelectorLoader, WrappedElement);

CategorySelectorLoader.prototype.setCategorySelector = function (sel) {
    this._category_selector = sel;
};

CategorySelectorLoader.prototype.setLoaded = function (is_loaded) {
    this._is_loaded = is_loaded;
};

CategorySelectorLoader.prototype.isLoaded = function () {
    return this._is_loaded;
};

CategorySelectorLoader.prototype.setEditor = function (editor) {
    this._editor = editor;
};

CategorySelectorLoader.prototype.closeEditor = function () {
    this._editor.hide();
    this._editor_buttons.hide();
    this._display_tags_container.show();
    this._question_body.show();
    this._question_controls.show();
};

CategorySelectorLoader.prototype.openEditor = function () {
    this._editor.show();
    this._editor_buttons.show();
    this._display_tags_container.hide();
    this._question_body.hide();
    this._question_controls.hide();
    var sel = this._category_selector;
    sel.setState('select');
    sel.getEditorToggle().setState('off-state');
};

CategorySelectorLoader.prototype.addEditorButtons = function () {
    this._editor.after(this._editor_buttons);
};

CategorySelectorLoader.prototype.getOnLoadHandler = function () {
    var me = this;
    return function (html) {
        me.setLoaded(true);

        //append loaded html to dom
        var editor = $('<div>' + html + '</div>');
        me.setEditor(editor);
        $('#question-tags').after(editor);

        var selector = askbot.functions.initCategoryTree();
        me.setCategorySelector(selector);

        me.addEditorButtons();
        me.openEditor();
        //add the save button
    };
};

CategorySelectorLoader.prototype.startLoadingHTML = function (on_load) {
    var me = this;
    $.ajax({
        type: 'GET',
        dataType: 'json',
        data: { template_name: 'widgets/tag_category_selector.html' },
        url: askbot.urls.get_html_template,
        cache: true,
        success: function (data) {
            if (data.success) {
                on_load(data.html);
            } else {
                showMessage(me.getElement(), data.message);
            }
        }
    });
};

CategorySelectorLoader.prototype.getRetagHandler = function () {
    var me = this;
    return function () {
        if (me.isLoaded() === false) {
            me.startLoadingHTML(me.getOnLoadHandler());
        } else {
            me.openEditor();
        }
        return false;
    };
};

CategorySelectorLoader.prototype.drawNewTags = function (new_tags) {
    var container = this._display_tags_container;
    container.html('');
    if (new_tags === '') {
        return;
    }

    new_tags = new_tags.split(/\s+/);
    var me = this;
    $.each(new_tags, function (index, name) {
        var li = me.makeElement('li');
        container.append(li);
        var tag = new Tag();
        tag.setName(name);
        li.append(tag.getElement());
    });
};

CategorySelectorLoader.prototype.getSaveHandler = function () {
    var me = this;
    return function () {
        var tagInput = $('input[name="tags"]');
        $.ajax({
            type: 'POST',
            url: askbot.urls.retag,
            dataType: 'json',
            data: { tags: getUniqueWords(tagInput.val()).join(' ') },
            success: function (json) {
                if (json.success) {
                    var new_tags = getUniqueWords(json.new_tags);
                    oldTagsHtml = '';
                    me.closeEditor();
                    me.drawNewTags(new_tags.join(' '));
                } else {
                    me.closeEditor();
                    showMessage(me.getElement(), json.message);
                }
            },
            error: function (xhr) {
                showMessage(tagsDiv, 'sorry, something is not right here');
                cancelRetag();
            }
        });
        return false;
    };
};

CategorySelectorLoader.prototype.getCancelHandler = function () {
    var me = this;
    return function () {
        me.closeEditor();
    };
};

CategorySelectorLoader.prototype.decorate = function (element) {
    this._element = element;
    this._display_tags_container = $('#question-tags');
    this._question_body = $('.question .post-body');
    this._question_controls = $('#question-controls');

    this._editor_buttons = this.makeElement('div');
    this._done_button = this.makeElement('button');
    this._done_button.html(gettext('save tags'));
    this._editor_buttons.append(this._done_button);

    this._cancel_button = this.makeElement('button');
    this._cancel_button.html(gettext('cancel'));
    this._editor_buttons.append(this._cancel_button);
    this._editor_buttons.find('button').addClass('submit');
    this._editor_buttons.addClass('retagger-buttons');

    //done button
    setupButtonEventHandlers(
        this._done_button,
        this.getSaveHandler()
    );
    //cancel button
    setupButtonEventHandlers(
        this._cancel_button,
        this.getCancelHandler()
    );

    //retag button
    setupButtonEventHandlers(
        element,
        this.getRetagHandler()
    );
};


var AskButton = function () {
    SimpleControl.call(this);
    this._handler = function (evt) {
        if (askbot.data.userIsReadOnly === true) {
            notify.show(gettext('Sorry, you have only read access'));
            evt.preventDefault();
        }
    };
};
inherits(AskButton, SimpleControl);


$(document).ready(function () {
    $('.comments').each(function (index, element) {
        var comments = new PostCommentsWidget();
        comments.decorate($(element));
    });
    $('[id^="post-id-"]').each(function (idx, element) {
        var deleter = new DeletePostLink();
        //confusingly .question-delete matches the answers too need rename
        var post_id = element.id.split('-').pop();
        deleter.setPostId(post_id);
        deleter.decorate($(element).find('.question-delete'));
    });
    //todo: convert to "control" class
    var publishBtns = $('.answer-publish, .answer-unpublish');
    publishBtns.each(function (idx, btn) {
        setupButtonEventHandlers($(btn), function () {
            var answerId = $(btn).data('answerId');
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: {'answer_id': answerId},
                url: askbot.urls.publishAnswer,
                success: function (data) {
                    if (data.success) {
                        window.location.reload(true);
                    } else {
                        showMessage($(btn), data.message);
                    }
                }
            });
        });
    });

    if (askbot.settings.tagSource === 'category-tree') {
        var catSelectorLoader = new CategorySelectorLoader();
        catSelectorLoader.decorate($('#retag'));
    } else {
        questionRetagger.init();
    }
    socialSharing.init();

    var proxyUserNameInput = $('#id_post_author_username');
    var proxyUserEmailInput = $('#id_post_author_email');
    if (proxyUserNameInput.length === 1) {

        var userSelectHandler = function (data) {
            proxyUserEmailInput.val(data.data[0]);
        };

        var fakeUserAc = new AutoCompleter({
            url: askbot.urls.get_users_info,
            minChars: 1,
            useCache: true,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10,
            onItemSelect: userSelectHandler
        });
        fakeUserAc.decorate(proxyUserNameInput);
    }
    //if groups are enabled - activate share functions
    var groupsInput = $('#share_group_name');
    if (groupsInput.length === 1) {
        var groupsAc = new AutoCompleter({
            url: askbot.urls.getGroupsList,
            promptText: gettext('Group name:'),
            minChars: 1,
            useCache: false,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10
        });
        groupsAc.decorate(groupsInput);
    }
    var usersInput = $('#share_user_name');
    if (usersInput.length === 1) {
        var usersAc = new AutoCompleter({
            url: '/get-users-info/',
            promptText: askbot.messages.userNamePrompt,
            minChars: 1,
            useCache: false,
            matchInside: true,
            maxCacheLength: 100,
            delay: 10
        });
        usersAc.decorate(usersInput);
    }

    var showSharedUsers = $('.see-related-users');
    if (showSharedUsers.length) {
        var usersPopup = new ThreadUsersDialog();
        usersPopup.setHeadingText(gettext('Shared with the following users:'));
        usersPopup.decorate(showSharedUsers);
    }
    var showSharedGroups = $('.see-related-groups');
    if (showSharedGroups.length) {
        var groupsPopup = new ThreadUsersDialog();
        groupsPopup.setHeadingText(gettext('Shared with the following groups:'));
        groupsPopup.decorate(showSharedGroups);
    }

    var askButton = new AskButton();
    askButton.decorate($('#askButton'));

    if (askbot.data.userIsThreadModerator) {
        var mergeQuestions = new MergeQuestionsDialog();
        $('body').append(mergeQuestions.getElement());
        var mergeBtn = $('.question-merge');
        setupButtonEventHandlers(mergeBtn, function () {
            mergeQuestions.show();
        });
    }
});

/**
 * @constructor
 * An element that encloses an editor and everything inside it.
 * By default editor is hidden and user sees a box with a prompt
 * suggesting to make a post.
 * When user clicks, editor becomes accessible.
 */
var FoldedEditor = function () {
    WrappedElement.call(this);
};
inherits(FoldedEditor, WrappedElement);

FoldedEditor.prototype.getEditor = function () {
    return this._editor;
};

FoldedEditor.prototype.getEditorInputId = function () {
    return this._element.find('textarea').attr('id');
};

FoldedEditor.prototype.onAfterOpenHandler = function () {
    var editor = this.getEditor();
    if (editor) {
        editor.start();
        editor.focus(function(){
            editor.putCursorAtEnd()
            $(document).trigger('askbot.FoldedEditor.afterOpened', [this]);
        });
    }
};

FoldedEditor.prototype.getOpenHandler = function () {
    var editorBox = this._editorBox;
    var promptBox = this._prompt;
    var me = this;
    return function () {
        if (askbot.data.userIsReadOnly === true) {
            notify.show(gettext('Sorry, you have only read access'));
        } else {
            promptBox.hide();
            editorBox.show();
            var element = me.getElement();
            element.addClass('unfolded');

            /* make the editor one shot - once it unfolds it's
            * not accepting any events
            */
            element.unbind('click');
            element.unbind('focus');

            /* this function will open the editor
            * and focus cursor on the editor
            */
            me.onAfterOpenHandler();
        }
    };
};

FoldedEditor.prototype.decorate = function (element) {
    this._element = element;
    this._prompt = element.find('.js-folded-editor-trigger');
    this._editorBox = element.find('.editor-proper');

    var editorType = askbot.settings.editorType;
    var editor;

    if (editorType === 'tinymce') {
        editor = new TinyMCE();
        editor.setId('editor');
    } else if (editorType === 'markdown') {
        editor = new WMD({'minLines': 10});
        editor.setIdSeed('');
    } else {
        throw 'wrong editor type "' + editorType + '"'
    }
    editor.setTextareaName('text');
    this._editor = editor;

    var placeHolder = element.find('.editor-placeholder');
    editor.setText(placeHolder.data('draftAnswer'));
    placeHolder.append(editor.getElement());
    //editor.start();

    var openHandler = this.getOpenHandler();
    element.click(openHandler);
    element.focus(openHandler);
};

/**
 * Form class.
 * Helps build forms with validation
 */
var Form = function () {
    WrappedElement.call(this);
    /* all dicts have key of field name */
    this._errors = {};
    this._errorElements = {};
    this._validators = {};
    this._inputs = {};
};
inherits(Form, WrappedElement);

Form.prototype.fieldHasErrors = function (fieldName) {
    return this._errors[fieldName];
};

Form.prototype.formHasErrors = function () {
    var fields = this._fieldNames;
    for (var i=0; i<fields.length; i++) {
        var field = fields[i];
        if (this.fieldHasErrors(field)) {
            return true;
        }
    }
    return false;
};

Form.prototype.validateForm = function () {
    var fields = this._fieldNames;
    for (var i=0; i<fields.length; i++) {
        this.validateField(fields[i]);
    }
};

Form.prototype.getFormValidationHandler = function () {
    var me = this;
    return function () {
        me.validateForm();
        if (me.formHasErrors()) {
            return false;
        }
    };
};

Form.prototype.setFieldError = function (fieldName, errorMsg) {
    var error = this._errorElements[fieldName];
    error.html(errorMsg);
    this._errors[fieldName] = true;
};

Form.prototype.clearFieldError = function (fieldName) {
    var error = this._errorElements[fieldName];
    error.html('');
    this._errors[fieldName] = false;
};

Form.prototype.validateField = function (fieldName) {
    var input = this._inputs[fieldName];
    var validator = this._validators[fieldName];
    var val = input.val();
    try {
        validator(val);
        this.clearFieldError(fieldName);
    } catch (error) {
        this.setFieldError(fieldName, error);
    }
}

Form.prototype.decorateField = function (fieldName) {
    //get validator
    var element = $(this._element);
    var validator = element.data(fieldName + 'Validator');
    validator = getObjectByPath(validator);
    this._validators[fieldName] = validator;

    var error = element.find('.js-' + fieldName + '-error');
    this._errorElements[fieldName] = error;

    var input = element.find('input[name="' + fieldName + '"]');
    if (input.length == 0) {
        input = element.find('textarea[name="' + fieldName + '"]');
    }
    if (input.length == 0) {
        input = element.find('select[name="' + fieldName + '"]');
    }
    this._inputs[fieldName] = input;

    var me = this;
    input.change(function () {
        me.validateField(fieldName);
        return false;
    });
};

Form.prototype.decorate = function (element) {
    this._element = element;
    //look for validated fields
    var fieldNames = $(element).data('validatedFields');
    fieldNames = $.trim(fieldNames).split(',');

    for (var i=0; i<fieldNames.length; i++) {
        var fieldName = $.trim(fieldNames[i]);
        fieldNames[i] = fieldName;//save cleaned field name
        this.decorateField(fieldName);
    }
    this._fieldNames = fieldNames;

    element.submit(this.getFormValidationHandler());
};

var AskForm = function () {
    Form.call(this);
};
inherits(AskForm, Form);

AskForm.prototype.getOpenEditorHandler = function (editor, openLink) {
    return function() {
        var openHandler = editor.getOpenHandler();
        openLink.remove();
        openHandler();
    };
};

AskForm.prototype.decorate = function (element) {
    getSuperClass(AskForm).decorate.call(this, element);
    var openLink = element.find('.js-question-body-trigger');
    var editorElement = element.find('.folded-editor');

    if (openLink.length && editorElement.length) {
        var editor = new FoldedEditor();
        editor.decorate(editorElement);
        var handler = this.getOpenEditorHandler(editor, openLink);
        setupButtonEventHandlers(openLink, handler);
    }
};
