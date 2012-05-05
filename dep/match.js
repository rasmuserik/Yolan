var match = exports;

match["deepEqual"] = function(a, b) {
    if (a === b) {
        return true;
    } else {}
    if (typeof a === "string") {
        return false;
    } else {}
    if (typeof b === "string") {
        return false;
    } else {}
    if (!(a["length"] === b["length"])) {
        return false;
    } else {}
    var i = 0;
    while (i < a["length"]) {
        if (!match.deepEqual(a[i], b[i])) {
            return false;
        } else {}
        i = i + 1;
    }
    return true;
};

match["pattern"] = function(pattern, obj, ctx) {
    ctx = ctx || {};
    if (typeof pattern === "string") {
        return pattern === obj && ctx;
    } else {}
    if (typeof obj === "string") {
        return false;
    } else {}
    if (pattern["length"] === 0) {
        return obj["length"] === 0 && ctx;
    } else {}
    var car = pattern[0];
    var cdr = pattern.slice(1);
    if (car.slice(0, 3) === "...") {
        var capt = [];
        var name = car.slice(3);
        var prevCapt = name && ctx[name];
        if (name) {
            ctx[name] = capt;
        } else {}
        while (true) {
            if (match.pattern(cdr, obj, ctx)) {
                if (!prevCapt) {
                    return ctx;
                } else {}
                if (match.deepEqual(capt, prevCapt)) {
                    return ctx;
                } else {}
            } else {}
            if (obj["length"] === 0) {
                return false;
            } else {}
            capt.push(obj[0]);
            obj = obj.slice(1);
        }
    } else {}
    if (obj["length"] === 0) {
        return false;
    } else {}
    if (car[0] === "?") {
        var capt = obj[0];
        var name = car.slice(1);
        var prevCapt = name && ctx[name];
        if (name) {
            ctx[name] = capt;
        } else {}
        if (prevCapt && !match.deepEqual(prevCapt, capt)) {
            return false;
        } else {}
        return match.pattern(cdr, obj.slice(1), ctx);
    } else {}
    return match.pattern(car, obj[0], ctx) && match.pattern(cdr, obj.slice(1), ctx);
};

match["run"] = function() {
    console.log(match.pattern([ "...", "foo", "...b" ], [ "foo", "bar", "baz" ]));
    console.log(match.pattern([ "...a", "bar", "...b" ], [ "foo", "bar", "baz" ]));
    console.log(match.pattern([ "...a", "baz", "...b" ], [ "foo", "bar", "baz" ]));
    console.log(match.pattern([ "...a", "bar", "...a" ], [ "foo", "bar", "baz" ]));
    console.log(match.pattern([ "...a", "bar", "...a" ], [ "foo", "bar", "foo" ]));
    console.log(match.pattern([ "...a", "quuz", "...b" ], [ "foo", "bar", "baz" ]));
    console.log(match.pattern([ "?a", "?b" ], [ "foo", "bar" ]));
    console.log(match.pattern([ "?a", "?a" ], [ "foo", "bar" ]));
    console.log(match.pattern([ "?a", "?a" ], [ "foo", "foo" ]));
};