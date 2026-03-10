const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3030;
const dir = process.cwd();

http.createServer((req, res) => {
  let file = req.url === '/' ? '/index.html' : req.url;
  const fp = path.join(dir, file);
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + fp); return; }
    const ext = path.extname(fp);
    const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript' };
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving from: ' + dir + ' on port ' + port));
