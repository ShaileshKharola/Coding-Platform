import React from 'react';
import { problems } from '@/mockProblems/problem';
import { BsCheckCircle } from 'react-icons/bs';
import Link from 'next/link';
type ProblemTableProps = {};

const ProblemTable:React.FC<ProblemTableProps> = () => {
    
    return (
        <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700'>
          {problems.map((doc,idx)=>{
            const difficultyColor = doc.difficulty === 'Easy' ? 'text-green-500' : doc.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500';
            return(
                <tr key={doc.id} className={`${idx % 2==1 ? 'bg-gray-50' : ''}`}>
                    <th className='px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
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
                    <Link className='text-blue-600 dark:text-blue-400 hover:underline' href={`#=${doc.videoId}`} target="_blank" rel="noopener noreferrer">
                        Watch Video
                   </Link>
                ) : (
                    <span className='text-gray-500'>No Video</span>
                )}
                   <Link className='text-blue-600 dark:text-blue-400 hover:underline' href={`/problems/${doc.id}`}>
                       Solution
                   </Link>
               </td>
              </tr>
            )
          })}
        </tbody>
    );
}
export default ProblemTable;