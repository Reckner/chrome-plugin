import React from 'react';
import { IContainer } from '../../models/Container';
import classnames from 'classnames';

const style = {
    height: '90%',
} as React.CSSProperties;

const Container: React.FC<IContainer> = ({ children, className }) => {
    return (
        <div
        style={style}
            className={classnames(
                'd-flex flex-column py-4 pl-4',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
