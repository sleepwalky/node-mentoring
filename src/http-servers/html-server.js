const fs = require('fs');

require('http')
.createServer((req, res) => {
    // const file = fs.readFileSync('assets/index.html');
    // const result = file.toString().replace('{message}', 'Real Text Message');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    // res.end(result);
    fs.createReadStream('assets/index.html').pipe(res);
})
.listen(3000);