const getContentType = (type: string) => ({
	'Content-Type': `application/${type}`,
});

export default getContentType;
