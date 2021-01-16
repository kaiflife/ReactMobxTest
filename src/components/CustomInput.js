import React from 'react';

const CustomInput = ({
    placeholder = '',
    inputType = 'text',
    value = '',
    onChange,
    onClick = () => {},
    label = '',
    classes = '',
}) => {
    return (
        <div className={`custom-input ${classes}`}>
            {label && <label className='input-label'>{label}</label>}
            <input
                placeholder={placeholder}
                type={inputType}
                value={value}
                onChange={e => onChange(e.target.value)}
                onClick={onClick}
            />
        </div>
    )
}

export default CustomInput;