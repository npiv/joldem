/* Ripped from underscore */
var isArray = function(obj) {
    return toString.call(obj) === '[object Array]';
};

var isArguments = function(obj) {
    return toString.call(obj) === '[object Arguments]';
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var isArrayLike = function(collection) {
    var length = collection && collection.length;
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

var flatten = function(input) {
    var output = [], idx = 0, value;
    for (var i = 0, length = input && input.length; i < length; i++) {
        value = input[i];
        if (isArrayLike(value) && (isArray(value) || isArguments(value))) {
            //flatten current level of array or arguments object
            value = flatten(value);
            var j = 0, len = value.length;
            output.length += len;
            while (j < len) {
                output[idx++] = value[j++];
            }
        } else {
            output[idx++] = value;
        }
    }
    return output;
};

var util = {
    flatten: flatten,

    shuffle: function(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },

    unique: function(arr) {
        return arr.filter (function (v, i, a) { return a.indexOf (v) == i; });
    },

    flatMap: function(arr, lambda) {
        return Array.prototype.concat.apply([], arr.map(lambda));
    },

    copy: function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    }

};

module.exports = util;