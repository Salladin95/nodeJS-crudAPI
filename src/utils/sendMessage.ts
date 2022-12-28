const sendMessage = (message: string) => {
  process.send && process.send(message);
};

export default sendMessage;
