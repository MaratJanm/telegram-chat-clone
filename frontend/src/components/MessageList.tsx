import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex-1 chat-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 chat-background overflow-y-auto scrollbar-hidden px-2 py-2"
    >
      <div className="flex flex-col justify-end min-h-full">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="bg-white/80 rounded-xl px-4 py-3 text-gray-600 text-sm">
              Нет сообщений. Начните диалог!
            </div>
          </div>
        ) : (
          <div className="space-y-[2px] pt-2">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;