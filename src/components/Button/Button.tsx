import React from 'react';
import classnames from 'classnames';

import { IButton } from '../../models/Button';

const Button: React.FC<IButton> = ({
    appearance,
    children,
    className,
    onClick,
    style,
    title,
}) => {
    const classes = classnames(
        'btn',
        { [`btn-${appearance}`]: appearance },
        className,
    );

    return (
        <button
            title={title}
            className={classes}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;
