import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type EditorFooterProps = {};

const EditorFooter:React.FC<EditorFooterProps> = () => {
    
    return <div className='flex bg-gray-200 absolute bottom-0 z-10 w-full'>
        <div className='mx-5 my-[10px] flex justify-between w-full'>
            <div className='mr-2 flex -flex-1 flex-nowrap item-center space-x-4'>
            <button className='px-3 py-1.5 font-medium item-center transition-all inline-flex bg-gray-300 hover:bg-gray-400 relative rounded-lg cursor-pointer whitespace-nowrap'>
                Console
                <div className='ml-1 transform transition flex items-center'>
                    <BsChevronUp className='fill-gray mx-1 fill-dark-gray-500' />
                </div>
                </button>
        </div>
        <div className='ml-auto flex items-center space-x-4'>
            <button className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inflex bg-gray-300 hover:bg-gray-400 rounded-lg cursor-pointer'>Run</button>
            <button className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inflex bg-gray-300 hover:bg-gray-400 rounded-lg cursor-pointer'>Submit</button>
        </div>
</div>
    </div>
}
export default EditorFooter;