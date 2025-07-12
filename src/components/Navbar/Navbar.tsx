import React from 'react';
import Link from "next/link";
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtoms';
type NavbarProps = {
};
const Navbar: React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const handleClick = () => {
        setAuthModalState((prev) => ({
            ...prev,
            isOpen: true,
        }));
    }
    return <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
        <Link href="/" className='flex items-center item-center h-20'>
        <img src="./logo.png" alt="Leetclone" className="h-full" />
        </Link>
        <button className='bg-blue-950 text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-blue hover:bg-blend-darken hover:border-2 hover:border-b-blue-500 border-2 border-transparent duration-300 ease-in-out'
        onClick={handleClick}
        >Sign In</button>
    </div>
};
export default Navbar;