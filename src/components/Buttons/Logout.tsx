import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { auth } from '@/firebase/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';


const Logout:React.FC = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const handleLogout =()=>{
        signOut();
    }
    return <button className='bg-gray-300 py-1.5 px-3 rounded-md text-sm font-medium text-dark-gray-7 hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center space-x-2 'onClick={handleLogout}> 
        <FiLogOut/>
    </button>
}
export default Logout;
