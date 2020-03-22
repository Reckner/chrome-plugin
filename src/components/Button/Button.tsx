import React from 'react';
import { IButton } from '../../models/Button';
import classnames from 'classnames';

const Button: React.FC<IButton> = ({
    appearance,
    children,
    className,
    onClick,
    style,
}) => {
    const classes = classnames(
        'btn',
        { [`btn-${appearance}`]: appearance },
        className,
    );

    return (
        <button className={classes} onClick={onClick} style={style}>
            {children}
        </button>
    );
};

export default Button;
