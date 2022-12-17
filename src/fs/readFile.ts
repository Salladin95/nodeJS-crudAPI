import { createReadStream } from 'fs';
import { getErrorMessage } from '../utils';

const readFile = (path: string): Promise<string> => {
  const rs = createReadStream(path, { encoding: 'utf-8' });
  let fileContent = '';
  return new Promise((resolve, reject) => {
    rs.on('data', (dataChunk) => {
      fileContent += dataChunk;
    });
    rs.on('end', () => resolve(fileContent));
    rs.on('error', (err) => reject(getErrorMessage(err)));
  });
};

export default readFile;
