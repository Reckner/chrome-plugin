import React from 'react';

import { IConfirmation } from '../../models/Confirmation';
import Button from '../Button/Button';

const Confirmation: React.FC<IConfirmation> = ({
    deleteCompany,
    isVisible,
    setVisibility,
    targetName,
    targetCVR,
    setConfirmationTargetName,
}) => {
    const styles = {
        display: 'block',
        height: 'auto',
        top: '50%',
        transform: 'translate(0%, -50%)',
    } as React.CSSProperties;

    const handleYes = () => {
        if (targetCVR) {
            deleteCompany(targetCVR);
            setVisibility(false);
        }
    };

    const handleNo = () => {
        setVisibility(false);
        setConfirmationTargetName(null);
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
                                    <p className="mx-3 text-center">
                                        Fjern <strong>{targetName}</strong>{' '}
                                        virksomhed fra Pipedrive?
                                    </p>
                                    <div className="d-flex w-100">
                                        <Button
                                            appearance="danger"
                                            className="mx-1 w-100"
                                            onClick={handleYes}
                                        >
                                            Ja
                                        </Button>
                                        <Button
                                            appearance="info"
                                            className="mx-1 w-100"
                                            onClick={handleNo}
                                        >
                                            Nej
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
