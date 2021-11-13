import React from 'react';

interface PerPageSelector {
  value: string;
  onChange(newValue: string): void;
}

const PerPageSelector: React.FC<PerPageSelector> = ({ value, onChange }) => (
  <input
    className="form-input-style"
    placeholder="Procurar por..."
    value={value}
    onChange={({ target }) => onChange(target.value)}
  />
);

export default PerPageSelector;
