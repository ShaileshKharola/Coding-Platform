import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/problemDescription';
type WorkspaceProps = {
    
};

const Workspace:React.FC<WorkspaceProps> = () => {
    
    return <Split className='split'>
        <ProblemDescription/>

    </Split>
}
export default Workspace;