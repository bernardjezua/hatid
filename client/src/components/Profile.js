import React from 'react';

export default function Profile({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-[32px] shadow-premium p-8 border border-neutral-100 flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary-forest to-accent-olive p-1 shadow-lg">
          <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            ) : null}
            <span className={`text-3xl font-black text-primary-forest ${user.avatar ? 'hidden' : 'block'}`}>
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-4 border-white rounded-full"></div>
      </div>

      <h2 className="text-2xl font-black text-primary-900 tracking-tight">{user.name}</h2>
      <p className="text-neutral-500 text-sm font-medium mb-6 italic">{user.email}</p>

      <div className="w-full grid grid-cols-2 gap-4 border-t border-neutral-100 pt-8 mt-2">
        <div className="text-center">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Status</p>
          <p className="text-xs font-black text-primary-forest uppercase">Verified Farmer</p>
        </div>
        <div className="text-center border-l border-neutral-100">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Joined</p>
          <p className="text-xs font-black text-primary-forest uppercase">March 2024</p>
        </div>
      </div>
    </div>
  );
}
