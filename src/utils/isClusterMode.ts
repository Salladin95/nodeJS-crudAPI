import getCLIArgs from './getCLIargs';

const isWithWorkers = () => {
  const args = getCLIArgs();
  return args.includes('-withWorkers');
};

export default isWithWorkers;
