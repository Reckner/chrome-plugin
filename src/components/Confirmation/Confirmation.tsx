import React, { useState } from 'react';

import { IConfirmation } from '../../models/Confirmation';
import Button from '../Button/Button';

const Confirmation: React.FC<IConfirmation> = ({
    target,
    children,
    isVisible,
    setVisibility,
    deleteCompany,
}) => {
    const handleYes = () => {
        if (target) {
            deleteCompany(target);
            setVisibility(false);
        }
    };

    const handleNo = () => {
        setVisibility(false);
    };

    return (
        <>
            {isVisible ? (
                <div
                    style={{ height: 'auto', display: 'block' }}
                    id="removeConfirmation"
                    className="modal fade show position-absolute pt-1"
                >
                    <div className="modal-dialog m-0 mx-4">
                        <div className="modal-content border-0">
                            <div className="d-flex flex-column align-items-center py-2">
                                <p className="mb-0 text-light">{children}</p>
                                <Button onClick={handleYes}>Yes</Button>
                                <Button onClick={handleNo}>No</Button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Confirmation;
