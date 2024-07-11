const fs = require('fs');
const util = require('util');

const readutil = util.promisify(fs.readFile);
const writeutil = util.promisify(fs.writeFile);





// const readTest = (path) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, 'utf-8', (err, result) => {
//             if (err) { reject(err); }
//             if (result) { resolve(result); }
//         })
//     })
// }
// readTest('./myFolder/saleh.txt')
//     .then((err) => console.log(err))
//     .catch((result) => console.log(result));
const start = async () => {
    const take = await readutil('./myFolder/saleh.txt', 'utf-8');
    const take2 = await readutil('./myFolder/file/aboloay.txt', 'utf-8');
    writeutil('./new.txt', `${take},jhg ${take2}}`, { flag: 'a' });
    try {

        console.log(take, take2);
    }
    catch
    {

        console.log(take, take2);
    }
}
start();





