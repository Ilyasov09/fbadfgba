import React from 'react';

interface AvatarStatusProps {
  online?: boolean;
  pulse?: boolean;
  avatarUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarStatus({ online = true, pulse = false, avatarUrl, size = 'md' }: AvatarStatusProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const statusSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      <div 
        className={`${sizeClasses[size]} rounded-full border-2 border-primary bg-muted flex items-center justify-center overflow-hidden transition-all duration-300 ${pulse ? 'ring-2 ring-primary animate-pulse shadow-glow-primary' : ''}`}
        style={{
          boxShadow: pulse ? '0 0 15px rgba(124, 58, 237, 0.5)' : 'none',
        }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="text-primary font-bold">D</div>
        )}
      </div>
      {online && (
        <span className={`absolute bottom-0 right-0 ${statusSize[size]} bg-green-500 rounded-full border-2 border-background`} />
      )}
    </div>
  );
}
