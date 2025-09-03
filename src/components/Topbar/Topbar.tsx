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
import { useRouter } from 'next/router';
import { problems } from '@/utils/problems';
import ProblemDescription from '../Workspace/ProblemDescription/ProblemDescription';
import { Problem } from '@/utils/types/problem';


type TopbarProps = {
    problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const router=useRouter();
    const handleProblemChange=(isForward: boolean)=>{
        const {order} = problems[router.query.pid as string] as Problem;
        const direction = isForward ? 1 : -1;
        const nextProblemOrder = order + direction;
        const nextProblemKey=Object.keys(problems).find((key) => problems[key].order === nextProblemOrder);
        if(isForward && !nextProblemKey){
            const firstProblemKey=Object.keys(problems).find((key) => problems[key].order === 1);
            router.push(`/problems/${firstProblemKey}`);
        }else if(!isForward && !nextProblemKey){
            const lastProblemKey=Object.keys(problems).reduce((a, b) => problems[a].order > problems[b].order ? a : b);
            router.push(`/problems/${lastProblemKey}`);
        }else{
            router.push(`/problems/${nextProblemKey}`);
        }
    }
    
    return (
        <nav className='relative flex h-[50px] w-full shrink-0 items-center px-2 sm:px-5 bg-gray-500 text-black'>
            <div className={`flex w-full items-center justify-between ${!problemPage ? "max-w-[1200px] mx-auto" : ""}`}>
                {/* Logo - Always visible */}
                <Link href='/' className='h-[50px] w-16 flex-shrink-0'>
                    <Image src='/logo.png' alt='Logo' height={65} width={65} className='object-contain' />
                </Link>
                
                {/* Problem navigation - Only on problem pages */}
                {problemPage && (<div className="flex items-center gap-2 sm:gap-4 flex-1 justify-center max-w-[300px] sm:max-w-none">
                    <div className='flex items-center justify-center rounded bg-gray-300 hover:bg-gray-200 h-8 w-8 cursor-pointer'onClick={() => handleProblemChange(false)}>
                        <FaChevronLeft/>
                    </div>
                    <Link href="/" className='flex items-center gap-2 font-medium text-sm sm:text-base text-gray-200 cursor-pointer whitespace-nowrap'>
                        <BsList/>
                        <span className='hidden sm:inline'>ProblemList</span>
                    </Link>
                    <div className='flex items-center justify-center rounded bg-gray-300 hover:bg-gray-200 h-8 w-8 cursor-pointer' onClick={() => handleProblemChange(true)}>
                        <FaChevronRight/>
                    </div>    
                </div>)}

                {/* User actions - Right side */}
                <div className='flex items-center space-x-2 sm:space-x-4 justify-end flex-1'>
                    <div className='hidden sm:block'>
                        <a
                            href="#"
                            target='_blank'
                            rel='noreferrer'
                            className='bg-gray-300 py-1 px-2 sm:py-1.5 sm:px-3 cursor-pointer rounded text-dark-gray-700 hover:bg-gray-200 text-sm sm:text-base whitespace-nowrap'>
                            Premium
                        </a>
                    </div>   
                    
                    {!user && (
                        <Link 
                            href='/auth' 
                            onClick={() => { setAuthModalState((prev) => ({...prev, isOpen: true, type: 'login' })) }}
                            className='bg-gray-300 py-1 px-2 text-dark-gray-700 cursor-pointer rounded hover:bg-gray-200 text-sm sm:text-base whitespace-nowrap'
                        >
                            Sign In
                        </Link>
                    )}
                    
                    {user && problemPage && <Timer />} 
                    
                    {user && ( 
                        <div className='cursor-pointer group relative flex-shrink-0'>
                            <img 
                                src='/avatar.png' 
                                alt='Avatar' 
                                width={30} 
                                height={30} 
                                className='rounded-full'
                            />
                            <div className='absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-white text-black p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out whitespace-nowrap'>
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