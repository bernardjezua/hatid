import React from 'react';
import Profile from '../components/Profile';
import UsersData from '../UsersData';

export default function ProfilePage() {
    const user = UsersData.filter(user =>
        (user.name === 'John Doe')
    );
  
    return (
    <div className="min-h-screen bg-light-gray m-0 pt-0 flex flex-wrap justify-center">
      <div className="flex w-full">
        <div className="flex-grow mt-4">
          <Profile users={user} />
        </div>
      </div>
    </div>
  );
}
