import React from 'react';
import { IContainer } from '../../models/Container';
import classnames from 'classnames';

const Container: React.FC<IContainer> = ({ children, className }) => {
    return (
        <div
            className={classnames(
                'd-flex flex-column py-4 pl-4 h-100',
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Container;
