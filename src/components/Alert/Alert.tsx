import React from 'react';

import AlertPositive from './AlertPositive';
import AlertNegative from './AlertNegative';

import { IAlert } from '../../models/Alert';

const Alert: React.FC<IAlert> = ({ children, type }) => {
    switch (type) {
        case 'add':
            return <AlertPositive>{children}</AlertPositive>;
        case 'remove':
            return <AlertPositive>{children}</AlertPositive>;
        case 'update':
            return <AlertPositive>{children}</AlertPositive>;
        case 'error':
            return <AlertNegative>{children}</AlertNegative>;
        default:
            return <AlertNegative>{children}</AlertNegative>;
    }
};

export default Alert;
