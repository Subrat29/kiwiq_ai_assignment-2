import React from 'react';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputs={[{ id: 'system', type: 'target' }, { id: 'prompt', type: 'target' }]}
      outputs={[{ id: 'response', type: 'source' }]}
    >
      <div>
        <span>This is a LLM node.</span>
      </div>
    </BaseNode>
  );
};
