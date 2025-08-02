import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import { problems } from '@/utils/problems';
import {Problem} from '@/utils/types/problem'; 
import React from 'react';

type ProblemPageProps = {
    problem: Problem;
};

const ProblemPage:React.FC<ProblemPageProps> = ({problem}) => {
    console.log(problem);
    return (
    <div>
        <Topbar problemPage={true}/>
        <Workspace problem={problem}/>
    </div>
    );
}
export default ProblemPage;
// fetch the local data 
// SSG--> static Site Generation--> when problems are open for coding purpose the site is generated at build time(when the problem is open for coding)
// getStaticPaths=> its creates the dynamic routes
export async function getStaticPaths() {
    const paths=Object.keys(problems).map((key) => ({
        params: { pid: key }
    }));
    return{
        paths,
        fallback: false // if the path is not found then it will show 404 page
    }
}

// getStaticProps is used to fetch the data at build time
export async function getStaticProps({ params }:{ params: { pid: string } }) {
    const { pid } =params;
    const problem=problems[pid];
    if (!problem) {
        return {
            notFound: true, // if the problem is not found then it will show 404 page
        };
    }
    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem,
        },
    };  
}