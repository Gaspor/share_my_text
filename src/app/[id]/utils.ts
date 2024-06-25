"use server"
import { createPool } from "@vercel/postgres";

export async function message(id: string) {
    const client = createPool({
        connectionString: process.env.POSTGRES_URL
    });

    client.connect();
    const message = (await client.sql`SELECT message FROM messages WHERE id=${id} AND is_private = false`).rows || "Mensagem não encontrada!";
    client.end();

    return message[0].message;
}