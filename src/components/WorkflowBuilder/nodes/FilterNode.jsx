import { BaseNode, TextField, SelectField } from './BaseNode';
import React, { useState, useEffect, useCallback } from 'react';

export const FilterNode = ({ id, data }) => {
  const { updateField } = data;

  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const handleFieldUpdate = useCallback((fieldName, value) => {
    if (updateField) {
      updateField(fieldName, value);
    }
  }, [updateField]);

  useEffect(() => {
    handleFieldUpdate('field', field);
    handleFieldUpdate('operator', operator);
    handleFieldUpdate('value', value);
  }, [field, operator, value, handleFieldUpdate]);

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'greater', label: 'Greater Than' },
    { value: 'less', label: 'Less Than' },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      inputs={[{ id: 'input' }]}
      outputs={[
        { id: 'match' },
        { id: 'nomatch' },
      ]}
    >
      <TextField
        label="Field"
        value={field}
        onChange={setField}
        placeholder="data.field"
      />
      <SelectField
        label="Operator"
        value={operator}
        onChange={setOperator}
        options={operatorOptions}
      />
      <TextField
        label="Value"
        value={value}
        onChange={setValue}
        placeholder="Compare value"
      />
    </BaseNode>
  );
};
