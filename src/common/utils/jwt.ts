import JWT from 'jsonwebtoken';
import { JWT_KEY, TOKEN_TIME } from '../config';



export const jwt = {
    sign : (payload: any) => JWT.sign(payload, JWT_KEY, TOKEN_TIME),
    verify : (token : string) => JWT.verify(token, JWT_KEY) 
}