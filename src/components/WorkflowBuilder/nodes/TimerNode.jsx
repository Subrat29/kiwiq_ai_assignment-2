import { useState, useEffect } from 'react';
import { BaseNode, TextField, SelectField } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const { interval: initialInterval = '1000', unit: initialUnit = 'ms' } = data || {};

  const [interval, setInterval] = useState(initialInterval);
  const [unit, setUnit] = useState(initialUnit);

  useEffect(() => {
    data?.updateField?.('interval', interval);
    data?.updateField?.('unit', unit);
  }, [interval, unit]);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Timer"
      outputs={[{ id: 'trigger' }]}
    >
      <TextField
        label="Interval"
        value={interval}
        onChange={(value) => setInterval(value)}
        placeholder="1000"
      />
      <SelectField
        label="Unit"
        value={unit}
        onChange={(value) => setUnit(value)}
        options={[
          { value: 'ms', label: 'Milliseconds' },
          { value: 's', label: 'Seconds' },
          { value: 'm', label: 'Minutes' }
        ]}
      />
    </BaseNode>
  );
};
