import React, { useState } from 'react';

import { IConfirmation } from '../../models/Confirmation';
import Button from '../Button/Button';

const Confirmation: React.FC<IConfirmation> = ({
    children,
    deleteCompany,
    isVisible,
    setVisibility,
    target,
}) => {
    const styles = {
        display: 'block',
        height: 'auto',
        top: '50%',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties;

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
                <>
                    <div
                        style={styles}
                        id="removeConfirmation"
                        className="modal fade show position-absolute"
                    >
                        <div className="modal-dialog m-0 mx-4">
                            <div className="modal-content border shadow">
                                <div className="d-flex flex-column align-items-center p-3">
                                    <p className="mx-3">
                                        Delete <strong>{children}</strong>{' '}
                                        company from PipeDrive?
                                    </p>
                                    <div className="d-flex w-100">
                                        <Button
                                            appearance="danger"
                                            className="mx-1 w-100"
                                            onClick={handleYes}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            appearance="info"
                                            className="mx-1 w-100"
                                            onClick={handleNo}
                                        >
                                            No
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show position-absolute"></div>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default Confirmation;
