---
name: Connection
description: Connect with the backend system
---

# Frontend-Backend Connection Flow

This document details how the Avatar frontend (React/Vite) integrates with the Local Agent OS backend (FastAPI/ADK) to achieve synchronized text, audio, and facial animation.

## 1. Request Pipeline
When the user submits a message in the chat UI (`App.jsx`):
- The frontend sends a `POST` request to `http://localhost:8000/chat`.
- The payload includes `user_id`, `session_id`, and `message`.
- The FastAPI backend stores the message, computes embeddings, and triggers the ADK `AvatarCoordinator` agent.

## 2. Backend Generation & Emotion Parsing
- The Agent generates a text response containing embedded emotion tags based on its persona rules (e.g., "That sounds great! <happy> I can help with that.").
- The backend parses the response using regular expressions, splitting it into text chunks associated with specific emotions.
- It concurrently calls the TTS engine to generate raw 16-bit 24kHz PCM audio for each chunk.
- The server responds to the frontend with an array of `emotion_chunks`, where each object contains:
  - `chunk_index`
  - `emotion` (e.g., "happy", "angry", "neutral")
  - `text`
  - `audio_b64` (Base64 encoded raw PCM audio)

## 3. Frontend Playback & Synchronization (The "Move")
To ensure the 3D Avatar's mouth and facial expressions accurately match the audio being played, the frontend processes the response sequentially:

1. **Async Loop**: The frontend iterates over the `emotion_chunks` array one by one using a `for...of` loop.
2. **State Update**: For each chunk, it updates the React state:
   - `setEmotion(chunk.emotion)`: This propagates down to `Avatar.jsx` which applies the corresponding 3D GLB morph targets (e.g., mapping `happy` to `mouthSmile: 0.8`).
   - `setIsSpeaking(true)`: This enables the continuous jaw and viseme mathematical animations (lip-sync).
3. **Web Audio API Decoding**: 
   - The Base64 `audio_b64` string is decoded into a `Uint8Array`.
   - It is parsed as a 16-bit little-endian integer array using a `DataView`.
   - It is mapped into a normalized `Float32Array` (values between -1.0 and 1.0).
   - An `AudioBuffer` is created in the `AudioContext` at 24000 Hz, and the float array is injected into the audio channel.
4. **Synchronous Await**: The frontend plays the buffer via an `AudioBufferSourceNode` and wraps it in a Promise that resolves on the `onended` event. This forces the loop to wait for the audio to finish completely before moving to the next chunk and switching the emotion.
5. **Reset**: Once all chunks have been played, the loop terminates, setting `setIsSpeaking(false)` and `setEmotion('default')` to return the avatar to its resting neutral state.
