import jwt from 'jsonwebtoken';
import { TOKEN_KEY } from '../config/env.js';

export function createSecretToken(id) {
    return jwt.sign({ id }, TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60 //3 days expire token
    });
}
