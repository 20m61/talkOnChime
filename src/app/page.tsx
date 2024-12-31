'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const joinMeeting = async () => {
    const response = await fetch('/api/joinMeeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      setMeetingInfo(data);
      setIsJoined(true);

      const socket = new WebSocket('ws://localhost:3000/api/chat');
      socket.onmessage = (event) => {
        setChatHistory((prevHistory) => [...prevHistory, event.data]);
      };
      setWs(socket);
    } else {
      alert('Failed to join the meeting');
    }
  };

  const leaveMeeting = () => {
    if (ws) {
      ws.close();
    }
    setIsJoined(false);
  };

  const sendMessage = () => {
    if (ws && chatMessage) {
      ws.send(`${name}: ${chatMessage}`);
      setChatMessage('');
    }
  };

  return (
    <div>
      {!isJoined ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={joinMeeting}>Join Meeting</button>
        </div>
      ) : (
        <div>
          <button onClick={leaveMeeting}>Leave Meeting</button>
          <div>
            <input
              type="text"
              placeholder="Type your message"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <div>
            <h3>Chat History</h3>
            <div>
              {chatHistory.map((msg, idx) => (
                <div key={idx}>{msg}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
