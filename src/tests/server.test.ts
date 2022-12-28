import request from 'supertest';
import EventEmitter from 'events';

import createApp from '../server';
import { actionEvents, BASE_URL, PORT, userNotFoundMsg } from '../utils';
import { resolve } from 'path';
import { cwd } from 'process';
import { fork } from 'child_process';
import { isUser } from '../store';

const emitter = new EventEmitter();
const app = createApp(emitter);
const targetFile = resolve(cwd(), 'dist', 'cp/cp.js');
const child = fork(targetFile);
let id = '';

describe('GET /api/users', () => {
  beforeAll(() => {
    emitter.on(actionEvents.action, (msg) => child.send(msg));
    child.on('message', (msg) => emitter.emit(actionEvents.actionResponse, msg));
    app.listen(PORT);
  });
  afterAll(() => {
    child.kill();
    app.close();
  });
  test('should return empty array & status code 200', async () => {
    const response = await request(app).get(BASE_URL);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
  test('should create then return newUser & status code 201', async () => {
    const body = { name: 'Lalo Salamanka', age: 46, hobbies: ['kill', 'smile', 'talk'] };
    const response = await request(app).post(BASE_URL).send(JSON.stringify(body));
    id = response.body.uuid;
    expect(isUser(response.body)).toBe(true);
    expect(response.statusCode).toBe(201);
  });
  test('should return user by it id & status code 200', async () => {
    const response = await request(app).get(`${BASE_URL}/${id}`);
    expect(isUser(response.body)).toBe(true);
    expect(response.statusCode).toBe(200);
  });
  test('should update user then return updatedUser & status code 200', async () => {
    const body = { name: 'Hector Salamanka', age: 77, hobbies: ['kill'] };
    const response = await request(app).put(`${BASE_URL}/${id}`).send(JSON.stringify(body));
    expect({ ...body, uuid: response.body.uuid }).toEqual(response.body);
    expect(id).toBe(response.body.uuid);
    expect(response.statusCode).toBe(200);
  });
  test('should delete user & status code 204', async () => {
    const response = await request(app).delete(`${BASE_URL}/${id}`);
    expect(response.statusCode).toBe(204);
  });
  test('should return "user not found" & status code 404', async () => {
    const response = await request(app).get(`${BASE_URL}/${id}`);
    expect(response.text).toBe(userNotFoundMsg);
    expect(response.statusCode).toBe(404);
  });
});
