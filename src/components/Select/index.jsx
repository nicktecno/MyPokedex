import React from 'react';

import './styles.css';

const Select = ({ name, label, options, onChange }) => (
  <div className="select-block">
    <label htmlFor={name}>{label}</label>
    <select id={name} onChange={onChange}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
export default Select;
