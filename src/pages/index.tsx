import ProblemTable from "@/components/ProblemTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";
import { setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { doc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export default function Home() {
  const [input,setInput]=useState({
    id:"",
    title:"",
    difficulty:"",
    category:"",
    videoId:"",
    link:"",
    order: 0,
    likes:0,
    dislikes:0,
  });
  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setInput({
      ...input,[e.target.name]:e.target.value
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //convert inputs.order to Integer
    const newProblem={
      ...input,
      order: Number(input.order),
    }
    await setDoc(doc(firestore, "problems", input.id), newProblem);
    alert("saved to db")
  }
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
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
    <ProblemTable />
  </table>
</div>
<form className="p-6 flex flex-col max-w-sm gap-3" onSubmit={handleSubmit}>
  <input type="text" placeholder="problem id" name="id" onChange={handleChange} />
  <input type="text" placeholder="title" name="title" onChange={handleChange} />
  <input type="text" placeholder="difficulty" name="difficulty" onChange={handleChange} />
  <input type="text" placeholder="category" name="category" onChange={handleChange} />
  <input type="text" placeholder="order" name="order" onChange={handleChange} />
  <input type="text" placeholder="videoId?" name="videoId" onChange={handleChange} />
  <input onChange={handleChange} type="text" placeholder="link?" name="link" />
  <button className="bg-blue-500 text-white py-2 px-4 rounded">Save to dbc</button>
</form>
</main>
  );
}
