!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof module&&module.exports?module.exports=function(e,n){return n===undefined&&(n="undefined"!=typeof window?require("jquery"):require("jquery")(e)),t(n)}:t(window.jQuery)}(function(f){f.FE.URLRegEx="(^| |\\u00A0)("+f.FE.LinkRegEx+"|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,}))$",f.FE.PLUGINS.url=function(i){function n(e,n,t){for(var r="";t.length&&"."==t[t.length-1];)r+=".",t=t.substring(0,t.length-1);var o=t;if(i.opts.linkConvertEmailAddress)i.helpers.isEmail(o)&&!/^mailto:.*/i.test(o)&&(o="mailto:"+o);else if(i.helpers.isEmail(o))return n+t;return/^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(o)||(o="//"+o),(n||"")+"<a"+(i.opts.linkAlwaysBlank?' target="_blank"':"")+(p?' rel="'+p+'"':"")+' data-fr-linked="true" href="'+o+'">'+t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&amp;/g,"&").replace(/&/g,"&amp;")+"</a>"+r}function l(){return new RegExp(f.FE.URLRegEx,"gi")}function a(e){return i.opts.linkAlwaysNoFollow&&(p="nofollow"),i.opts.linkAlwaysBlank&&(i.opts.linkNoOpener&&(p?p+=" noopener":p="noopener"),i.opts.linkNoReferrer&&(p?p+=" noreferrer":p="noreferrer")),e.replace(l(),n)}function s(e){var n=e.split(" ");return n[n.length-1]}function t(){var e=i.selection.ranges(0),n=e.startContainer;if(!n||n.nodeType!==Node.TEXT_NODE||e.startOffset!==(n.textContent||"").length)return!1;if(function o(e){return!!e&&("A"===e.tagName||!(!e.parentNode||e.parentNode==i.el)&&o(e.parentNode))}(n))return!1;if(l().test(s(n.textContent))){f(n).before(a(n.textContent));var t=f(n.parentNode).find("a[data-fr-linked]");t.removeAttr("data-fr-linked"),n.parentNode.removeChild(n),i.events.trigger("url.linked",[t.get(0)])}else if(n.textContent.split(" ").length<=2&&n.previousSibling&&"A"===n.previousSibling.tagName){var r=n.previousSibling.innerText+n.textContent;l().test(s(r))&&(f(n.previousSibling).replaceWith(a(r)),n.parentNode.removeChild(n))}}var p=null;return{_init:function(){i.events.on("keypress",function(e){!i.selection.isCollapsed()||"."!=e.key&&")"!=e.key&&"("!=e.key||t()},!0),i.events.on("keydown",function(e){var n=e.which;!i.selection.isCollapsed()||n!=f.FE.KEYCODE.ENTER&&n!=f.FE.KEYCODE.SPACE||t()},!0),i.events.on("paste.beforeCleanup",function(e){if(i.helpers.isURL(e)){var n=null;return i.opts.linkAlwaysBlank&&(i.opts.linkNoOpener&&(n?n+=" noopener":n="noopener"),i.opts.linkNoReferrer&&(n?n+=" noreferrer":n="noreferrer")),"<a"+(i.opts.linkAlwaysBlank?' target="_blank"':"")+(n?' rel="'+n+'"':"")+' href="'+e+'" >'+e+"</a>"}})}}}});