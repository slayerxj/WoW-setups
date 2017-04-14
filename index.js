var fs = require("fs");

fs.readFile('config1.wtf', (err, data1) => {
    if (err) throw err;
    fs.readFile('config2.wtf', (err, data2) => {
        if (err) throw err;
        console.log(data1, data2);
    });
});