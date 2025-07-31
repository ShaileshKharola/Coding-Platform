import React from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import ReactCodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
type PlaygroundProps = {
    
};

const Playground:React.FC<PlaygroundProps> = () => {
    
    return(
        
        <div className='flex flex-col bg-gray-200 relative'>
        <PreferenceNav/>
        <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60,40]} minSize={60} >
            <div className='w-full overflow-auto '>
                <ReactCodeMirror className=''
                value="const a=1;"
                theme = {vscodeDark}
                extensions={[javascript()]}
                style={{fontSize: '14px'}}/>
            </div>
            {/* testcase heading*/}
            <div className='w-full px-5 overflow-auto'>
                <div className='flex h-10 items-center space-x-6'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-sm font-medium leading-5 text-black'>Test Cases    </div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-gray-400'/>
                    </div>
                </div>
                <div className='flex'>
                    <div className='mr-2 items-start mt-2 text-black'>
                        <div className='flex flex-wrap items-center gap-y-4'>
                            <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-gray-300 hover:bg-gray-400 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>Test Case 1   </div>
                        </div>
                    </div>

                    <div className='mr-2 items-start mt-2 text-black'>
                        <div className='flex flex-wrap items-center gap-y-4'>
                            <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-gray-300 hover:bg-gray-400 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>Test Case 2   </div>
                        </div>
                    </div>

<div className='mr-2 items-start mt-2 text-black'>
                        <div className='flex flex-wrap items-center gap-y-4'>
                            <div className='font-medium items-center transition-all focus:outline-none inline-flex bg-gray-300 hover:bg-gray-400 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>Test Case 3   </div>
                        </div>
                    </div>
                </div>
                <div className='font-semibold my-4'>
                    <p className='text-sm font-medium mt-4 text-black'>Input:</p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-300 border-transparent text-black mt-2'>
                        nums: [2,7,11,15], target: 9
                        </div>
                        <p className='text-sm font-medium mt-4 text-black'>Output:</p>
                        <div className='m-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-300 border-transparent text-black mt-2'>
                            [0,1]
                        </div>
                    </div>
            </div>
        </Split>
        <EditorFooter/>
        </div>
    )
}
export default Playground;