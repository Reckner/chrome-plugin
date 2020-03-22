import React from 'react';
import { IHeader } from '../../models/Header';
import classnames from 'classnames';

const Header: React.FC<IHeader> = ({ children, className }) => {
    return (
        <div className={classnames('border-bottom', 'mx-4', 'pt-4', className)}>
            {children}
        </div>
    );
};

export default Header;
