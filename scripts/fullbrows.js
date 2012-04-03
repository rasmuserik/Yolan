// imports
var util = require('util');
var webutil = require('webutil');
var $ = require('zquery');
var window = require('window');
var Modernizr = require('modernizr');

// # Fullbrows is an api for full-screen browser apps
//
// An app consist is an object with the following values:
//
// - start()
// - update()
// - stop()
// - type: fullscreen | scrollable
// - package

// # Browser window setup
var relayoutFn;
var browsOpt = {};
function relayout() {
    $('#content')
        .css('position', 'absolute')
        .css('left', 0)
        .css('top', 1)
        .css('overflow', 'hidden')
        .css('font-family', 'sans-serif')
        .css('width', $(window).width())
        .css('height', (browsOpt.type === 'scrollable') ? 'auto' : webutil.windowHeight());
    if(typeof relayoutFn === 'function') {
        relayoutFn(window.document.getElementById('content'));
    }
    window.scrollTo(0,1);
}
var relayoutDelayed = util.niceSingle(relayout);

exports.start= function(opt) {
    if(typeof browsOpt.stop === 'function') {
        browsOpt.stop();
    }
    browsOpt = opt || {};
    browsOpt.type = browsOpt.type || 'fullscreen';
    if(!window.document.getElementById('content')) {
        $('body').append('<div id="content"></div>');
    }
    if(!Modernizr.touch) {
        $('body').css('overflow', 'hidden');
    } else {
        if($('#addressbarfillerdisable').length === 0) {
            $('body').append('<div id="addressbarfillerdisable" style="height:' +
                (Math.max(webutil.windowHeight(),$(window).width()) + 62) +
                'px;"></div>');
        }
    }
    $(window).bind('resize', relayoutDelayed);
    $(window).bind('orientationchange', relayoutDelayed);
    relayoutFn = browsOpt.start || browsOpt.update;
    relayout();
    relayoutFn = browsOpt.update;
};

exports.startFn = function(app) { return function() { exports.start(app); } ; };
