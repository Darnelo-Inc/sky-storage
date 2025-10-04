import * as dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import { join } from 'path';

const envPath = join(__dirname, '.env');

dotenv.config({ path: envPath, quiet: true });

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 8080;
export const SECRET_KEY: Secret = process.env.SECRET_KEY as Secret;

export const __isProd__ = process.env.NODE_ENV === "production"