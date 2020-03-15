import React from 'react';
import { IButton } from '../../models/Button';
import classnames from 'classnames';

const Button: React.FC<IButton> = ({ appearance, children, onClick }) => {
    const classes = classnames('btn', { [`btn-${appearance}`]: appearance });

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
