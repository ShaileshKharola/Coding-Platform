import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import { Problem } from '@/utils/types/problem';
import Playground from './Playground/Playground';
type WorkspaceProps = {
    problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
    
    return <Split className='split' minSize={0}>
        <ProblemDescription problem={problem}/>
        <div className='bg-gray-300'>
        <Playground/>
</div>
    </Split>
}
export default Workspace;