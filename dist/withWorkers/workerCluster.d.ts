import { Server } from 'http';
import { EventEmitter } from 'stream';
declare const workerCluster: (emitter: EventEmitter, app: Server) => void;
export default workerCluster;
