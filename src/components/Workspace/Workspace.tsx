import React from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
type WorkspaceProps = {
    
};

const Workspace:React.FC<WorkspaceProps> = () => {
    
    return <Split className='split' minSize={0}>
        <ProblemDescription/>
        <div>The code editor will be here</div>

    </Split>
}
export default Workspace;