import ProblemTable from "@/components/ProblemTable/ProblemTable";
import Topbar from "@/components/Topbar/Topbar";
export default function Home() {
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
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Title
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Difficulty
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Solution
        </th>
      </tr>
    </thead>
    <ProblemTable />
  </table>
</div>
</main>
  );
}
