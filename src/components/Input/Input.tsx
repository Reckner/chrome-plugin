import React, { memo } from 'react';
import { MInput } from '../../models/Input';
import classnames from 'classnames';

const Input: React.FC<MInput> = ({
    className,
    containerClassName,
    id,
    label,
    labelClassName,
    name,
    onChange,
    placeholder,
    type,
}) => {
    const classes = classnames('form-control', className, 'shadow-none');

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
                placeholder={placeholder}
                type={type}
                onChange={onChange}
            />
        </div>
    );
};

export default memo(Input);
