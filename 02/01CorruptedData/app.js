"use strict";

var data = require("./data"),
    i,
    j,
    dublicates = [],
    len = data.length;

for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
        if (data[i].fields.date === data[j].fields.date && data[i].fields.student === data[j].fields.student) {
            dublicates.push(data[j]);
        }
    }
}

console.log(dublicates.sort(function(a, b) {
    return a.pk - b.pk;
}));
