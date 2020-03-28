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
    disabled,
}) => {
    const classes = classnames(
        'btn',
        { [`btn-${appearance}`]: appearance },
        className,
    );

    const styles = { ...style, pointerEvents: disabled ? 'none' : null };

    return (
        <button
            title={title}
            className={classes}
            onClick={onClick}
            style={styles}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
