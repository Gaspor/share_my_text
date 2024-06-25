"use client"

export default function Message({ params }: { params: { id: string } }) {
  const message = "AAAAAAAAAAAAAAAAAAAAAAAAAA";

  const copylink = (e: any) => {
    navigator.clipboard.writeText(message);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <label htmlFor="text">Texto compartilhado:</label>
        <div id="text" className="bg-white text-black rounded mt-3 p-3">
          {message}
        </div>
        <div onClick={copylink} className="text-end"><p>Copy</p></div>

      </div>
    </main>
  );
}