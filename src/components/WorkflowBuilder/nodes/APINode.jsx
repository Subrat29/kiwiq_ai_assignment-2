import { useState, useEffect } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode';

export const APINode = ({ id, data }) => {
  const { endpoint: initialEndpoint = '', method: initialMethod = 'GET' } = data || {};
  const [endpoint, setEndpoint] = useState(initialEndpoint);
  const [method, setMethod] = useState(initialMethod);

  useEffect(() => {
    data?.updateField?.('endpoint', endpoint);
    data?.updateField?.('method', method);
  }, [endpoint, method]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      inputs={[{ id: 'headers' }, { id: 'body' }]}
      outputs={[{ id: 'response' }]}
    >
      <TextField
        label="Endpoint"
        value={endpoint}
        onChange={(value) => setEndpoint(value)}
        placeholder="https://api.example.com/data"
      />
      <SelectField
        label="Method"
        value={method}
        onChange={(value) => setMethod(value)}
        options={[
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]}
      />
    </BaseNode>
  );
};
