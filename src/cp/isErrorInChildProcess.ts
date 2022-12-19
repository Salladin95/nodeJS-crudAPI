export type CPError = { errorMessage: string };

const isErrorInChildProcc = (msg: unknown): msg is CPError => {
  if (msg instanceof Object) {
    return Object.keys(msg).length === 1 && msg.hasOwnProperty('errorMessage');
  }
  return false;
};

export default isErrorInChildProcc;
