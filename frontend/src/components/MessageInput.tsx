import React, { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText && !disabled) {
      onSend(trimmedText);
      setText('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-2 py-2 bg-white border-t border-gray-200"
    >
      {/* Input field */}
      <div className="flex-1 bg-white rounded-full border border-gray-300 flex items-end px-4 py-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Сообщение"
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none outline-none text-[16px] leading-[1.35] max-h-[120px] text-gray-800 placeholder-gray-500 bg-transparent"
          style={{ minHeight: '24px' }}
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
          text.trim() && !disabled
            ? 'bg-[#5B9BD5] hover:bg-[#4A8AC4] text-white shadow-md'
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M22 2L11 13" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M22 2L15 22L11 13L2 9L22 2Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;