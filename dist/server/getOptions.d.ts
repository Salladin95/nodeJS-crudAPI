import http from 'http';
declare const getOptions: ({ PORT, amountOfCpus, clientRequest, portNumber, }: {
    PORT: string;
    amountOfCpus: number;
    portNumber: number;
    clientRequest: http.IncomingMessage;
}) => {
    host: string;
    port: number;
    path: string | undefined;
    method: string | undefined;
    headers: http.IncomingHttpHeaders;
};
export default getOptions;
