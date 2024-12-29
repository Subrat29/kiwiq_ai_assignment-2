import { useEffect, useState } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode';

export const AggregatorNode = ({ id, data }) => {
  const { operation: initialOperation = 'sum', field: initialField = '', window: initialWindow = '10' } = data || {};

  const [operation, setOperation] = useState(initialOperation);
  const [field, setField] = useState(initialField);
  const [window, setWindow] = useState(initialWindow);

  useEffect(() => {
    data?.updateField?.('operation', operation);
    data?.updateField?.('field', field);
    data?.updateField?.('window', window);
  }, [operation, field, window]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Aggregator"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'result' }]}
    >
      <SelectField
        label="Operation"
        value={operation}
        onChange={(value) => setOperation(value)}
        options={[
          { value: 'sum', label: 'Sum' },
          { value: 'avg', label: 'Average' },
          { value: 'min', label: 'Minimum' },
          { value: 'max', label: 'Maximum' },
          { value: 'count', label: 'Count' }
        ]}
      />
      <TextField
        label="Field"
        value={field}
        onChange={(value) => setField(value)}
        placeholder="data.value"
      />
      <TextField
        label="Window Size"
        value={window}
        onChange={(value) => setWindow(value)}
        placeholder="10"
      />
    </BaseNode>
  );
};