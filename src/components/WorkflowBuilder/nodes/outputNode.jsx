import React, { useState, useEffect, useCallback } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const { outputName, outputType, updateField } = data;

  const [currName, setCurrName] = useState(outputName || id.replace('customOutput-', 'output_'));
  const [type, setType] = useState(outputType || 'Text');

  const handleUpdateField = useCallback((fieldName, value) => {
    if (updateField) {
      updateField(fieldName, value);
    }
  }, [updateField]);

  useEffect(() => {
    handleUpdateField('outputName', currName);
    handleUpdateField('outputType', type);
  }, [currName, type, handleUpdateField]);

  const outputTypeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'Image', label: 'Image' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      inputs={[{ id: 'input', type: 'target' }]}
      outputs={[{ id: 'output', type: 'source' }]}
    >
      <TextField
        label="Name"
        value={currName}
        onChange={setCurrName}
      />
      <SelectField
        label="Type"
        value={type}
        onChange={setType}
        options={outputTypeOptions}
      />
    </BaseNode>
  );
};
