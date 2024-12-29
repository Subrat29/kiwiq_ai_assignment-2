import { PipelineToolbar } from './WorkflowBuilder/toolbar';
import { PipelineUI } from './WorkflowBuilder/ui';
import { SubmitButton } from './WorkflowBuilder/submit';

function WorkflowBuilder() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default WorkflowBuilder;
