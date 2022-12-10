import http from 'http';
import createUsersStore from './store/createStore';

const PORT = process.env.PORT ?? 4000;

const store = createUsersStore();

const myServer = http.createServer((request, response) => {
	const method = request.method;
	const url = request.url;
	const headers = request.headers;

	console.log({ method, url, headers });
	response.write('Hi there');
	response.end();
});

myServer.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
