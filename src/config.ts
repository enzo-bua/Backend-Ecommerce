import { config } from "dotenv";

config()

module.exports = {
    db: {
        username: process.env.DB_USERNAME || 'proyect_medico_user',
        password: process.env.DB_PASSWORD || 'adnnZBEEtTJR1SXqq79p5OyjKfHdI0LF',
        host: process.env.DB_HOST || 'dpg-chlvid64dad6k5lcpjq0-a',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_DATABASE || 'proyect_medico',
    }
}

export const PORT = process.env.PORT || 3000

