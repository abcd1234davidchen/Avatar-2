import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei'
import { Avatar } from './Avatar'

function App() {
  const [emotion, setEmotion] = useState('default')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)
  const audioCtxRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const playAudioChunk = async (base64Audio, audioCtx) => {
    try {
      const binaryString = atob(base64Audio);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const dataView = new DataView(bytes.buffer);
      const floatArray = new Float32Array(bytes.length / 2);
      for (let i = 0; i < floatArray.length; i++) {
        const int16 = dataView.getInt16(i * 2, true);
        floatArray[i] = int16 / 32768.0;
      }

      const audioBuffer = audioCtx.createBuffer(1, floatArray.length, 24000);
      audioBuffer.getChannelData(0).set(floatArray);

      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);

      return new Promise(resolve => {
        source.onended = resolve;
        source.start();
      });
    } catch (err) {
      console.error("Audio playback error", err);
      return Promise.resolve();
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg = { role: 'user', content: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'local_user',
          session_id: sessionId,
          message: userMsg.content,
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || "Unknown error");

      if (data.session_id) setSessionId(data.session_id);

      const astMsg = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, astMsg]);

      if (data.emotion_chunks && data.emotion_chunks.length > 0) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        for (const chunk of data.emotion_chunks) {
          if (chunk.error) {
            console.error('Chunk error:', chunk.error);
            continue;
          }

          if (chunk.emotion) {
            setEmotion(chunk.emotion.toLowerCase());
          }
          setIsSpeaking(true);

          if (chunk.audio_b64) {
            await playAudioChunk(chunk.audio_b64, audioCtxRef.current);
          } else {
            await new Promise(r => setTimeout(r, Math.max(1000, chunk.text.length * 50)));
          }
        }
        setIsSpeaking(false);
        setEmotion('default');
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'error', content: err.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black text-white font-inter h-screen overflow-hidden flex flex-col">
      <main className="flex h-screen">
        {/* Primary Pane (70%): Character Display */}
        <section className="w-[70%] h-full relative overflow-hidden bg-black flex items-center justify-center">
          <div className="absolute inset-0 z-10">
            <Canvas camera={{ position: [0, 1.5, 1.7], fov: 30 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              <Avatar
                position={[0, -2, 0]}
                scale={2}
                emotion={emotion}
                isSpeaking={isSpeaking}
              />
              <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} />
              <OrbitControls
                target={[0, 1.4, 0]}
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </section>

        {/* Secondary Pane (30%): Functional Chat Area */}
        <aside className="w-[30%] h-full flex flex-col border-l border-stone-900 bg-black pt-12 relative z-20">
          <div className="px-8 pb-4">
            <h2 className="text-sm font-bold text-stone-400 tracking-widest uppercase mb-4">Chat Logs</h2>
          </div>

          <div className="flex-1 overflow-y-auto px-8 space-y-4 pb-4 scrollbar-thin scrollbar-thumb-stone-800">
            {messages.length === 0 && (
              <p className="text-xs text-stone-600 uppercase tracking-widest text-center mt-10">No messages yet. Start a conversation.</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 max-w-[90%] text-sm leading-relaxed rounded-xl ${m.role === 'user'
                    ? 'bg-stone-800 text-stone-100 rounded-br-sm'
                    : m.role === 'error'
                      ? 'bg-red-950/50 text-red-400 border border-red-900 rounded-bl-sm'
                      : 'bg-stone-900 text-stone-300 border border-stone-800 rounded-bl-sm'
                  }`}>
                  {m.content}
                </div>
                <span className="text-[10px] text-stone-600 mt-1 uppercase tracking-widest px-1">
                  {m.role}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-stone-900 bg-black">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                disabled={isLoading}
                placeholder={isLoading ? "Agent thinking..." : "Message the Avatar..."}
                className="flex-1 bg-stone-900 border border-stone-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-stone-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="bg-white text-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:bg-stone-700 disabled:text-stone-400"
              >
                Send
              </button>
            </form>
          </div>
        </aside>
      </main>

      <div className="fixed top-0 bottom-0 left-[70%] w-[1px] bg-stone-900 pointer-events-none z-50"></div>
    </div>
  )
}

export default App
