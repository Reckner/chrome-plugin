import React from 'react';
import classnames from 'classnames';

import { IHeader } from '../../models/Header';

const Header: React.FC<IHeader> = ({ children, className }) => {
    return (
        <div className={classnames('border-bottom', 'mx-4', 'pt-3', className)}>
            {children}
        </div>
    );
};

export default Header;
