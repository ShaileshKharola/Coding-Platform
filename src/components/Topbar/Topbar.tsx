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
import Timer from '../Timer/Timer';
type TopbarProps = {
    problemPage?:boolean
};

const Topbar:React.FC<TopbarProps> = ({problemPage}) => {
    const [user] = useAuthState(auth);
	const setAuthModalState = useSetRecoilState(authModalState);
	
    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-500 text-black'>
            <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
            <Link href='/' className='h-[50px] flex-1'>
                <Image src='/logo.png' alt='Logo' height={65} width={65} />
            </Link>
            {problemPage &&(
                <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className='flex items-center justify-center rounded bg-gray-300 hover:bg-gray-200 h-8 w-8 cursor-pointer'>
                        <FaChevronLeft/>
                    </div>
                    <Link href="/" className='flex items-center gap-2 font-medium max-w-[170px] text-gray-200 cursor-pointer'>
                    <div>
                        <BsList/>
                        </div>
                        <p>ProblemList</p>
                        </Link>
                    <div className='flex items-center justify-center rounded bg-gray-300  hover:bg-gray-200 h-8 w-8 cursor-pointer'>
                        <FaChevronRight/>
                    </div>    
                </div>
            )}
            <div className='flex items-center space-x-4 flex-1 justify-end'>
                <div>
                <a
                    href="#"
                    target='_blank'
                    rel='noreferrer'
                    className='bg-gray-300 py-1.5 px-3 cursor-pointer rounded text-dark-gray-700 hover:bg-gray-200'>
                    Premium
                </a>
                </div>   
            {!user && (
                <Link href='/auth' onClick={() => { setAuthModalState((prev)=>({...prev, isOpen: true, type: 'login' })) }}>
                    <button className='bg-gray-300 py-1 px-2.5 text-dark-gray-700 cursor-pointer rounded hover:bg-gray-200'>Sign In</button>
                </Link>
            )}
            {user && problemPage && <Timer />} 
            {user && ( 
                <div className='cursor-pointer group relative'>
                    <img src='/avatar.png' alt='Avatar' width={30} height={30} className='rounded-full'/>
                    <div className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-white text-black
                    p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out'>
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