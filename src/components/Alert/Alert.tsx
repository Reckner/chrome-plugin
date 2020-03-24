import React from 'react';

import AlertAdd from './AlertAdd';
import AlertRemove from './AlertRemove';
import AlertError from './AlertError';

import { IAlert } from '../../models/Alert';

const Alert: React.FC<IAlert> = ({ children, type }) => {
    switch (type) {
        case 'add':
            return <AlertAdd>{children}</AlertAdd>;
        case 'remove':
            return <AlertRemove>{children}</AlertRemove>;
        default:
            return <AlertError>{children}</AlertError>;
    }
};

export default Alert;
