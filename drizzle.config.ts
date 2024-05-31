import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
    schema: "./server/schema/*.ts",
    out: "./server/drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL || '',
    }
});