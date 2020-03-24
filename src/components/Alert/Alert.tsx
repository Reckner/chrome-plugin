import React from 'react';

import { SuccessIcon } from '../../assets/images';

import { IAlert } from '../../models/Alert';

const bgStyle = {
    background: 'rgba(0, 0, 0, 0.65)',
} as React.CSSProperties;

const Alert: React.FC<IAlert> = ({ children }) => {
    return (
        <div
            style={{ height: 'auto' }}
            id="alert"
            className="modal fade show position-absolute"
        >
            <div className="modal-dialog m-0 mx-4">
                <div className="modal-content border-0" style={bgStyle}>
                    <div className="d-flex flex-column align-items-center py-2">
                        <SuccessIcon className="mb-1" />
                        <p className="mb-0 text-light">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
