import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 5000;
export const MONGO_URL = process.env.MONGO_URL;
export const TOKEN_KEY =  process.env.TOKEN_KEY;