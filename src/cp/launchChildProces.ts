import { fork } from 'child_process';
import { EventEmitter } from 'stream';
import { actionEvents } from '../utils';

const launchChildProcess = ({
  emitter,
  targetFile,
}: {
  emitter: EventEmitter;
  targetFile: string;
}) => {
  const child = fork(targetFile);

  emitter.on(actionEvents.action, (msg) => child.send(msg));
  child.on('message', (msg) => emitter.emit(actionEvents.actionResponse, msg));
};

export default launchChildProcess;
