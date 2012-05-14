var fib = function(n) {
    var result = 1;
    if (1 < n) {
        result = fib.call(null, n - 1) + fib.call(null, n - 2);
    } else {}
    console.log(result);
    return result;
};

exports["run"] = function() {
    console.log(fib.call(null, 10));
};