import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import { Problem } from '@/utils/types/problem';
import Playground from './Playground/Playground';
type WorkspaceProps = {
    problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
    const [success, setSuccess] = React.useState(false);
    const[solved,setSolved]=useState(false);
    return (
        <Split className='split' minSize={0}>
        <ProblemDescription problem={problem} _solved={solved}/>
        <div className='bg-gray-300'>
        <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved}/>
</div>
    </Split>
);
}
export default Workspace;