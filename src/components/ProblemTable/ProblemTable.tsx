import React, { useEffect, useState } from 'react';
import { problems } from '@/mockProblems/problem';
import { BsCheckCircle } from 'react-icons/bs';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';

type ProblemTableProps = {};

const ProblemTable: React.FC = () => {
    const [youtubePlayer, setYoutubePlayer] = useState({
        isOpen: false,
        videoId: '',
    })
    const closeModal= () => {
        setYoutubePlayer({
            isOpen: false,
            videoId: ''
        });
    }
    
    return (
        <>
        <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700'>
          {problems.map((doc,idx)=>{
            const difficultyColor = doc.difficulty === 'Easy' ? 'text-green-500' : doc.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500';
            return(
                <tr key={doc.id} className={`${idx % 2==1 ? 'bg-gray-50' : ''}`}>
                    <th className='px-2 py-4 whitespace-nowrap text-sm font-medium text-green-700 dark:text-white'>
                        <BsCheckCircle fontSize={"20"} width="18"/>
                        </th>
               <td className='px-2 py-4'>
                <Link className='text-blue-600 dark:text-blue-400 hover:underline' href={`/problems/${doc.id}`}>                   
                {doc.title}
                </Link>
               </td>
               <td className={`px-2 py-4 ${difficultyColor}`}>
                {doc.difficulty}
               </td>
               <td className='px-2 py-4'>
                   {doc.category}
               </td>
               <td className='px-2 py-4'>
                {doc.videoId ? (
                    <AiFillYoutube
                    fontSize={"30"}
                    className='cursor-pointer hover:text-red-500'
                    onClick={()=> setYoutubePlayer({
                        isOpen: true,
                        videoId: doc.videoId as string
                    })}
                    />
                ):(<p className='text-gray-500'> Coming soon</p>)}
               </td>
              </tr>
            )
          })}
        </tbody>
        {youtubePlayer.isOpen && (
            <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                <div className='bg-white z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' onClick={closeModal}></div>
                <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                    <div className='w-full h-full flex items-center justify-center relative'>
                        <div className='w-full relative'>
                            <IoClose fontSize={"35"} className='cursor-pointer absolute -top-7 right-0' 
                            onClick={closeModal}  />
                            <YouTube videoId={youtubePlayer.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]' />
                        </div>
                    </div>
                </div>              
        </tfoot>
        )}
        </>
    );
}
export default ProblemTable;