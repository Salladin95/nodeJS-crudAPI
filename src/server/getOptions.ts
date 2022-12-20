import http from 'http';

import { getMinOf } from '../utils';

const getOptions = ({
  PORT,
  amountOfCpus,
  clientRequest,
  portNumber,
}: {
  PORT: string;
  amountOfCpus: number;
  portNumber: number;
  clientRequest: http.IncomingMessage;
}) => {
  const currentPort = +PORT + getMinOf(portNumber, amountOfCpus);
  const options = {
    host: 'localhost',
    port: currentPort,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: clientRequest.headers,
  };
  return options;
};

export default getOptions;
