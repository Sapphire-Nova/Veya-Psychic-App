import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = ({ user }) => {
  return (
    <div className="bg-black min-h-screen text-white">
      <main className="pb-32">
        <Outlet context={{ user }} />
      </main>
      <Navbar user={user} />
    </div>
  );
};

export default Layout;