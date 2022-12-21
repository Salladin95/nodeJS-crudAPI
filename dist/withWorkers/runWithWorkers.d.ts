import EventEmitter from 'events';
import { Server } from 'http';
declare const runWithWorkers: (app: Server, emitter: EventEmitter) => void;
export default runWithWorkers;
