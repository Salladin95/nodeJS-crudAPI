import http from 'http';

export type RequestOptions = {
  host: string;
  port: number;
  path: string | undefined;
  method: string | undefined;
  headers: http.IncomingHttpHeaders;
};

const createProxy = (
  clientRequest: http.IncomingMessage,
  clientResponse: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  options: RequestOptions
) => {
  const proxy = http.request(options, (res) => {
    const code = res.statusCode ?? 200;
    clientResponse.writeHead(code, res.headers);
    res.pipe(clientResponse, { end: true });
  });
  clientRequest.pipe(proxy, { end: true });
};

export default createProxy;
