import React, { useEffect, useState } from 'react';
import $ from 'jquery';

import createCompanyInPipedrive from '../../../api/create-company-in-pipedrive';
import deleteCompanyFromPipedrive from '../../../api/delete-company-from-pipedrive';
import updateCompanyInPipedrive from '../../../api/update-company-in-pipedrive';

import { AddIcon, RefreshIcon, RemoveIcon } from '../../../assets/images';
import Button from '../../Button/Button';

import Confirmation from '../../Confirmation/Confirmation';
import { ICompanyContainer } from '../../../models/CompanyContainer';

const svgStyle = {
    height: '25px',
    width: '36px',
    fill: '#fff',
} as React.CSSProperties;

const buttonStyle = {
    maxWidth: '42px',
} as React.CSSProperties;

const CompanyContainer: React.FC<ICompanyContainer> = ({
    address,
    companies,
    companyExist,
    cvr,
    isVisibleConfirmation,
    name,
    postal_code_and_city,
    setAlertMessage,
    setAlertType,
    setCompanies,
    setVisibilityConfirmation,
    status,
}) => {
    const [buttonDisabled, setButtonDisable] = useState(false);
    const [confirmationTargetName, setConfirmationTargetName] = useState<
        string | null
    >(null);
    const [confirmationTargetCVR, setConfirmationTargetCVR] = useState<
        number | null
    >(null);

    useEffect(() => {
        $('.companyName').hover(
            function () {
                if (this.offsetWidth < this.scrollWidth) {
                    $(this).attr('title', $(this).text());
                }
            },
            function () {
                $(this).removeAttr('title');
            },
        );
        $('.companyStatus').hover(
            function () {
                if (this.offsetWidth < this.scrollWidth) {
                    $(this).attr('title', $(this).text());
                }
            },
            function () {
                $(this).removeAttr('title');
            },
        );
    });

    const updateCompaniesAfterAdding = () => {
        if (companies) {
            let newCompanies = [...companies];

            setCompanies(
                newCompanies.map((c) => {
                    if (c.cvr === cvr) {
                        return {
                            ...c,
                            companyExist: true,
                        };
                    }
                    return c;
                }),
            );
        }
    };

    const updateCompaniesAfterDeleting = () => {
        let newCompanies = [...companies];
        setCompanies(
            newCompanies.map((c) => {
                if (c.cvr === cvr) {
                    return {
                        ...c,
                        companyExist: false,
                    };
                }
                return c;
            }),
        );
    };

    const addButton = async (cvr: number) => {
        companies?.filter((company) => {
            return company.cvr === cvr;
        });

        setButtonDisable(true);
        setAlertType('add');
        setAlertMessage('Virksomheden er tilføjet til Pipedrive!');
        const result = await createCompanyInPipedrive(companies, cvr);
        if (result?.data?.success !== true) {
            setAlertType('error');
            setAlertMessage('Fejl ved tilføjelse af virksomheden!');
        }
        updateCompaniesAfterAdding();

        ($('#alert') as any).modal({ backdrop: false, keyboard: false });
        setTimeout(() => {
            ($('#alert') as any).modal('hide');
            setButtonDisable(false);
        }, 1500);
    };

    const deleteCompany = async (cvr: number) => {
        setButtonDisable(true);
        setAlertType('remove');
        setAlertMessage('Virksomheden er fjernet fra Pipedrive!');
        const result = await deleteCompanyFromPipedrive(companies, cvr);
        if (result?.data?.success !== true) {
            setAlertType('error');
            setAlertMessage('Fejl ved sletning af virksomheden!');
        }
        updateCompaniesAfterDeleting();
        setConfirmationTargetCVR(null);
        setConfirmationTargetName(null);
        ($('#alert') as any).modal({ backdrop: false, keyboard: false });
        setTimeout(() => {
            ($('#alert') as any).modal('hide');
            setButtonDisable(false);
        }, 1500);
    };

    const updateButton = async (cvr: number) => {
        setButtonDisable(true);
        setAlertType('update');
        setAlertMessage('Virksomhedsdata er opdateret!');
        const result = await updateCompanyInPipedrive(companies, cvr);
        if (result?.data?.success !== true) {
            setAlertType('error');
            setAlertMessage('Fejl ved opdatering af virksomhedsdata!');
        }

        ($('#alert') as any).modal({ backdrop: false, keyboard: false });
        setTimeout(() => {
            ($('#alert') as any).modal('hide');
            setButtonDisable(false);
        }, 1500);
    };

    return (
        <>
            {isVisibleConfirmation && confirmationTargetName ? (
                <Confirmation
                    targetName={confirmationTargetName}
                    targetCVR={confirmationTargetCVR}
                    isVisible={isVisibleConfirmation}
                    setVisibility={setVisibilityConfirmation}
                    setConfirmationTargetName={setConfirmationTargetName}
                    deleteCompany={deleteCompany}
                />
            ) : (
                <></>
            )}
            <div className="d-flex border rounded my-1 shadow-sm">
                <div className="d-flex flex-column flex-fill pl-3 py-3 w-75">
                    <h3 className="mb-0 text-truncate w-75 companyName">
                        {name}
                    </h3>

                    <p className="mb-0">
                        {address}, {postal_code_and_city}
                    </p>
                    <div className="d-flex align-items-center">
                        <p className="mb-0 mr-2">CVR&nbsp;{cvr}</p>
                        <p className="px-3 mb-0 my-1 d-inline rounded border bg-light text-truncate text-capitalize companyStatus">
                            {status}
                        </p>
                    </div>
                </div>
                {!companyExist ? (
                    <div className="d-flex flex-fill justify-content-end">
                        <Button
                            style={buttonStyle}
                            appearance="success"
                            className="p-0 w-100"
                            onClick={() => addButton(cvr)}
                            title="Tilføj virksomhed"
                            disabled={buttonDisabled}
                        >
                            <AddIcon style={svgStyle} />
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex flex-fill justify-content-end">
                        <Button
                            style={buttonStyle}
                            appearance="danger"
                            className="p-0 mx-1 w-100"
                            onClick={() => {
                                setConfirmationTargetName(name);
                                setConfirmationTargetCVR(cvr);
                                setVisibilityConfirmation(true);
                            }}
                            title="Slet virksomhed"
                            disabled={buttonDisabled}
                        >
                            <RemoveIcon style={svgStyle} />
                        </Button>
                        <Button
                            style={buttonStyle}
                            appearance="info"
                            className="p-0 w-100"
                            onClick={() => updateButton(cvr)}
                            title="Opdater virksomhed"
                            disabled={buttonDisabled}
                        >
                            <RefreshIcon style={svgStyle} />
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CompanyContainer;
