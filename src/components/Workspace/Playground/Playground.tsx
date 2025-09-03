import React, { useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import Split from 'react-split';
import ReactCodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { problems } from '@/utils/problems';
type PlaygroundProps = {
    problem: Problem;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground:React.FC<PlaygroundProps> = ({ problem, setSuccess }) => {
   const [activeTestCaseId,setActiveTestCaseId] =useState<number>(0);
   const [userCode,setUserCode]=useState<string>(problem.starterCode);
   const [user]=useAuthState(auth);
   const {query:{pid}}=useRouter();
   const handleSubmit=async()=>{}
    if(!user){
        toast.error("Please login to submit", { position: "top-center",autoClose: 3000,theme:"dark" 
        });
        return;
    }try{
        const cb=new Function(`return ${userCode}`)();
        const success=problems[pid as string].handleFunction(cb);
        if(success){
            toast.success("Congrats! All Test passed",{
                position: "top-center",
                autoClose: 3000,
                theme: "dark"
            })
            setSuccess(true);
            setTimeout(()=>{
                setSuccess(false);
            }, 3000);
        }
    }catch(error){
        toast.error("Error submitting code", { position: "top-center",autoClose: 3000,theme:"dark" });
   }
   const onChange=(value:string)=>{
       setUserCode(value);
   }
    return(
        
        <div className='flex flex-col bg-gray-200 relative'>
        <PreferenceNav/>
        <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[60,40]} minSize={60} >
            <div className='w-full overflow-auto '>
                <ReactCodeMirror className=''
                value={problem.starterCode}
                theme = {vscodeDark}
                onChange={onChange}
                extensions={[javascript()]}
                style={{fontSize: '16px'}}/>
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
                    {problem.examples.map((example,index)=>(
                        <div className='mr-2 items-start mt-2 text-black' key={example.id}
                        onClick={() => setActiveTestCaseId(index)}>
                            <div className='flex flex-wrap items-center gap-y-4'>
                                <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-300 hover:bg-gray-400 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${activeTestCaseId === index ? 'bg-gray-400' : ''}`}>Test Case {index + 1}   </div>
                            </div>
                        </div>
                    ))}
                    </div>
                <div className='font-semibold my-4'>
                    <p className='text-sm font-medium mt-4 text-black'>Input:</p>
                    <div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-300 border-transparent text-black mt-2'>
                        {problem.examples[activeTestCaseId]?.inputText}
                        </div>
                        <p className='text-sm font-medium mt-4 text-black'>Output:</p>
                        <div className='m-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-300 border-transparent text-black mt-2'>
                            {problem.examples[activeTestCaseId]?.outputText}
                        </div>
                    </div>
            </div>
        </Split>
        <EditorFooter handleSubmit={handleSubmit} />
        </div>
    )
}
export default Playground;