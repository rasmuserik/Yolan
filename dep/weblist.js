var yolan = module.require("./yolan");

var syntax = module.require("./syntax");

var webcolor = module.require("./webcolor");

var listobject = module.require("./listobject");

var test = module.require("./test");

exports["newElem"] = function(elemType, text) {
    var elem = document.createElement(elemType);
    elem.appendChild(document.createTextNode(text));
    return elem;
};

exports["style2css"] = function(style) {
    var keys = Object.keys(style);
    var result = [];
    var i = 0;
    while (i < keys["length"]) {
        var key = keys[i];
        result.push(".");
        result.push(key);
        result.push("{");
        result.push(style[key].map(function(elem) {
            return elem[0] + ":" + elem.slice(1).join(" ");
        }).join(";"));
        result.push("}\n");
        i = i + 1;
    }
    return result.join("");
};

exports["style"] = {
    listAtom: [ [ "margin", "0em", ".0em", "0em", ".0em" ], [ "background-color", "rgba(255,255,255,0.5)" ], [ "border-radius", ".3em" ], [ "white-space", "pre-wrap" ], [ "font-family", "sans-serif" ] ],
    list: [ [ "padding", ".1em", ".1em", ".1em", ".2em" ], [ "margin", ".1em", ".1em", ".1em", ".1em" ], [ "display", "inline-block" ], [ "border-radius", ".3em" ], [ "border", ".1em", "solid" ], [ "box-shadow", ".2em", ".2em", ".6em", "rgba(0,0,0,.4)" ] ]
};

document.getElementsByTagName("head")[0].appendChild(exports.newElem("style", exports.style2css(exports["style"])));

exports["randomColor"] = function(elem) {
    var color = Math.random() * 16777216 & 16777215;
    var style = elem["style"];
    style["backgroundColor"] = webcolor.intToColor(14737632 | color / 8);
    style["borderColor"] = webcolor.intToColor(color);
};

console.log(document.getElementsByTagName("head")[0]);

console.log(exports.style2css(exports["style"]));

var obj2html = function(obj) {
    if (obj["value"]) {
        var span = exports.newElem("span", JSON.stringify(obj["value"]).slice(1, -1));
        span["className"] = "listAtom";
        obj["elem"] = span;
        return span;
    } else {}
    var div = document.createElement("div");
    obj["elem"] = div;
    exports.randomColor(div);
    div["className"] = "list";
    var first = true;
    obj["children"].forEach(function(child) {
        if (!first) {
            div.appendChild(document.createTextNode(" "));
        } else {}
        div.appendChild(obj2html.call(null, child));
        first = false;
    });
    return div;
};

exports["run"] = function(filename) {
    if (!filename) {
        document["body"]["innerHTML"] = "Usage: weblist filename";
        return undefined;
    } else {}
    yolan.readTextFile(filename, function(err, data) {
        if (err) {
            console.log("Error:", err);
            return undefined;
        } else {}
        document["body"]["style"]["margin"] = "0px";
        document["body"]["style"]["background"] = "#f8f8f8";
        var list = syntax.parse(syntax.tokenize(data));
        var obj = listobject.create(list);
        console.log(obj);
        document["body"].appendChild(obj2html.call(null, obj));
    });
};