const fs = require('node:fs');

function writeData(file, content) {
    fs.writeFile(file, JSON.stringify(content, null, 2), 'utf8', (err) => { err ? console.log(err): null})
};

function getData(request) {
    return new Promise((resolve, reject) => {
        try {
            let data = '';

            request.on('data', (buffer) => { data += buffer.toString() })
            .on('end', () => { resolve(data) });
         
        } catch (err) { reject(err) };
    })
}

module.exports = { writeData, getData};