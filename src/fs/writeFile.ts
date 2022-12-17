import { writeFile as writeFileAsync } from 'fs/promises';

const writeFile = async (path: string, content: string) => {
  try {
    await writeFileAsync(path, content);
  } catch (err) {
    throw err;
  }
};

export default writeFile;
