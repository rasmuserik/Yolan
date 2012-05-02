var xml = module.require("./xml");

exports["init"] = function(obj) {
    var update = obj["update"] || function(ctx, h, w, canvas) {
        return undefined;
    };
    var mousedown = obj["mousedown"] || function(x, y) {
        return undefined;
    };
    var mousemove = obj["mousemove"] || function(x0, y0, x1, y1) {
        return undefined;
    };
    var mouseup = obj["mouseup"] || function(x, y) {
        return undefined;
    };
    var keydown = obj["keydown"] || function(k) {
        return undefined;
    };
    var width = window["innerWidth"];
    var height = window["innerHeight"];
    var body = document["body"];
    body["innerHTML"] = xml.fromYl([ "canvas", [ [ "id", "canvas" ] ], "This", "webapp", "requires", "a", "browser", "that", "has", "canvas", "support.", "You", "need", "to", "upgrade", "your", "browser", "to", "see", "this", "site." ]);
    var canvas = document.getElementById("canvas");
    var style = canvas["style"];
    console.log(canvas, style);
    style["position"] = "absolute";
    style["top"] = "0px";
    style["left"] = "0px";
    style["height"] = height + "px";
    style["width"] = width + "px";
    canvas["height"] = height;
    canvas["width"] = width;
    body["onkeydown"] = function(ev) {
        return console.log(ev);
    };
    canvas.focus();
    var ctx = canvas.getContext("2d");
    return update.call(null, ctx, height, width);
};

exports["run"] = function() {
    return exports.init({
        update: function(ctx, h, w) {
            ctx["fillStyle"] = "#990";
            ctx.fillText("Hello canvas", 100, 100);
            return ctx.fillRect(-5, -5, 1e4, 1e3);
        }
    });
};