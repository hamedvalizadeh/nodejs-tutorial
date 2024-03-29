const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000;

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Error');
        }
        res.writeHead(responseCode, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html', 200);
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html', 200);
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }
});

server.listen(port, () => console.log(`server started on port ${port}; ` + 'prec Ctrl+C to terminate....'));

