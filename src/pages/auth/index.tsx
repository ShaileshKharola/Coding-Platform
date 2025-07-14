import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { authModalState } from '@/atoms/authModalAtoms';
import { useRecoilValue } from 'recoil';
import dynamic from "next/dynamic";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
const AuthModal = dynamic(() => import('@/components/Modals/AuthModal'), { ssr: false });

type AuthPageProps = {};  

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user,loading,error] = useAuthState(auth);
  const [pageLoading,setPageLoading] =useState(true);
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/");
    if (!loading && !user) setPageLoading(false); 
  }, [user,router,loading]);

  useEffect(() => {
    if(user) router.push("/");
  }, [user, router]);
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
