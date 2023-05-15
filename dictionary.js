 function readDict(filename, length) {
    const fs = require("fs");
    const content = fs.readFileSync(filename).toString();
    const ar = content.split(/\r?\n/).filter(w => w.length == length);
    return ar;
}
console.log(readDict('./sources/dict.txt', 5));