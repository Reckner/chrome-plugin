import React from 'react';

import { CompanyAddIcon } from '../../assets/images';

interface AlertPositive {
    children: any;
}

const bgStyle = {
    background: 'rgba(0, 0, 0, 0.65)',
} as React.CSSProperties;

const AlertPositive: React.FC<AlertPositive> = ({ children }) => {
    return (
        <div
            style={{ height: 'auto' }}
            id="alert"
            className="modal fade show position-absolute pt-1"
        >
            <div className="modal-dialog m-0 mx-4">
                <div className="modal-content border-0" style={bgStyle}>
                    <div className="d-flex flex-column align-items-center py-2">
                        <CompanyAddIcon className="mb-1" />
                        <p className="mb-0 text-light">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertPositive;
