import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? '4000';
const BASE_URL = process.env.BASE_URL ?? 'api/users';
const MODE = process.env.MODE;

export { PORT, BASE_URL, MODE };
