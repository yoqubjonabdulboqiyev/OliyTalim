import dotenv from "dotenv";
import path from "path";

dotenv.config()
const { env } = process

export const DB_URL = env.DB_URL || "mongodb://localhost:27018,localhost:27019,localhost:27020/oliyTalim" ;
export const HOST = env.HOST;
export const ADMIN_PORt = env.ADMIN_PORT;
export const USER_PORT = env.USER_PORT;
export const JWT_KEY = env.JWT_KEY;
export const TOKEN_TIME = {
    expiresIn: env.TOKEN_TIME
}

