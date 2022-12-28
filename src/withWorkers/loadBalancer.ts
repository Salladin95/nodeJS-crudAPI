import http from 'http';
import { cpus } from 'os';

import createProxy from '../server/createProxy';
import getOptions from '../server/getOptions';
import { PORT } from '../utils/index';

const launcLoadBalancer = () => {
  const amountOfCpus = cpus().length;
  let portNumber = 1;
  http
    .createServer((clientRequest, clientResponse) => {
      const options = getOptions({ PORT, amountOfCpus, portNumber, clientRequest });
      createProxy(clientRequest, clientResponse, options);
      if (amountOfCpus > portNumber) {
        portNumber++;
      } else {
        portNumber = 1;
      }
    })
    .listen(PORT, () => console.log(`Master server: ${process.pid} is running on port: ${PORT}`));
};

export default launcLoadBalancer;
