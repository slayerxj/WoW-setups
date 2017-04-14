var fs = require("fs");

var arrayGen = function (data) {
    var string = data.toString();
    var array = string.split("\r\n");
    var usefulArray = [];
    array.forEach(function (element) {
        var words = element.split(" ");
        usefulArray.push({ entry: words[1], value: words[2], compareResult: 0 });
    });

    return usefulArray;
};

var outputResult = function (array1, array2) {
    var unmatchEntries = [];
    for (var i = 0; i < array1.length; i++) {
        var element = array1[i];
        if (element.compareResult !== 0) {
            continue;
        }

        for (var j = 0; j < array2.length; j++) {
            var element2 = array2[j];

            if (element2.compareResult !== 0) {
                continue;
            }

            if (element.entry === element2.entry) {
                if (element.value === element2.value) {
                    element.compareResult = 1;
                    element2.compareResult = 1;
                } else {
                    element.compareResult = 2;
                    element2.compareResult = 2;
                    unmatchEntries.push({ entry: element.entry, value1: element.value, value2: element2.value });
                }
            }
        }
    }

    console.log("The following entries are unmatched: \n");
    unmatchEntries.forEach(function (value) {
        console.log("\tEntry: ", value.entry, ", value1: ", value.value1, ", value2: ", value.value2);
    });
    console.log("\n\nThe following entries only exists origin config: \n");
    array1.forEach(function (value) {
        if (value.compareResult === 0) {
            console.log("\tEntry: ", value.entry, ", value: ", value.value);
        }
    });
    console.log("\n\nThe following entries only exists new config: \n");
    array2.forEach(function (value) {
        if (value.compareResult === 0) {
            console.log("\tEntry: ", value.entry, ", value: ", value.value);
        }
    });
};

fs.readFile('config1.wtf', (err, data1) => {
    if (err) throw err;
    fs.readFile('config2.wtf', (err, data2) => {
        if (err) throw err;
        var array1 = arrayGen(data1);
        var array2 = arrayGen(data2);

        outputResult(array1, array2);
    });
});