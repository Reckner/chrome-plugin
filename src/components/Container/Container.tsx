import React from 'react';
import classnames from 'classnames';

import { IContainer } from '../../models/Container';

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
