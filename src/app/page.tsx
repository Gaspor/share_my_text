"use client"
import { useState } from "react";
import { sendText } from "@/app/utils";

export default function Home() {
  const [charCounter, setCharCounter] = useState(0);
  const [id, setId] = useState("");

  async function name(formData: FormData) {
    const result = await sendText(formData);
    if(result.status == 200) {
      console.log("criado com sucesso!");
      setId(result.id);
      
    } else {
      console.log(result.message);
      
    }
  }

  
  const api = null;
  const charLimit = api || 1000;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={name}>
        <div>
          <div className="grid">
            <label htmlFor="my_text">Escreva seu texto: </label>
            <textarea className="text-black mt-3 rounded" id="my_text" name="my_text" onChange={(e) => setCharCounter(e.target.value.length)} rows={10} cols={80} maxLength={charLimit}/>
          </div>
          <div id="form_footer" className="justify-between flex mt-3">
            <button className="bg-slate-700 rounded p-1">Enviar</button>
            <p className="">{charCounter}/{charLimit} characters</p>
          </div>
        </div>
        {id && (
          <div id="link" className="text-center">
            <p>Criado com sucesso!<br/>Você pode acessar seu texto <a target="_blank" href={window.location.origin + "/" + id}><u>aqui.</u></a></p>
          </div>
        )}
      </form>
    </main>
  );
}
