import React from 'react';
import { AiOutlineFullscreen, AiOutlineSetting } from 'react-icons/ai';

type PreferenceNavProps = {
    
};

const PreferenceNav:React.FC<PreferenceNavProps> = () => {
    
    return <div className='flex items-center justify-between bg-gray-100 h-11 w-full'>
        <div className='flex item-center text-black'>
            <button className='flex cursor-pointer items-center rounded focus:outline-none bg-gray-300 text-black hover:bg-gray-200 px-2 py-1.5 font-medium'>
                <div className='flex item-center px-1'>
                    <div className='text-xs text-black dark-text-black'>JavaScript</div>
                </div>
            </button>
        </div>
        <div className='flex item-center m-2'>
            <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-gray-200 group'>
                <div className='h-4 w-4 text-dark-black font-bold text-lg'>
                    <AiOutlineSetting/>
                </div>
                <div className='absolute w-auto p-2 text:sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-ml shadow-md text-black bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                    Settings</div>
            </button>
            <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-gray-200 group'>
                <div className='h-4 w-4 text-dark-black font-bold text-lg'>
                    <AiOutlineFullscreen/>
                </div>
                <div className='absolute w-auto p-2 text:sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-ml shadow-md text-black bg-gray-200 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                    Full Screen</div>
            </button>
        </div>
    </div>
}
export default PreferenceNav;