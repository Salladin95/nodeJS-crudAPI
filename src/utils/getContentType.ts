const getContentType = (type: string) => {
  const contentType = type === 'json' ? `application/${type}` : `${type}/plain`;
  return { 'Content-Type': contentType };
};

export default getContentType;
