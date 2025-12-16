import React from 'react';

interface ChatHeaderProps {
  title: string;
  memberCount: number;
  avatarUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, memberCount, avatarUrl }) => {
  return (
    <header className="flex items-center px-4 py-2 bg-[#517DA2] text-white shadow-md z-10">
      {/* Back button */}
      <button className="p-2 mr-2 hover:bg-white/10 rounded-full transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
        {avatarUrl ? (
          <img src={avatarUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-[#7B5C43] flex items-center justify-center">
            <span className="text-white text-sm font-medium italic" style={{ fontFamily: 'cursive' }}>
              Hustlers
            </span>
          </div>
        )}
      </div>

      {/* Chat info */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[17px] font-semibold truncate">{title}</h1>
        <p className="text-[13px] text-white/80">{memberCount} member{memberCount !== 1 ? 's' : ''}</p>
      </div>

      {/* Menu button */}
      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      </button>
    </header>
  );
};

export default ChatHeader;