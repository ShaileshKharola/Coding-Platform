import Topbar from '@/components/Topbar/Topbar';
import React from 'react';

type ProblemPageProps = {};

const ProblemPageProps:React.FC<ProblemPageProps> = () => {
    
    return <div>
        <Topbar problemPage={true}/>
    </div>
}
export default ProblemPageProps;