import { config } from "dotenv";

config()

module.exports = {
    db: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'Thomas44',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_DATABASE || 'TP-Final',
    }
}

export const PORT = process.env.PORT || 3000

