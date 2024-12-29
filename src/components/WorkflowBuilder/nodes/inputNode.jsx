import React, { useState, useEffect } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../../../redux/flowSlice';

export const InputNode = ({ id, data }) => {
  const dispatch = useDispatch();

  const { inputName = id.replace('customInput-', 'input_'), inputType: initialInputType = 'Text' } = data || {};

  const [currName, setCurrName] = useState(inputName); 
  const [inputType, setInputType] = useState(initialInputType); 

  useEffect(() => {
    dispatch(updateNodeField({ nodeId: id, fieldName: 'inputName', fieldValue: currName }));
    dispatch(updateNodeField({ nodeId: id, fieldName: 'inputType', fieldValue: inputType }));
  }, [currName, inputType, dispatch, id]); 

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      outputs={[{ id: 'value', type: 'source' }]}
    >
      <TextField
        label="Name"
        value={currName}
        onChange={setCurrName}
      />
      <SelectField
        label="Type"
        value={inputType}
        onChange={setInputType} 
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]}
      />
    </BaseNode>
  );
};
