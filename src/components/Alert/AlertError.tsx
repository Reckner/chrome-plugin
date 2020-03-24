import React from 'react';

import { ErrorIcon } from '../../assets/images';

interface IAlertError {
    children: any;
}

const bgStyle = {
    background: 'rgba(181, 0, 0, 0.65)',
} as React.CSSProperties;

const AlertError: React.FC<IAlertError> = ({ children }) => {
    return (
        <div
            style={{ height: 'auto' }}
            id="alert"
            className="modal fade show position-absolute pt-1"
        >
            <div className="modal-dialog m-0 mx-4">
                <div className="modal-content border-0" style={bgStyle}>
                    <div className="d-flex flex-column align-items-center py-2">
                        <ErrorIcon className="mb-1" />
                        <p className="mb-0 text-light">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertError;
