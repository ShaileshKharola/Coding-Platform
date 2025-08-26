import { firestore } from '@/firebase/firebase';
import { DBProblem, Problem } from '@/utils/types/problem';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
type problemDescriptionProps = {
    problem:Problem;
};

const ProblemDescription:React.FC<problemDescriptionProps> = ({problem}) => {
    const {currentProblem,loading,problemDifficultyClass} = useGetCurrentProblem(problem.id);
    return (
        <div className='bg-gray-200'>
            {/* tabs*/}
            <div className='flex h-11 w-full items-center pt-2 bg-gray-100 text-black overflow-x-hidden'>
                <div className={'bg-gray-300 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer'}>Description</div>
            </div>
            {/* Increased height here */}
            <div className='flex px-0 py-4 h-[calc(100vh-60px)] overflow-y-auto'>
                <div className='px-5'>
                    <div className='w-full'>
                        <div className='flex space-x-4'>
                            <div className='flex-1 mr-2 text-lg text-black font-medium'>{problem?.title}</div>
                        </div>
                        <div className='flex item-center mt-3'>
                            <div className='text-green-600 bg-green-200 online-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize '>Easy</div>
                            <div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-700'>
                            <BsCheck2Circle/>
                        </div>
                        <div className='flex items-center cursor-pointer hover:bg-gray-50 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-700'>
                            <AiFillLike/>
                            <span className='text-xs'>120</span>
                        </div>
                        <div className='flex item-center cursor-pointer hover:bg-gray-50 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-700'>
                            <AiFillLike/>
                            <span className='text-xs'>2</span>
                        </div>
                        <div className='cursor-pointer hover:bg-gray-100 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-orange-500 text-orange-400'>
                            <TiStarOutline/>
                        </div>
                    </div>
                    </div>
                    <div className='text-black text-sm'>
                        <div
                        dangerouslySetInnerHTML={{__html: problem.problemStatement}}></div>

                        
                    </div>
                    <div className='mt-4'>
                        {problem.examples.map((example, index) => (
                            <div key={example.id}>
                                <p className='font-medium text-black'>Example {index + 1}:</p>
                                {example.img && <img src={example.img} alt='' className='mt-3' />}
                                <div className='example-card'>
                                    <pre><strong className='text black'>Input:</strong>
                                    {example.inputText}
                                        <br/>
                                        <strong>Output:</strong> {example.outputText}
                                        <br />
                                        {example.explanation && (<>
                                        <strong>Explanation:</strong> {example.explanation}
                                        </>)}
                                    </pre>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='my-8 pb-2'>
                        <div className='text-black font-medium'>Constraints:</div>
                        <ul className='list-disc ml-5  text-black text-sm'>
                            <div dangerouslySetInnerHTML={{__html: problem.constraints}}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProblemDescription;
function useGetCurrentProblem(problemId: string) {
    const [currentProblem,setCurrentProblem]=useState<Problem | null>(null);
    const [loading,setLoading]=useState<boolean>(true);
    const[problemDifficulty,setProblemDifficulty]=useState<string>("");

    useEffect(()=>{
        const getCurrentProblem = async()=>{
            setLoading(true);
            const docRef=doc(firestore,"problems",problemId);
            const docSnap=await getDoc(docRef);
            if(docSnap.exists()){
                const problem=docSnap.data();
                setCurrentProblem({id:docSnap.id, ...problem} as DBProblem);
                setProblemDifficulty(problem.difficulty==="Easy" ? "bg-olive text-olive": problem.difficulty==="Medium" ? "bg-yellow-500 text-yellow-500": "bg-red-500 text-red-500");
            }
            setLoading(false);
        }
        getCurrentProblem();
    },[problemId])
    return[currentProblem,loading,problemDifficulty]
}