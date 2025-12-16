import React from 'react';
import { Message as MessageType } from '../types';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end message-animate">
      <div className="max-w-[85%] bg-[#EEFFDE] rounded-lg px-3 py-[6px] shadow-sm relative">
        <div className="flex items-end gap-[6px]">
          <span className="text-[15px] text-black leading-[1.35] break-words whitespace-pre-wrap">
            {message.text}
          </span>
          <span className="flex items-center gap-[2px] flex-shrink-0 translate-y-[2px]">
            <span className="text-[12px] text-[#6DAA5A]">{message.timestamp}</span>
            {message.is_read && (
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-[1px]">
                <path d="M1 5.5L4.5 9L11 2" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 5.5L8.5 9L15 2" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        </div>
        {/* Хвостик сообщения */}
        <div className="absolute -right-[6px] bottom-0 w-3 h-3 overflow-hidden">
          <div className="absolute w-4 h-4 bg-[#EEFFDE] rotate-45 -translate-x-2 translate-y-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Message;