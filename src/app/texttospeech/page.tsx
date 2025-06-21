'use client';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('hi-IN');
  const [audioUrl, setAudioUrl] = useState('');

  const convertTextToSpeech = async () => {
    const res = await fetch('/api/texttospeech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang }),
    });

    const data = await res.json();
    console.log("-----------",data);
    if (data.audioUrl) {
      setAudioUrl(data.audioUrl);
    } else {
      alert('TTS failed: ' + data.error);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SarvamAI TTS</h1>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={5}
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={lang} onChange={(e) => setLang(e.target.value)} className="mb-4 border p-2">
        <option value="hi-IN">Hindi</option>
        <option value="en-IN">English (India)</option>
      </select>
      <button onClick={convertTextToSpeech} className="bg-blue-600 text-white p-2 rounded">
        Convert
      </button>

      {audioUrl && (
        <audio controls autoPlay className="mt-6 w-full">
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </main>
  );
}
