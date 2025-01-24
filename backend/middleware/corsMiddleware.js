import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*', // Replace '*' with your frontend's origin in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});
