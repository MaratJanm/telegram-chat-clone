import React, { useState, useEffect, useCallback } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message } from '../types';
import { getMessages, sendMessage } from '../api/messages';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const data = await getMessages();
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
      setError('Не удалось загрузить сообщения');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSend = async (text: string) => {
    if (isSending) return;
    
    setIsSending(true);
    try {
      const newMessage = await sendMessage({ text });
      setMessages((prev) => [...prev, newMessage]);
      setError(null);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Не удалось отправить сообщение');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto bg-white shadow-xl">
      <ChatHeader 
        title="Hustlers Tech Agency" 
        memberCount={1}
      />
      
      {error && (
        <div className="px-4 py-2 bg-red-100 text-red-700 text-sm text-center">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="ml-2 underline hover:no-underline"
          >
            Закрыть
          </button>
        </div>
      )}
      
      <MessageList messages={messages} isLoading={isLoading} />
      
      <MessageInput onSend={handleSend} disabled={isSending} />
    </div>
  );
};

export default Chat;