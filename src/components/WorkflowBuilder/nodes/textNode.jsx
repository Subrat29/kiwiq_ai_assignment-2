import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BaseNode } from './BaseNode';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../../../redux/flowSlice';

const VARIABLE_REGEX = /\{\{([^{}]+)\}\}/g;
const MAX_NODE_HEIGHT = 300;

export const TextNode = ({ id, data }) => {
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);

  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);

  const extractVariables = useCallback((inputText) => {
    const matches = Array.from(inputText.matchAll(VARIABLE_REGEX));
    return [...new Set(matches.map(match => match[1].trim()))];
  }, []);

  const adjustTextAreaHeight = useCallback(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(MAX_NODE_HEIGHT - 40, Math.max(100, textarea.scrollHeight))}px`;
    }
  }, []);

  useEffect(() => {
    dispatch(updateNodeField({ nodeId: id, fieldName: 'text', fieldValue: text }));

    const newVariables = extractVariables(text);
    setVariables(newVariables);
    adjustTextAreaHeight();

    // console.log(`Extracted Variables: ${JSON.stringify(newVariables)}`);
    // console.log(`Current Edges: ${JSON.stringify(edges)}`); // Log current edges
  }, [text, dispatch, id, extractVariables, adjustTextAreaHeight]);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [adjustTextAreaHeight]);

  const handleTextChange = (newText) => {
    console.log(`Text changed to: ${newText}`);
    setText(newText);
    dispatch(updateNodeField({ nodeId: id, fieldName: 'text', fieldValue: newText }));
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputs={variables.map(variable => ({ id: variable, type: 'target' }))}
      outputs={[{ id: 'output', type: 'source' }]}
    >
      <textarea
        ref={textAreaRef}
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter text here. Use {{variableName}} for variables..."
        style={{
          width: '100%',
          minHeight: '100px',
          maxHeight: `${MAX_NODE_HEIGHT - 40}px`,
          resize: 'none',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '13px',
          lineHeight: '1.4',
          overflowY: 'auto'
        }}
      />
    </BaseNode>
  );
};
