import React, { memo } from 'react';
import classnames from 'classnames';

import { IInput } from '../../models/Input';

const Input: React.FC<IInput> = ({
    className,
    containerClassName,
    id,
    label,
    labelClassName,
    name,
    onChange,
    placeholder,
    type,
    value,
    disabled,
}) => {
    const classes = classnames('form-control', className);

    return (
        <div className={classnames('form-group', containerClassName)}>
            {label && (
                <label className={labelClassName} htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                className={classes}
                id={id}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                value={value}
                disabled={disabled}
            />
        </div>
    );
};

export default memo(Input);
