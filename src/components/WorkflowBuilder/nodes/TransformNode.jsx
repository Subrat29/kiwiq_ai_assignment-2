import { useState, useEffect } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const { transform: initialTransform = 'uppercase' } = data || {};
  const [transform, setTransform] = useState(initialTransform);

  useEffect(() => {
    data?.updateField?.('transform', transform);
  }, [transform]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <SelectField
        label="Transform Type"
        value={transform}
        onChange={(value) => setTransform(value)}
        options={[
          { value: 'uppercase', label: 'To Uppercase' },
          { value: 'lowercase', label: 'To Lowercase' },
          { value: 'capitalize', label: 'Capitalize' },
          { value: 'reverse', label: 'Reverse' }
        ]}
      />
    </BaseNode>
  );
};
