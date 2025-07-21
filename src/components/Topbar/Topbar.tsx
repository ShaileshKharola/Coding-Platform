import { auth } from '@/firebase/firebase';
import Link from 'next/link';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtoms';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
type TopbarProps = {
    problemPage?:boolean
};

const Topbar:React.FC<TopbarProps> = ({problemPage}) => {
    const [user]=useAuthState(auth);
    const setAuthModalState=useSetRecoilState(authModalState);
    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-700 text-dark-gray-7'>
            <div className='flex w-full items-center justify-between ${problemPage ? "max-[1200px] mx-auto":""'>
            <Link href='/' className='h-[40px] flex items-center'>
                <Image src='/logo.png' alt='Logo' height={50} width={50} />
            </Link>
            {problemPage &&(
                <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className='flex items-center justify-center rounded bg-gray-400 hover:bg-gray-200 h-8 w-8 cursor-pointer'>
                        <FaChevronLeft/>
                    </div>
                    <Link href="/" className='flex items-center gap-2 font-medium max-w-[170px] text-gray-200 cursor-pointer'>
                    <div>
                        <BsList/>
                        </div>
                        <p>ProblemList</p>
                        </Link>
                    <div className='flex items-center justify-center rounded bg-gray-400  hover:bg-gray-200 h-8 w-8 cursor-pointer'>
                        <FaChevronRight/>
                    </div>    
                </div>
            )}
            <div className='flex items-center space-x-4 ml-auto'>
                <div>
                <a
                    href="#"
                    target='_blank'
                    rel='noreferrer'
                    className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out'
                >
                    Premium
                </a>
                </div>
            {problemPage && <Timer ></Timer>}    
            {!user && (
                <Link href='/auth' onClick={() => { setAuthModalState((prev)=>({...prev, isOpen: true, type: 'login' })) }}>
                    <span className='sr-only'>Sign In</span>
                    <button className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out'>
                        Sign In
                    </button>
                </Link>
            )}
            {user && ( 
                <div className='cursor-pointer group relative'>
                    <img src='/avatar.png' alt='user profile img' className='h-8 w-8 rounded-full'/>
                    <div className='absolute top-10 right-0 mx-auto bg-white shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out'>
                        <p className='text-sm'>{user.email}</p>
                    </div>
                </div>
            )}
            {user && <Logout />}
            </div>
        </div>
            </nav>
        
    )
}
export default Topbar;