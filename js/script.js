/**
 * Owncloud - openotp_auth
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * @package openotp_auth
 * @author Julien RICHARD
 * @copyright 2018 RCDEVS info@rcdevs.com
 */

(function ($, OC) {

	$(document).ready(function () {
		
		$('form[name="login"]').submit(function () {
			$(this).prepend("<span style='color:white; font-size:0.9em;'>Processing request. Please wait...</span>");
			return true;
		});
		
		$('#openotp_settings #saveconfig').click(function () {
			var url = OC.generateUrl('/apps/openotp_auth/saveconfig');
			var post = {
				post: $( "#openotp_settings" ).serialize()
			};
			
	        $.post( url, post, function(response){
				if($('#message').is(":visible")){
					$('#message').fadeOut("fast"); 
				}
	            if( response.status == "success" ){
	            	$('#message').removeClass('error').addClass('success').html(response.message).fadeIn('fast');
	            }else{
	            	$('#message').removeClass('success').addClass('error').html(response.message).fadeIn('fast');
	            }
	        });
	        return false;
		});		
		
		
		$('#openotp_psettings input[name="enable_openotp"]:radio').change(function() {
				var url = OC.generateUrl('/apps/openotp_auth/saveconfig');
				var post = {
					post: $( "#openotp_psettings" ).serialize()
				};
		
		        $.post( url, post, function(response){
					if($('#message').is(":visible")){
						$('#message').fadeOut("fast"); 
					} 
		            if( response.status == "success" ){
		            	$('#message').removeClass('error').addClass('success').html(response.message).fadeIn('fast');
		            }else{
		            	$('#message').removeClass('success').addClass('error').html(response.message).fadeIn('fast');
		            }
		        });
		        return false;					  
		    });
			
			
		$('#check_server_url').click(function () {
			check_server_url();
		});					
		
		if ( $("#openotp_settings").length ) {
			check_server_url();			
		}
		
		if ( $("#body-login div.warning #OpenOTPLoginForm").length ) {
			$("#body-login div.warning").prepend('<div style="background-color:red; margin:-10px -10px 10px; height:4px; width:300px; padding:0;" id="count_red"><div style="background-color:orange; margin:0; height:4px; width:300px; padding:0;" id="div_orange"></div></div>');
		}
		
	});

})(jQuery, OC);

function check_server_url() {
	var url = OC.generateUrl('/apps/openotp_auth/check_server_url');
	var server_url_val = $( "#openotp_settings #rcdevsopenotp_server_url" ).val();
	var ignore_ssl_errors = $( "#openotp_settings #rcdevsopenotp_ignore_ssl_errors" ).is(":checked");
	
	$("#check_server_loading").fadeIn();
    $.post( url, { server_url: server_url_val, ignore_ssl_errors: ignore_ssl_errors }, function(response){
		/*if($('#message_check_server_url').is(":visible")){
			$('#message_check_server_url').fadeOut("fast"); 
		}*/
        if( response.status == "success" ){
			$("#check_server_loading").fadeOut();
			console.log(response.openotpStatus);
			if( response.openotpStatus === false){ 
				$('#message_status').removeClass('success').addClass('error').fadeIn('fast');
				$('#message_check_server_url').fadeOut('fast');
				console.log( response.message );
			}else{
        		$('#message_status').removeClass('error').addClass('success').fadeIn('fast');
        		$('#message_check_server_url').removeClass('error').html(response.message).fadeIn('fast');
			}
        }else{
			$("#check_server_loading").fadeOut();
        	$('#message_status').removeClass('success').addClass('error').fadeIn('fast');
        	$('#message_check_server_url').fadeOut('fast');
        }
    });			
}


/*
 * arrive.js
 * v2.2.0
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014-2015 Uzair Farooq
 */

