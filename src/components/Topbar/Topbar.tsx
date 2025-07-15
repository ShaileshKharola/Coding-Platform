import Link from 'next/link';
import React from 'react';

type TopbarProps = {};

const Topbar:React.FC<TopbarProps> = () => {
    
    return (
        <div className='relative flex h-[50px] w-full shrink-0 items-center px-5 bg-gray-700 text-dark-gray-7'>
            <Link href='/' className='h-[40px] flex items-center'>
                <img src='./logo.png' alt='Logo' className='h-full' />
            </Link>
            <div className='flex items-center space-x-4 ml-auto'>
                <a
                    href="#"
                    target='_blank'
                    rel='noreferrer'
                    className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out'
                >
                    Premium
                </a>
                <Link href='/auth'>
                    <button className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out'>
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default Topbar;