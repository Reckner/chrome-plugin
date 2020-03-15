import React from 'react';
import { IButton } from '../../models/Button';
import classnames from 'classnames';

const Button: React.FC<IButton> = ({
    appearance,
    children,
    className,
    onClick,
}) => {
    const classes = classnames(
        'btn',
        { [`btn-${appearance}`]: appearance },
        className,
    );

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