(function(n,q,v){function r(a,b,c){if(e.matchesSelector(a,b.selector)&&(a._id===v&&(a._id=w++),-1==b.firedElems.indexOf(a._id))){if(b.options.onceOnly)if(0===b.firedElems.length)b.me.unbindEventWithSelectorAndCallback.call(b.target,b.selector,b.callback);else return;b.firedElems.push(a._id);c.push({callback:b.callback,elem:a})}}function p(a,b,c){for(var d=0,f;f=a[d];d++)r(f,b,c),0<f.childNodes.length&&p(f.childNodes,b,c)}function t(a){for(var b=0,c;c=a[b];b++)c.callback.call(c.elem)}function x(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   b){a.forEach(function(a){var d=a.addedNodes,f=a.target,e=[];null!==d&&0<d.length?p(d,b,e):"attributes"===a.type&&r(f,b,e);t(e)})}function y(a,b){a.forEach(function(a){a=a.removedNodes;var d=[];null!==a&&0<a.length&&p(a,b,d);t(d)})}function z(a){var b={attributes:!1,childList:!0,subtree:!0};a.fireOnAttributesModification&&(b.attributes=!0);return b}function A(a){return{childList:!0,subtree:!0}}function k(a){a.arrive=l.bindEvent;e.addMethod(a,"unbindArrive",l.unbindEvent);e.addMethod(a,"unbindArrive",
	l.unbindEventWithSelectorOrCallback);e.addMethod(a,"unbindArrive",l.unbindEventWithSelectorAndCallback);a.leave=m.bindEvent;e.addMethod(a,"unbindLeave",m.unbindEvent);e.addMethod(a,"unbindLeave",m.unbindEventWithSelectorOrCallback);e.addMethod(a,"unbindLeave",m.unbindEventWithSelectorAndCallback)}if(n.MutationObserver&&"undefined"!==typeof HTMLElement){var w=0,e=function(){var a=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;
		return{matchesSelector:function(b,c){return b instanceof HTMLElement&&a.call(b,c)},addMethod:function(a,c,d){var f=a[c];a[c]=function(){if(d.length==arguments.length)return d.apply(this,arguments);if("function"==typeof f)return f.apply(this,arguments)}}}}(),B=function(){var a=function(){this._eventsBucket=[];this._beforeRemoving=this._beforeAdding=null};a.prototype.addEvent=function(a,c,d,f){a={target:a,selector:c,options:d,callback:f,firedElems:[]};this._beforeAdding&&this._beforeAdding(a);this._eventsBucket.push(a);
		return a};a.prototype.removeEvent=function(a){for(var c=this._eventsBucket.length-1,d;d=this._eventsBucket[c];c--)a(d)&&(this._beforeRemoving&&this._beforeRemoving(d),this._eventsBucket.splice(c,1))};a.prototype.beforeAdding=function(a){this._beforeAdding=a};a.prototype.beforeRemoving=function(a){this._beforeRemoving=a};return a}(),u=function(a,b,c){function d(a){"number"!==typeof a.length&&(a=[a]);return a}var f=new B,e=this;f.beforeAdding(function(b){var d=b.target,h;if(d===n.document||d===n)d=
		document.getElementsByTagName("html")[0];h=new MutationObserver(function(a){c.call(this,a,b)});var g=a(b.options);h.observe(d,g);b.observer=h;b.me=e});f.beforeRemoving(function(a){a.observer.disconnect()});this.bindEvent=function(a,c,h){if("undefined"===typeof h)h=c,c=b;else{var g={},e;for(e in b)g[e]=b[e];for(e in c)g[e]=c[e];c=g}e=d(this);for(g=0;g<e.length;g++)f.addEvent(e[g],a,c,h)};this.unbindEvent=function(){var a=d(this);f.removeEvent(function(b){for(var c=0;c<a.length;c++)if(b.target===a[c])return!0;
		return!1})};this.unbindEventWithSelectorOrCallback=function(a){var b=d(this);f.removeEvent("function"===typeof a?function(c){for(var d=0;d<b.length;d++)if(c.target===b[d]&&c.callback===a)return!0;return!1}:function(c){for(var d=0;d<b.length;d++)if(c.target===b[d]&&c.selector===a)return!0;return!1})};this.unbindEventWithSelectorAndCallback=function(a,b){var c=d(this);f.removeEvent(function(d){for(var e=0;e<c.length;e++)if(d.target===c[e]&&d.selector===a&&d.callback===b)return!0;return!1})};return this},
	l=new u(z,{fireOnAttributesModification:!1,onceOnly:!1},x),m=new u(A,{},y);q&&k(q.fn);k(HTMLElement.prototype);k(NodeList.prototype);k(HTMLCollection.prototype);k(HTMLDocument.prototype);k(Window.prototype)}})(this,"undefined"===typeof jQuery?null:jQuery,void 0);
