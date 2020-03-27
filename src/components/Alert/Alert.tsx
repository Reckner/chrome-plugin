import React from 'react';

import { IAlert } from '../../models/Alert';

import {
    CompanyAddIcon,
    CompanyRefreshIcon,
    CompanyRemoveIcon,
    ErrorIcon,
} from '../../assets/images';

const Alert: React.FC<IAlert> = ({ children, type }) => {
    return (
        <div
            style={{ height: 'auto' }}
            id="alert"
            className="modal fade show position-absolute pt-1"
        >
            <div className="modal-dialog m-0 mx-4">
                <div
                    className="modal-content border-0"
                    style={
                        type === 'error'
                            ? {
                                  background: 'rgba(181, 0, 0, 0.65)',
                              }
                            : {
                                  background: 'rgba(0, 0, 0, 0.65)',
                              }
                    }
                >
                    <div className="d-flex flex-column align-items-center py-2">
                        {type === 'add' ? (
                            <CompanyAddIcon className="mb-1" />
                        ) : null}   
                        {type === 'remove' ? (
                            <CompanyRemoveIcon className="mb-1" />
                        ) : null}
                        {type === 'update' ? (
                            <CompanyRefreshIcon className="mb-1" />
                        ) : null}
                        {type === 'error' ? (
                            <ErrorIcon className="mb-1" />
                        ) : null}
                        <p className="mb-0 text-light">{children}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
