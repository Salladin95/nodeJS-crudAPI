import http from 'http';
import { getMinOf } from '../utils';

const launcLoadBalancer = (amountOfCpus: number, PORT: number) => {
  let hostNumber = 1;
  http
    .createServer((request, response) => {
      const currentPort = PORT + getMinOf(hostNumber, amountOfCpus);

      const options = {
        host: 'localhost',
        port: currentPort,
        path: request.url,
        method: request.method,
        headers: request.headers,
      };

      const req = http.request(options, (rsp) => {
        rsp.on('data', (chunk) => {
          response.write(chunk);
        });

        rsp.on('end', () => {
          response.end();
        });
      });

      if (request.method === 'GET' || request.method === 'DELETE') {
        req.end();
      } else {
        let body = '';
        request?.on('data', (chunk) => {
          body += chunk.toString();
          req.write(body);
          req.end();
        });
      }

      if (amountOfCpus > hostNumber) {
        hostNumber++;
      } else {
        hostNumber = 1;
      }
    })
    .listen(PORT, () => console.log(`Master server: ${process.pid} is running on port: ${PORT}`));
};

export default launcLoadBalancer;
