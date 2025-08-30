import React from 'react';


const CircleSkeletons:React.FC = () => {

    return <div className='space-y-2.5 animate-pulse max-w-lg'>
        <div className='flex items-center w-full space-x-2'>
            <div className='h-6 w-6 rounded-full bg-gray-300'></div>
        </div>
    </div>
}
export default CircleSkeletons;