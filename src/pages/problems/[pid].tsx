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