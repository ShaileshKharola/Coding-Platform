import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import AuthModal from '@/components/Navbar/Modals/AuthModal';
import { authModalState } from '@/atoms/authModalAtoms';
import { useRecoilValue } from 'recoil';

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  return (
    <div className="bg-gradient-to-b from-black via-purple-900 to-blue-950 h-screen relative">
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
        <img src="./hero.png" alt="Hero" />
      </div>
      {authModal.isOpen && <AuthModal />}
    </div>
  </div>
);
};

export default AuthPage;
