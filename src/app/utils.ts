"use server"

export async function sendText(form: FormData) {
    const message = form.get("my_text");
    console.log(message);

}