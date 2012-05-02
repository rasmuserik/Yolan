exports["intToColor"] = function(i) {
    return "#" + (16777216 + (i & 16777215)).toString(16).slice(1);
};