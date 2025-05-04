const
   http = require('http'),
   client = require('prom-client'),
   PORT = 8090;

const pingCounter = new client.Counter({
   name: 'ping_request_count',
   help: 'No of request handled by Ping handler',
});

const server = http.createServer((req, res) => {
   if (req.url === '/ping') {
      pingCounter.inc();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('pong');
   } else if (req.url === '/metrics') {
      res.writeHead(200, { 'Content-Type': client.register.contentType });
      client.register.metrics().then(metricsData => {
         res.end(metricsData);
      }).catch(err => {
         res.statusCode = 500;
         res.end('Error fetching metrics');
      });
   } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
   }
});

server.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}/`);
});

