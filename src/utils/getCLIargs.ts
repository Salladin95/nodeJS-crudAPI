const getCLIArgs = (): string[] => {
  const myArgs = process.argv.slice(2);
  const startCustomArgsIndex = process.argv.indexOf('--') + 1;
  return myArgs.slice(startCustomArgsIndex);
};

export default getCLIArgs;
