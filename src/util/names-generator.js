// addition module for filling data (names) - run separately
const fs = require('fs');
const fileName = gender => `./src/config/${gender}-names.json`;
const url= gender => `https://names.drycodes.com/10000?nameOptions=${gender}_names`;

async function getRandomName_Gender(gender){
    const names = await(await fetch(url(gender))).json();

    fs.writeFile(fileName(gender), `{ "names":${(JSON.stringify(names))}}`, function(err) {
        if (err) throw err;
        console.log('complete');
        });
}
getRandomName_Gender('girl');
getRandomName_Gender('boy');