"use client"
import { message } from "@/app/[id]/utils";
import { useEffect, useState } from "react";

export default function Messages({ params }: { params: { id: string } }) {
  const [text, setText] = useState<string>("");
  
  const update = async () => {
    const temp = await message(params.id);    
    setText(temp);

  }

  useEffect(() => {
    update();

  }, []);

  function copylink (text: string) {
    navigator.clipboard.writeText(text);
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <label htmlFor="text">Texto compartilhado:</label>
        <div id="text" className="bg-white text-black rounded mt-3 p-3">
          {text}
        </div>
        <div className="text-end p-2"><button onClick={() => copylink(text)}>Copy</button></div>
      </div>
    </main>
  );
}