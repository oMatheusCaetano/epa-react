import React from 'react';

interface LiveSearchInput {
  value: string;
  onChange(newValue: string): void;
}

const LiveSearchInput: React.FC<LiveSearchInput> = ({ value, onChange }) => (
  <input
    className="form-input-style"
    placeholder="Procurar por..."
    type="search"
    value={value}
    onChange={({ target }) => onChange(target.value)}
  />
);

export default LiveSearchInput;
