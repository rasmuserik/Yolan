var tree;
exports.app = {
    underbar: true,
    type: 'canvas',
    start: function() {
        initTree();
        treeParent(tree);
        var canvas = this.elem;
        canvas.height = this.$.height();
        canvas.width = this.$.width();
        var ctx = canvas.getContext('2d');

        function treeParent(tree, prev) {
            if(Array.isArray(tree)) {
                tree.parent = prev;
                tree.forEach(function(subtree) { treeParent(subtree, tree); });
            }
        }


        var textsize = 14;
        ctx.font = textsize+'px sans-serif';
        ctx.lineWidth = 0.3;
        ctx.textBaseline= 'bottom';
        ctx.fillStyle = '#ccc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBox({val: tree, x: 0.5, y: 0.5, w: canvas.width, h: canvas.height});
        //drawBox({val: ['hello world', ['aoo', 'bar', ['baz']], ['boo', 'bar', ['baz'], ['coo', 'bar', ['baz'], ['doo', 'bar', ['baz']], ['eoo', 'bar', ['baz']]]], ['foo', 'bar', ['baz']]], x: 0.5, y: 0.5, w: canvas.width-1, h: canvas.height-1});

        function drawBox(obj) {
            //console.log('drawBox', obj);
            var w = obj.w;
            var h = obj.h;
            var x = obj.x;
            var y = obj.y;
            //console.log('y0:', y);
            var val = obj.val;
            var size = lineSize(obj.val, obj.w);
            if(Array.isArray(val)) {
                ctx.fillStyle = '#' + (0xc0c0c0 | Math.random() * 0x1000000).toString(16);
                ctx.fillRect(x, y, w, h);
                ctx.fillStyle = '#000';
                ctx.fillRect(x, y, w, 1);
                ctx.fillRect(x, y, 1, h);
                ctx.fillStyle = '#fff';
                ctx.fillRect(x, y+h, w, 1);
                ctx.fillRect(x+w, y, 1, h);
                ctx.fillStyle = '#000';
                x += 8; y += 4; h -= 8; w-= 12;
                var x1 = x + 8;
                var w1 = x + 8;
                for(var i = 0; i < val.length; ++i) {
                    var childSize = boxSize(val[i], w);
                    var child = {
                            x: x,
                            y: y,
                            h: childSize.h,
                            w: w,
                            val: val[i] };
                    //console.log('child', child);
                    if(childSize.w < w) {
                        drawLine(child);
                    } else {
                        drawBox(child);
                    }
                    //w = w1; x = x1;
                    //console.log('y1:', y);
                    y += childSize.h + 2;
                    //console.log('y2:', y, childSize);
                }
                return;
            }
            ctx.fillText(val, x, y + textsize);
        }
        function boxSize(obj, w) {
            var line = lineSize(obj);
            if(Array.isArray(obj)) {
                if(obj.boxSize) {
                    return obj.boxSize;
                }
                if(line.w > w && Array.isArray(obj)) {
                    var h = 2;
                    for(var i = 0; i < obj.length; ++i) {
                        h += boxSize(obj[i], w - 12).h + 2;
                    }
                    obj.boxSize = {w : w, h: h+4};
                } else {
                    obj.boxSize = line;
                }
                return obj.boxSize;
            }
            return line;
        }
        
        function drawLine(obj) {
            //console.log('drawLine',(obj));
            var size = lineSize(obj.val);
            var x = obj.x;
            var y = obj.y;
            var h = obj.h;
            var val = obj.val;
            y = y + (h - size.h) / 2;
            h = size.h;
            var w = size.w;
            if(Array.isArray(val)) {
                ctx.fillStyle = '#' + (0xc0c0c0 | Math.random() * 0x1000000).toString(16);
                ctx.fillRect(x, y, w, h);
                ctx.fillStyle = '#000';
                ctx.fillRect(x, y, w, 1);
                ctx.fillRect(x, y, 1, h);
                ctx.fillStyle = '#fff';
                ctx.fillRect(x, y+h, w, 1);
                ctx.fillRect(x+w, y, 1, h);
                ctx.fillStyle = '#000';
                x += 2; y += 2; h -= 4;
                var pos = 2;
                ++x;
                for(var i = 0; i < val.length; ++i) {
                    var child = val[i];
                    var childsize = lineSize(val[i]);
                    drawLine({val: child,
                            x: x, y: y, h: h});
                    x += childsize.w + 3;
                }
                return;
            }
            if(true || typeof val === 'string') {
                ctx.fillText(val, x, y + textsize);
                return;
            }
            throw 'wrong type';
        }
        function lineSize(val) {
            //console.log('lineSize', val);
            if(!Array.isArray(val)) {
                val = '' + val;
            }

            if(typeof val === 'string') {
                return {
                    w: ctx.measureText(val).width,
                    h: textsize
                };
            }
            if(val.lineSize) {
                return val.lineSize;
            }
            if(Array.isArray(val)) {
                var w = 2;
                var h = textsize + 2;
                for(var i = 0; i < val.length; ++i) {
                    var size = lineSize(val[i]);
                    w += size.w + 3;
                    h = Math.max(h, size.h + 6);
                }
                val.lineSize = {w: w, h: h};
                return val.lineSize;
            }
            throw 'wrong type';
        }
    },
    stop: function() {
        tree = undefined;
    }
};
function initTree() { tree = ["toplevel",[["var",[["$",["call",["name","require"],[["string","zquery"]]]]]],["var",[["_",["call",["name","require"],[["string","underscore"]]]]]],["var",[["webutil",["call",["name","require"],[["string","webutil"]]]]]],["var",[["fullbrows",["call",["name","require"],[["string","fullbrows"]]]]]],["var",[["Modernizr",["call",["name","require"],[["string","modernizr"]]]]]],["stat",["assign",true,["dot",["name","exports"],"app"],["object",[["start",["name","startGame"]],["update",["name","doLayout"]]]]]],["var",[["difficulty"]]],["var",[["prevtime"]]],["var",[["giveup"]]],["var",[["selected",["object",[]]]]],["var",[["cards",["array",[]]]]],["var",[["hidden",["object",[["opacity",["num",0]],["width",["num",0]],["height",["num",0]]]]]]],["var",[["transitionStyle",["object",[["transition",["string","opacity 1s"]],["-moz-transition",["string","opacity 1s"]],["-webkit-transition",["string","opacity 1s"]],["-o-transition",["string","opacity 1s"]]]]]]],["var",[["visibleStyle"]]],["var",[["selectedStyle"]]],["var",[["unselectedStyle"]]],["var",[["cardPositions"]]],["var",[["doLayout",["function",null,[],[["var",[["$content",["call",["name","$"],[["string","#content"]]]]]],["stat",["call",["dot",["name","$content"],"css"],[["string","background"],["string","white"]]]],["var",[["w",["call",["dot",["name","$content"],"width"],[]]]]],["var",[["h",["call",["dot",["name","$content"],"height"],[]]]]],["var",[["topPad"],["leftPad"]]],["var",[["landscape",["name","true"]]]],["var",[["i"],["x"],["y"]]],["var",[["size"]]],["stat",["assign",true,["name","cardPositions"],["array",[]]]],["stat",["assign",true,["name","size"],["call",["dot",["name","Math"],"min"],[["binary","/",["call",["dot",["name","Math"],"max"],[["name","w"],["name","h"]]],["num",4]],["binary","/",["call",["dot",["name","Math"],"min"],[["name","w"],["name","h"]]],["num",3]]]]]],["if",["binary",">",["name","w"],["name","h"]],["block",[["stat",["assign",true,["name","topPad"],["binary",">>",["binary","-",["name","h"],["binary","*",["name","size"],["num",3]]],["num",1]]]],["stat",["assign",true,["name","leftPad"],["binary",">>",["binary","-",["name","w"],["binary","*",["name","size"],["num",4]]],["num",1]]]]]],["block",[["stat",["assign",true,["name","topPad"],["binary",">>",["binary","-",["name","h"],["binary","*",["name","size"],["num",4]]],["num",1]]]],["stat",["assign",true,["name","leftPad"],["binary",">>",["binary","-",["name","w"],["binary","*",["name","size"],["num",3]]],["num",1]]]],["stat",["assign",true,["name","landscape"],["name","false"]]]]]],["stat",["assign","+",["name","topPad"],["num",0]]],["stat",["assign","+",["name","leftPad"],["num",0]]],["for",["assign",true,["name","i"],["num",0]],["binary","<",["name","i"],["num",12]],["unary-prefix","++",["name","i"]],["block",[["if",["name","landscape"],["block",[["stat",["call",["dot",["name","cardPositions"],"push"],[["object",[["top",["binary","+",["name","topPad"],["binary","*",["binary","+",["num",0.5],["binary","%",["name","i"],["num",3]]],["name","size"]]]],["left",["binary","+",["name","leftPad"],["binary","*",["binary","+",["num",0.5],["binary","|",["binary","/",["name","i"],["num",3]],["num",0]]],["name","size"]]]]]]]]]]],["block",[["stat",["call",["dot",["name","cardPositions"],"push"],[["object",[["left",["binary","+",["name","leftPad"],["binary","*",["binary","+",["num",0.5],["binary","%",["name","i"],["num",3]]],["name","size"]]]],["top",["binary","+",["name","topPad"],["binary","*",["binary","+",["num",0.5],["binary","|",["binary","/",["name","i"],["num",3]],["num",0]]],["name","size"]]]]]]]]]]]]]]],["stat",["assign",true,["name","visibleStyle"],["object",[["opacity",["num",1]],["margin-top",["binary","/",["unary-prefix","-",["name","size"]],["num",2]]],["margin-left",["binary","/",["unary-prefix","-",["name","size"]],["num",2]]],["background",["string","none"]],["width",["binary","*",["num",0.9],["name","size"]]],["height",["binary","*",["num",0.9],["name","size"]]]]]]],["stat",["assign",true,["name","selectedStyle"],["object",[["border-style",["string","solid"]],["border-width",["num",1]],["margin-top",["binary","-",["binary","/",["unary-prefix","-",["name","size"]],["num",2]],["num",1]]],["margin-left",["binary","-",["binary","/",["unary-prefix","-",["name","size"]],["num",2]],["num",1]]],["border-radius",["binary","/",["name","size"],["num",16]]],["border-color",["string","gray"]]]]]],["stat",["assign",true,["name","unselectedStyle"],["object",[["margin-top",["binary","/",["unary-prefix","-",["name","size"]],["num",2]]],["margin-left",["binary","/",["unary-prefix","-",["name","size"]],["num",2]]],["border",["string","none"]]]]]],["stat",["call",["dot",["call",["name","$"],[["string",".card"]]],"css"],[["object",[["top",["name","h"]],["left",["name","w"]]]]]]],["for",["assign",true,["name","i"],["num",0]],["binary","<",["name","i"],["num",12]],["unary-prefix","++",["name","i"]],["block",[["stat",["call",["call",["name","anim"],[["name","i"],["call",["name","$"],[["binary","+",["string","#card"],["sub",["name","cards"],["name","i"]]]]]]],[]]]]]]]]]]],["defun","anim",["i","$card"],[["return",["function",null,[],[["stat",["call",["dot",["name","$card"],"css"],[["sub",["name","cardPositions"],["name","i"]]]]],["stat",["call",["name","setTimeout"],[["function",null,[],[["stat",["call",["dot",["call",["dot",["name","$card"],"css"],[["name","transitionStyle"]]],"css"],[["name","visibleStyle"]]]]]],["num",0]]]]]]]]],["var",[["click",["call",["function",null,[],[["var",[["lastClickTime",["num",0]]]],["var",[["prevCard",["string",""]]]],["return",["function",null,["card"],[["if",["binary","&&",["binary","===",["name","card"],["name","prevCard"]],["binary","<",["binary","-",["call",["dot",["name","Date"],"now"],[]],["name","lastClickTime"]],["num",100]]],["block",[["return",null]]],null],["stat",["assign",true,["name","prevCard"],["name","card"]]],["stat",["assign",true,["name","lastClickTime"],["call",["dot",["name","Date"],"now"],[]]]],["if",["sub",["name","selected"],["name","card"]],["block",[["stat",["call",["dot",["call",["name","$"],[["binary","+",["string","#card"],["name","card"]]]],"css"],[["name","unselectedStyle"]]]],["stat",["unary-prefix","delete",["sub",["name","selected"],["name","card"]]]]]],["block",[["stat",["call",["dot",["call",["name","$"],[["binary","+",["string","#card"],["name","card"]]]],"css"],[["name","selectedStyle"]]]],["stat",["assign",true,["sub",["name","selected"],["name","card"]],["name","true"]]]]]],["stat",["call",["name","testSelected"],[]]]]]]]],[]]]]],["defun","reshuffle",["shuffleFn"],[["var",[["score"],["bestscore",["unary-prefix","-",["num",10000]]],["saved"]]],["var",[["i"]]],["for",["assign",true,["name","i"],["num",0]],["binary","<",["name","i"],["num",10]],["unary-prefix","++",["name","i"]],["block",[["do",["unary-prefix","!",["name","score"]],["block",[["stat",["call",["name","shuffleFn"],[]]],["stat",["assign",true,["name","score"],["call",["name","okDeck"],[]]]]]]],["if",["binary","===",["name","difficulty"],["string","normal"]],["block",[["stat",["assign",true,["name","saved"],["name","cards"]]],["break",null]]],null],["if",["binary","===",["name","difficulty"],["string","hard"]],["block",[["stat",["assign",true,["name","score"],["unary-prefix","-",["name","score"]]]]]],null],["if",["binary",">",["name","score"],["name","bestscore"]],["block",[["stat",["assign",true,["name","saved"],["call",["dot",["name","cards"],"slice"],[["num",0]]]]],["stat",["assign",true,["name","bestscore"],["name","score"]]]]],null]]]],["stat",["assign",true,["name","cards"],["name","saved"]]]]],["var",[["logData"]]],["var",[["curDate"]]],["defun","log",["obj"],[["stat",["call",["name","setTimeout"],[["function",null,[],[["var",[["objDate",["binary","|",["binary","/",["binary","/",["binary","/",["binary","/",["dot",["name","obj"],"now"],["num",24]],["num",60]],["num",60]],["num",1000]],["num",0]]]]],["if",["binary","!==",["name","objDate"],["name","curDate"]],["block",[["stat",["assign",true,["name","curDate"],["name","objDate"]]],["stat",["assign",true,["name","logData"],["call",["dot",["name","JSON"],"parse"],[["binary","||",["call",["dot",["name","localStorage"],"getItem"],[["binary","+",["string","combigamelog"],["name","curDate"]]]],["string","[]"]]]]]]]],null],["stat",["assign",true,["name","logData"],["binary","||",["name","logData"],["array",[]]]]],["stat",["call",["dot",["name","logData"],"push"],[["name","obj"]]]],["stat",["call",["dot",["name","localStorage"],"setItem"],[["binary","+",["string","combigamelog"],["name","curDate"]],["call",["dot",["name","JSON"],"stringify"],[["name","logData"]]]]]]]],["num",0]]]]]],["defun","showScore",[],[["stat",["call",["dot",["name","fullbrows"],"start"],[["object",[["hideButtons",["name","true"]],["update",["function",null,[],[["var",[["$t",["call",["name","$"],[["string","<div>"]]]]]],["var",[["log",["call",["dot",["call",["dot",["call",["name","_"],[["name","logData"]]],"filter"],[["function",null,["elem"],[["return",["binary","&&",["unary-prefix","!",["dot",["name","elem"],"hint"]],["binary","===",["dot",["name","elem"],"difficulty"],["name","difficulty"]]]]]]]],"sort"],[["function",null,["a","b"],[["return",["binary","-",["dot",["name","a"],"time"],["dot",["name","b"],"time"]]]]]]]]]],["stat",["call",["dot",["name","$t"],"append"],[["call",["name","$"],[["binary","+",["binary","+",["string","<h3>Timings "],["name","difficulty"]],["string","</h3>"]]]]]]],["if",["binary","===",["dot",["name","log"],"length"],["num",0]],["block",[["stat",["call",["dot",["name","$t"],"append"],[["string","<p>No score available for this difficulty, please play the game before looking at the timings.</p>"]]]]]],null],["stat",["call",["name","partialScore"],[["name","$t"],["string","Today"],["name","log"]]]],["stat",["call",["name","partialScore"],[["name","$t"],["string","Last five minutes"],["call",["dot",["name","log"],"filter"],[["function",null,["elem"],[["return",["binary","<",["binary","-",["call",["dot",["name","Date"],"now"],[]],["dot",["name","elem"],"now"]],["binary","*",["binary","*",["num",5],["num",60]],["num",1000]]]]]]]]]]],["stat",["call",["name","partialScore"],[["name","$t"],["string","Last minute"],["call",["dot",["name","log"],"filter"],[["function",null,["elem"],[["return",["binary","<",["binary","-",["call",["dot",["name","Date"],"now"],[]],["dot",["name","elem"],"now"]],["binary","*",["num",60],["num",1000]]]]]]]]]]],["stat",["call",["dot",["name","$t"],"append"],[["string","<p>Click to close.</p>"]]]],["stat",["call",["dot",["call",["dot",["call",["name","$"],[["string","#content"]]],"html"],[["string",""]]],"append"],[["name","$t"]]]],["stat",["call",["dot",["name","$t"],"css"],[["object",[["width",["string","80%"]],["height",["string","90%"]]]]]]],["stat",["call",["dot",["name","webutil"],"scaleText"],[["name","$t"]]]],["stat",["call",["dot",["name","$t"],"css"],[["object",[["margin",["string","3% 10% 7% 10%"]],["overflow",["string","visible"]]]]]]],["stat",["call",["dot",["name","$t"],"bind"],[["string","mousedown touchstart"],["call",["dot",["name","fullbrows"],"startFn"],[["dot",["name","exports"],"app"]]]]]]]]]]]]]]]],["defun","partialScore",["$t","title","log"],[["if",["binary",">",["dot",["name","log"],"length"],["num",0]],["block",[["if",["name","title"],["block",[["stat",["call",["dot",["name","$t"],"append"],[["call",["name","$"],[["binary","+",["binary","+",["string","<div><b>"],["name","title"]],["string","</b></div>"]]]]]]]]],null],["stat",["call",["dot",["name","$t"],"append"],[["call",["name","$"],[["binary","+",["binary","+",["string","<div>Best time: "],["binary","/",["binary","|",["binary","/",["dot",["sub",["name","log"],["num",0]],"time"],["num",10]],["num",0]],["num",100]]],["string","s"]]]]]]],["stat",["call",["dot",["name","$t"],"append"],[["call",["name","$"],[["binary","+",["binary","+",["string","<div>Median time: "],["binary","/",["binary","|",["binary","/",["dot",["sub",["name","log"],["binary",">>",["dot",["name","log"],"length"],["num",1]]],"time"],["num",10]],["num",0]],["num",100]]],["string","s"]]]]]]]]],null]]],["defun","testSelected",[],[["var",[["list",["call",["dot",["name","Object"],"keys"],[["name","selected"]]]]]],["if",["binary","<",["dot",["name","list"],"length"],["num",3]],["block",[["return",null]]],null],["if",["call",["name","okSet"],[["sub",["name","list"],["num",0]],["sub",["name","list"],["num",1]],["sub",["name","list"],["num",2]]]],["block",[["var",[["now",["call",["dot",["name","Date"],"now"],[]]]]],["stat",["call",["name","log"],[["object",[["time",["binary","-",["name","now"],["name","prevtime"]]],["hint",["name","giveup"]],["cards",["call",["dot",["name","cards"],"slice"],[["num",0]]]],["choosen",["name","list"]],["now",["name","now"]],["difficulty",["name","difficulty"]]]]]]],["stat",["assign",true,["name","giveup"],["name","false"]]],["stat",["assign",true,["name","prevtime"],["name","now"]]],["stat",["call",["name","setTimeout"],[["function",null,[],[["stat",["call",["dot",["name","list"],"forEach"],[["function",null,["id"],[["stat",["call",["dot",["call",["name","$"],[["binary","+",["string","#card"],["name","id"]]]],"css"],[["string","opacity"],["num",0]]]]]]]]]]],["num",0]]]],["stat",["call",["name","setTimeout"],[["function",null,[],[["stat",["call",["dot",["call",["name","$"],[["string",".card"]]],"css"],[["name","unselectedStyle"]]]],["var",[["ids",["array",[["call",["dot",["call",["name","_"],[["name","cards"]]],"indexOf"],[["sub",["name","list"],["num",0]]]],["call",["dot",["call",["name","_"],[["name","cards"]]],"indexOf"],[["sub",["name","list"],["num",1]]]],["call",["dot",["call",["name","_"],[["name","cards"]]],"indexOf"],[["sub",["name","list"],["num",2]]]]]]]]],["stat",["call",["name","reshuffle"],[["function",null,[],[["for",["var",[["i",["num",0]]]],["binary","<",["name","i"],["num",3]],["unary-prefix","++",["name","i"]],["block",[["stat",["assign",true,["sub",["name","cards"],["sub",["name","ids"],["name","i"]]],["call",["name","randomCard"],[]]]]]]]]]]]],["stat",["call",["name","doLayout"],[]]]]],["num",1000]]]]]],["block",[["stat",["call",["dot",["call",["name","$"],[["string",".card"]]],"css"],[["name","unselectedStyle"]]]]]]],["stat",["assign",true,["name","selected"],["object",[]]]]]],["defun","randomCard",[],[["return",["binary","+",["binary","+",["binary","+",["binary","+",["string",""],["call",["name","rnd3"],[]]],["call",["name","rnd3"],[]]],["call",["name","rnd3"],[]]],["call",["name","rnd3"],[]]]]]],["defun","rnd3",[],[["return",["binary","|",["binary","*",["call",["dot",["name","Math"],"random"],[]],["num",3]],["num",0]]]]],["defun","okSet",["a","b","c"],[["for",["var",[["i",["num",0]]]],["binary","<",["name","i"],["num",4]],["unary-prefix","++",["name","i"]],["block",[["var",[["ok",["binary","||",["binary","&&",["binary","===",["sub",["name","a"],["name","i"]],["sub",["name","b"],["name","i"]]],["binary","===",["sub",["name","b"],["name","i"]],["sub",["name","c"],["name","i"]]]],["binary","&&",["binary","&&",["binary","!==",["sub",["name","a"],["name","i"]],["sub",["name","b"],["name","i"]]],["binary","!==",["sub",["name","b"],["name","i"]],["sub",["name","c"],["name","i"]]]],["binary","!==",["sub",["name","c"],["name","i"]],["sub",["name","a"],["name","i"]]]]]]]],["if",["unary-prefix","!",["name","ok"]],["block",[["return",["name","false"]]]],null]]]],["return",["name","true"]]]],["defun","hint",[],[["stat",["assign",true,["name","selected"],["object",[]]]],["stat",["call",["dot",["call",["name","$"],[["string",".card"]]],"css"],[["name","unselectedStyle"]]]],["var",[["a"],["b"],["c"]]],["for",["assign",true,["name","a"],["num",0]],["binary","<",["name","a"],["num",10]],["unary-prefix","++",["name","a"]],["block",[["for",["assign",true,["name","b"],["binary","+",["name","a"],["num",1]]],["binary","<",["name","b"],["num",11]],["unary-prefix","++",["name","b"]],["block",[["for",["assign",true,["name","c"],["binary","+",["name","b"],["num",1]]],["binary","<",["name","c"],["num",12]],["unary-prefix","++",["name","c"]],["block",[["if",["call",["name","okSet"],[["sub",["name","cards"],["name","a"]],["sub",["name","cards"],["name","b"]],["sub",["name","cards"],["name","c"]]]],["block",[["stat",["call",["dot",["call",["dot",["call",["name","$"],[["binary","+",["string","#card"],["sub",["name","cards"],["name","a"]]]]],"css"],[["name","selectedStyle"]]],"css"],[["object",[["opacity",["num",0.6]],["background",["string","#ccc"]],["border",["string","1px solid #bbb"]]]]]]],["stat",["call",["dot",["call",["dot",["call",["name","$"],[["binary","+",["string","#card"],["sub",["name","cards"],["name","b"]]]]],"css"],[["name","selectedStyle"]]],"css"],[["object",[["opacity",["num",0.6]],["background",["string","#ccc"]],["border",["string","1px solid #bbb"]]]]]]],["stat",["call",["dot",["call",["dot",["call",["name","$"],[["binary","+",["string","#card"],["sub",["name","cards"],["name","c"]]]]],"css"],[["name","selectedStyle"]]],"css"],[["object",[["opacity",["num",0.6]],["background",["string","#ccc"]],["border",["string","1px solid #bbb"]]]]]]],["stat",["assign",true,["name","giveup"],["name","true"]]],["return",null]]],null]]]]]]]]]]]],["defun","okDeck",[],[["var",[["cardHash",["object",[]]]]],["var",[["a"],["b"],["c"]]],["var",[["i"]]],["var",[["ok",["num",0]]]],["for",["assign",true,["name","i"],["num",0]],["binary","<",["name","i"],["num",12]],["unary-prefix","++",["name","i"]],["block",[["if",["sub",["name","cardHash"],["sub",["name","cards"],["name","i"]]],["block",[["return",["name","false"]]]],null],["stat",["assign",true,["sub",["name","cardHash"],["sub",["name","cards"],["name","i"]]],["name","true"]]]]]],["for",["assign",true,["name","a"],["num",0]],["binary","<",["name","a"],["num",10]],["unary-prefix","++",["name","a"]],["block",[["for",["assign",true,["name","b"],["binary","+",["name","a"],["num",1]]],["binary","<",["name","b"],["num",11]],["unary-prefix","++",["name","b"]],["block",[["for",["assign",true,["name","c"],["binary","+",["name","b"],["num",1]]],["binary","<",["name","c"],["num",12]],["unary-prefix","++",["name","c"]],["block",[["if",["call",["name","okSet"],[["sub",["name","cards"],["name","a"]],["sub",["name","cards"],["name","b"]],["sub",["name","cards"],["name","c"]]]],["block",[["stat",["unary-prefix","++",["name","ok"]]]]],null]]]]]]]]]],["return",["name","ok"]]]],["defun","startGame",[],[["stat",["assign",true,["name","giveup"],["name","false"]]],["var",[["$content",["call",["name","$"],[["string","#content"]]]]]],["stat",["call",["dot",["name","$content"],"html"],[["string",""]]]],["stat",["assign",true,["name","prevtime"],["call",["dot",["name","Date"],"now"],[]]]],["var",[["i"],["j"],["k"],["l"]]],["for",["assign",true,["name","i"],["num",0]],["binary","<",["name","i"],["num",3]],["unary-prefix","++",["name","i"]],["block",[["for",["assign",true,["name","j"],["num",0]],["binary","<",["name","j"],["num",3]],["unary-prefix","++",["name","j"]],["block",[["for",["assign",true,["name","k"],["num",0]],["binary","<",["name","k"],["num",3]],["unary-prefix","++",["name","k"]],["block",[["for",["assign",true,["name","l"],["num",0]],["binary","<",["name","l"],["num",3]],["unary-prefix","++",["name","l"]],["block",[["stat",["call",["dot",["name","$content"],"append"],[["call",["name","$"],[["binary","+",["binary","+",["binary","+",["binary","+",["binary","+",["binary","+",["binary","+",["binary","+",["binary","+",["binary","+",["string","<img class=\"card\" src=\"dist/combigame"],["name","i"]],["name","j"]],["name","k"]],["name","l"]],["string",".png\" id=\"card"]],["name","i"]],["name","j"]],["name","k"]],["name","l"]],["string","\">"]]]]]]]]]]]]]]]]]]],["stat",["call",["dot",["call",["name","$"],[["string",".card"]]],"css"],[["object",[["position",["string","absolute"]],["opacity",["string","0"]]]]]]],["stat",["call",["dot",["call",["name","$"],[["string",".card"]]],"bind"],[["string","touchstart mousedown"],["function",null,["e"],[["stat",["call",["name","click"],[["call",["dot",["dot",["dot",["name","e"],"target"],"id"],"slice"],[["num",4]]]]]],["stat",["call",["dot",["name","e"],"preventDefault"],[]]],["return",["name","true"]]]]]]],["stat",["assign",true,["name","difficulty"],["binary","||",["binary","||",["name","difficulty"],["call",["dot",["name","localStorage"],"getItem"],[["string","combigameDifficulty"]]]],["string","normal"]]]],["stat",["call",["dot",["name","fullbrows"],"addButton"],[["object",[["imagePath",["string","img/help.png"]],["callback",["name","showHelp"]]]]]]],["stat",["call",["dot",["name","fullbrows"],"addButton"],[["object",[["imagePath",["string","img/give-up.png"]],["callback",["name","hint"]]]]]]],["stat",["call",["dot",["name","fullbrows"],"addButton"],[["object",[["imagePath",["string","img/score.png"]],["callback",["name","showScore"]]]]]]],["stat",["call",["dot",["name","fullbrows"],"addButton"],[["object",[["text",["binary","+",["string",""],["name","difficulty"]]],["callback",["name","showDifficulty"]]]]]]],["defun","showHelp",[],[["stat",["call",["dot",["name","fullbrows"],"start"],[["object",[["hideButtons",["name","true"]],["update",["function",null,[],[["var",[["html",["call",["dot",["call",["name","require"],[["string","jsxml"]]],"toXml"],[["array",[["string","div"],["array",[["string","h2"],["string","CombiGame"]]],["string","Game objectives: click on combinations of three figures where color, count, shape, and fill, are either the same or all different."],["array",[["string","br"]]],["array",[["string","p"],["array",[["string","img"],["object",[["style",["string","height: 1.5em; width: 1.5em;"]],["src",["string","img/give-up.png"]]]]]],["string"," shows a valid combination among the figures."],["array",[["string","br"]]],["array",[["string","img"],["object",[["style",["string","height: 1.5em; width: 1.5em;"]],["src",["string","img/difficulty.png"]]]]]],["string"," sets difficulty • easy    : ca. 6 valid combinations • hard: 1 valid combination • normal: random number of valid combinations."],["array",[["string","br"]]],["array",[["string","img"],["object",[["style",["string","height: 1.5em; width: 1.5em;"]],["src",["string","img/score.png"]]]]]],["string"," shows latest timing for the current difficulty."],["array",[["string","br"]]]]],["string","Click to close."]]]]]]]],["var",[["$t",["call",["name","$"],[["string","<div>"]]]]]],["stat",["call",["dot",["name","$t"],"html"],[["name","html"]]]],["stat",["call",["dot",["call",["dot",["call",["name","$"],[["string","#content"]]],"html"],[["string",""]]],"append"],[["name","$t"]]]],["stat",["call",["dot",["name","$t"],"css"],[["object",[["width",["string","90%"]],["height",["string","90%"]]]]]]],["stat",["call",["dot",["name","webutil"],"scaleText"],[["name","$t"]]]],["stat",["call",["dot",["name","$t"],"css"],[["object",[["margin",["string","2% 5% 8% 5%"]],["overflow",["string","visible"]]]]]]],["stat",["call",["dot",["name","$t"],"bind"],[["string","mousedown touchstart"],["call",["dot",["name","fullbrows"],"startFn"],[["dot",["name","exports"],"app"]]]]]]]]]]]]]]]],["defun","showDifficulty",[],[["stat",["call",["name","menu"],[["object",[["easy",["function",null,[],[["stat",["assign",true,["name","difficulty"],["string","easy"]]],["stat",["call",["dot",["name","fullbrows"],"start"],[["dot",["name","exports"],"app"]]]]]]],["normal",["function",null,[],[["stat",["assign",true,["name","difficulty"],["string","normal"]]],["stat",["call",["dot",["name","fullbrows"],"start"],[["dot",["name","exports"],"app"]]]]]]],["hard",["function",null,[],[["stat",["assign",true,["name","difficulty"],["string","hard"]]],["stat",["call",["dot",["name","fullbrows"],"start"],[["dot",["name","exports"],"app"]]]]]]]]]]]]]],["stat",["call",["dot",["name","localStorage"],"setItem"],[["string","combigameDifficulty"],["name","difficulty"]]]],["stat",["call",["name","reshuffle"],[["function",null,[],[["stat",["assign",true,["name","cards"],["array",[]]]],["for",["var",[["i",["num",0]]]],["binary","<",["name","i"],["num",12]],["unary-prefix","++",["name","i"]],["block",[["stat",["call",["dot",["name","cards"],"push"],[["call",["name","randomCard"],[]]]]]]]]]]]]],["stat",["call",["name","doLayout"],[]]]]],["defun","menu",["items"],[["stat",["call",["dot",["name","fullbrows"],"start"],[["object",[["hideButtons",["name","true"]],["update",["function",null,[],[["var",[["item"]]],["var",[["s",["call",["dot",["name","Math"],"min"],[["binary","+",["call",["dot",["call",["name","$"],[["string","#content"]]],"height"],[]],["call",["dot",["call",["name","$"],[["string","#content"]]],"width"],[]]]]]]]],["var",[["$menu",["call",["name","$"],[["string","<div>"]]]]]],["var",[["$content",["call",["name","$"],[["string","#content"]]]]]],["stat",["call",["dot",["call",["dot",["name","$content"],"html"],[["string",""]]],"append"],[["name","$menu"]]]],["for-in",["name","item"],["name","item"],["name","items"],["block",[["stat",["call",["dot",["name","$menu"],"append"],[["call",["dot",["call",["dot",["call",["dot",["call",["name","$"],[["string","<div>"]]],"text"],[["name","item"]]],"css"],[["object",[["border",["string","1px solid black"]],["border-radius",["binary","*",["name","s"],["num",0.02]]],["text-align",["string","center"]],["margin",["binary","*",["name","s"],["num",0.01]]],["padding",["binary","*",["name","s"],["num",0.01]]]]]]],"bind"],[["string","click"],["sub",["name","items"],["name","item"]]]]]]]]]],["stat",["call",["dot",["name","webutil"],"scaleText"],[["name","$content"]]]],["stat",["call",["dot",["name","$content"],"css"],[["string","font-size"],["binary","*",["call",["name","parseInt"],[["call",["dot",["name","$content"],"css"],[["string","font-size"]]],["num",10]]],["num",0.8]]]]],["stat",["call",["dot",["name","$menu"],"css"],[["string","top"],["binary","/",["binary","-",["call",["dot",["name","$content"],"height"],[]],["call",["dot",["name","$menu"],"height"],[]]],["num",2]]]]],["stat",["call",["dot",["name","$menu"],"css"],[["string","position"],["string","absolute"]]]],["stat",["call",["dot",["name","$menu"],"css"],[["string","width"],["string","100%"]]]]]]]]]]]]]]]]; }
