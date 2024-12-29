import React from 'react';
import { Handle, Position } from 'reactflow';
import { useDispatch } from 'react-redux';
import { updateNodeField } from '../../../redux/flowSlice';

const HANDLE_STYLES = {
  width: '12px',
  height: '12px',
  background: 'white',
  border: '2px solid #6966FF',
  borderRadius: '50%',
  zIndex: 5,
};

export const createHandle = ({ type, position, id, style = {}, ...props }) => (
  <Handle
    type={type}
    position={position}
    id={id}
    style={{ ...HANDLE_STYLES, ...style }}
    {...props}
  />
);

export const BaseNode = ({
  id,
  data,
  title,
  inputs = [],
  outputs = [],
  children,
  minHeight = 80,
  width = 280,
}) => {
  const dispatch = useDispatch();

  const updateField = (fieldName, fieldValue) => {
    dispatch(updateNodeField({ nodeId: id, fieldName, fieldValue }));
  };

  const renderHandles = (handles, type, position, offset) =>
    handles.map((handle, index) => {
      const yPosition = `${((index + 1) * 100) / (handles.length + 1)}%`;
      return createHandle({
        key: `${type}-${handle.id}`,
        type,
        position,
        id: `${id}-${handle.id}`,
        style: { [offset]: '-6px', top: yPosition },
        ...(handle.props || {}),
      });
    });

  return (
    <div
      className="react-flow__node-default"
      style={{
        padding: '12px',
        background: 'white',
        border: '1px solid #bbb',
        borderRadius: '8px',
        width: `${width}px`,
        minHeight: `${minHeight}px`,
        position: 'relative',
      }}
    >
      <div className="node-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', color: '#666' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>{title}</span>
      </div>

      {renderHandles(inputs, 'target', Position.Left, 'left')}

      <div style={{ padding: '0 8px' }}>
        {React.Children.map(children, (child) =>
          typeof child.type === 'function' ? React.cloneElement(child, { updateField, data }) : child
        )}
      </div>

      {renderHandles(outputs, 'source', Position.Right, 'right')}
    </div>
  );
};

const fieldStyle = {
  container: { marginBottom: '8px' },
  label: { display: 'block', marginBottom: '4px', fontSize: '12px' },
  input: {
    width: '100%',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '13px',
  },
};

export const TextField = ({ label, value, onChange, placeholder }) => (
  <div style={fieldStyle.container}>
    <label style={fieldStyle.label}>{label}:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={fieldStyle.input}
    />
  </div>
);

export const SelectField = ({ label, value, onChange, options }) => (
  <div style={fieldStyle.container}>
    <label style={fieldStyle.label}>{label}:</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} style={fieldStyle.input}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
