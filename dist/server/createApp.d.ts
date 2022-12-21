import { EventEmitter } from 'stream';
declare const createApp: (emitter: EventEmitter) => import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
export default createApp;
