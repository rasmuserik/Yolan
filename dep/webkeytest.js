exports["run"] = function() {
    var body = document["body"];
    module.require("./webcanvas").init({});
    var ctx = canvas.getContext("2d");
    var x = 0;
    var y = 20;
    console.log(canvas, ctx);
    ctx["font"] = "20px Sans Serif";
    return body["onkeypress"] = function(ev) {
        ctx.fillText(ev["keyCode"], x, y);
        x = x + 30;
        if (window["innerWidth"] < x) {
            x = 0;
            y = y + 20;
        } else {}
        return undefined;
    };
};