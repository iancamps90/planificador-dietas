// src/components/FormField.jsx

import React from 'react';

const FormField = ({ label, type, id, name, value, onChange, error, options }) => (
    <div>
        <label htmlFor={id}>{label}:</label>
        {type === 'select' ? (
            <select id={id} name={name} value={value} onChange={onChange} required>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option === "" ? `Selecciona tu ${name}` : option}
                    </option>
                ))}
            </select>
        ) : (
            <input type={type} id={id} name={name} value={value} onChange={onChange} required />
        )}
        {error && <p className="error">{error}</p>}
    </div>
);

export default FormField;