import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
type problemDescriptionProps = {
    
};

const ProblemDescription:React.FC<problemDescriptionProps> = () => {

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
                            <div className='flex-1 mr-2 text-lg text-black font-medium'>1. Two Sum</div>
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
                        <p className='mt-3'>Give an array of integers <code>nums</code>and an integer<code>target</code>,return<em> indices of the two numbers such that they add up to </em><code>target</code>.</p>
                        <p className='mt-3'>
                            You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                        </p>
                        <p className='mt-3'>You can return the answer in any order.</p>
                    </div>
                    <div className='mt-4'>
                        <div><p className='font-medium text-black'>Example 1:</p>
                        <div className='example-card'>
                            <pre><strong className='text black'>Input:</strong>nums = [2,7,11,15], target = 9{" "}
                            <br/>
                            <strong>Output:</strong>[0,1] <br />
                            <strong>Explanation:</strong> Because nums[0] + nums[1] == 9,we return [0,1].
                            </pre></div></div>
                    <div>
                        <p className='font-medium text-black'>Example 2:</p>
                        <div className='example-card'>
                            <pre><strong className='text black'>Input:</strong>nums = [3,2,4], target = 6{" "}
                            <br/>
                            <strong>Output:</strong>[1,2] <br />
                            <strong>Explanation:</strong> Because nums[1] + nums[2] == 6,we return [1,2].
                            </pre></div>
                    </div>
                    <div>
                        <p className='font-medium text-black'>Example 3:</p>
                        <div className='example-card'>
                            <pre><strong className='text black'>Input:</strong>nums = [3,3], target = 6{" "}
                            <br/>
                            <strong>Output:</strong>[0,1] <br />
                            <strong>Explanation:</strong> Because nums[0] + nums[1] == 6,we return [0,1].
                            </pre></div></div>
                    </div>
                    <div className='my-5'>
                        <div className='text-black font-medium'>Constraints:</div>
                        <ul className='list-disc ml-5 text-black text-sm'>
                            <li>2 &lt;= nums.length &lt;= 10^4</li>
                            <li>-10^9 &lt;= nums[i] &lt;= 10^9</li>
                            <li>-10^9 &lt;= target &lt;= 10^9</li>
                            <li>Only one valid answer exists.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProblemDescription;