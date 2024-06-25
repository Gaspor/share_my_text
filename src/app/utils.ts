"use server"
import { createPool } from "@vercel/postgres";
import { nanoid } from "nanoid";

export async function sendText(form: FormData): Promise<{message: string, status: number, id: string}> {
    const message = form.get("my_text")?.toString();
    
    const client = createPool({
        connectionString: process.env.POSTGRES_URL
    });
    
    client.connect();

    let id = nanoid(8);
    let isUnique = false;
    let attempt = 0;

    while(!(attempt >= 5) && !isUnique) {
        const rows = await client.sql`SELECT * FROM messages WHERE id = ${id};`;
        
        if(!rows.rowCount) {
            isUnique = true;
        }

        attempt++;
    }

    if(attempt == 5 && !isUnique) {
        client.end();
        return {
            message: "Error!",
            id: "",
            status: 409 
        }
    }

    const insert = await client.sql`INSERT INTO messages(id, message, is_private) VALUES(${id}, ${message}, false)`;
    client.end();

    return {
        message: "Created!",
        id,
        status: 200
    }
}