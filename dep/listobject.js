var Model = {};

exports["create"] = function(list) {
    var result = Object.create(Model);
    if (!Array.isArray(list)) {
        result["value"] = list;
        return result;
    } else {}
    result["children"] = list.map(function(elem) {
        var t = exports.create(elem);
        t["parent"] = result;
        return t;
    });
    return result;
};