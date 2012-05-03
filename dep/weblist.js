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
    cursor: [ [ "border", ".3em", "solid", "red" ], [ "border-radius", ".9em" ] ],
    listAtom: [ [ "margin", "0em", ".0em", "0em", ".0em" ], [ "background-color", "rgba(255,255,255,0.5)" ], [ "border-radius", ".3em" ], [ "white-space", "pre-wrap" ], [ "font-family", "sans-serif" ] ],
    list: [ [ "padding", ".1em", ".1em", ".1em", ".2em" ], [ "margin", ".1em", ".1em", ".1em", ".1em" ], [ "display", "inline-block" ], [ "border-radius", ".3em" ], [ "border", ".1em", "solid" ], [ "box-shadow", ".2em", ".2em", ".6em", "rgba(0,0,0,.4)" ] ]
};

document.getElementsByTagName("head")[0].appendChild(exports.newElem("style", exports.style2css(exports["style"])));

exports["randomColor"] = function(elem, str) {
    var color = Math.random() * 16777216 & 16777215;
    var style = elem["style"];
    style["backgroundColor"] = webcolor.hashLightColor(str);
    style["borderColor"] = webcolor.hashColor(str);
};

var cursorNode = document.createElement("span");

cursorNode["className"] = "cursor";

cursorNode.appendChild(document.createTextNode("•"));

var htmlView = {
    update: function(obj) {
        var elem = obj["elem"];
        if (!elem) {
            elem = document.createElement("span");
            obj["elem"] = elem;
        } else {}
        if (obj["value"]) {
            elem["className"] = "listAtom";
            while (elem.hasChildNodes()) {
                elem.removeChild(elem["lastChild"]);
            }
            elem.appendChild(document.createTextNode(JSON.stringify(obj["value"]).slice(1, -1)));
        } else {
            elem["className"] = "list";
            while (elem.hasChildNodes()) {
                elem.removeChild(elem["lastChild"]);
            }
            var text = "undefined";
            if (obj["children"] && obj["children"][0] && obj["children"][0]["value"]) {
                text = obj["children"][0]["value"];
            } else {}
            exports.randomColor(elem, text);
            var i = 0;
            var len = obj["children"]["length"];
            while (i < len) {
                if (i) {
                    elem.appendChild(document.createTextNode(" "));
                } else {}
                if (!(obj["cursor"] === undefined) && obj["cursor"] === i) {
                    elem.appendChild(cursorNode);
                    elem.appendChild(document.createTextNode(" "));
                } else {}
                if (!obj["children"][i]["elem"]) {
                    htmlView.update(obj["children"][i]);
                } else {}
                elem.appendChild(obj["children"][i]["elem"]);
                i = i + 1;
            }
        }
        return obj;
    }
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
        obj["cursor"] = 1;
        htmlView.update(obj);
        document["body"].appendChild(obj["elem"]);
    });
};