import { fileURLToPath } from 'url';
import { dirname } from 'path';

const getFileNameAndDirname = (url: string) => ({
  filename: fileURLToPath(url),
  dirname: dirname(fileURLToPath(url)),
});

const getDirname = (url: string) => dirname(fileURLToPath(url));

export { getDirname, getFileNameAndDirname };
