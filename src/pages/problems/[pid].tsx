import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import React from 'react';

type ProblemPageProps = {};

const ProblemPageProps:React.FC<ProblemPageProps> = () => {
    
    return (
    <div>
        <Topbar problemPage={true}/>
        <Workspace/>
    </div>
    );
}
export default ProblemPageProps;
// fetch the local data 
// SSG--> static Site Generation--> when problems are open for coding purpose the site is generated at build time(when the problem is open for coding)
// getStaticPaths=> its creates the dynamic routes
const async function getStaticPaths(params:type) {
    const paths=object.keys()
}