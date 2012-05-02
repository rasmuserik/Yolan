var yolan = module.require("./yolan");

var syntax = module.require("./syntax");

var webcolor = module.require("./webcolor");

var listobject = module.require("./listobject");

var test = module.require("./test");

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
    listAtom: [ [ "margin", "0em", ".2em", "0em", ".2em" ], [ "backgroundColor", "rgba(255,255,255,0.5)" ], [ "borderRadius", ".3em" ], [ "whiteSpace", "pre-wrap" ], [ "fontFamily", "sans-serif" ] ]
};

console.log(document.getElementsByTagName("head")[0]);

console.log(exports.style2css(exports["style"]));

var obj2html = function(obj) {
    if (obj["value"]) {
        var span = document.createElement("span");
        span["class"] = "listAtom";
        span.appendChild(document.createTextNode(JSON.stringify(obj["value"]).slice(1, -1)));
        return span;
    } else {}
    var div = document.createElement("div");
    var color = Math.random() * 16777216 & 16777215;
    var style = div["style"];
    style["padding"] = ".1em .1em .1em .2em";
    style["margin"] = ".1em .1em .1em .1em";
    style["display"] = "inline-block";
    style["backgroundColor"] = webcolor.intToColor(14737632 | color / 8);
    style["border"] = ".1em solid " + webcolor.intToColor(color);
    style["borderRadius"] = ".3em";
    style["boxShadow"] = ".2em .2em .6em rgba(0,0,0,.4)";
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