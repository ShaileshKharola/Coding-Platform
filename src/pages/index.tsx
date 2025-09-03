import ProblemTable from "@/components/ProblemTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";

import React, { useState } from "react";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();
  if(!hasMounted) return null;
  return (
       <main className="bg-gray-200 min-h-screen">
      <Topbar />
      <h1 className='text-4xl text-center font-extrabold uppercase my-12 text-gray-900 dark:text-gray-500'>
        <a>☠️ </a>
  <span className='relative'>
    <span className='absolute inset-0 text-gray-400 dark:text-gray-900 translate-y-1 translate-x-1 opacity-70'>
      CODE LIKE BEAST 
    </span>
    <span className='relative z-10'>CODE LIKE BEAST</span>
  </span>
  <a> ☠️</a>
</h1>
<div className="relative overflow-x-auto mx-auto px-6 pb-10">
  {loadingProblems && (
    <div className="max-w-[1200px] mx-auto sw:w-7/12 w-full animate-pulse">
      {[...Array(10)].map((_, index) => (
        <LoadingSkeleton key={index} />
      ))}
    </div>
  )}
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    {!loadingProblems && (
      <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Difficulty
        </th>
        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
        </th>
        <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Solution
        </th>
      </tr>
    </thead>
    )}
    <ProblemTable setLoadingProblems={setLoadingProblems}/>
  </table>
</div>
</main>
  );
}
const LoadingSkeleton=()=>{
  return(
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 bg-gray-300 rounded-full shrink-0"></div>
      <div className="h-4 sm:w-52 w-32 bg-gray-300 rounded-full"></div>
      <div className="h-4 sm:w-52 w-32 bg-gray-300 rounded w-1/4"></div>
      <div className="h-4 sm:w-52 w-32 bg-gray-300 rounded w-1/4"></div>
      <span className="sr-only">Loading...</span>

    </div>

  )
}