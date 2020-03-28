import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import classnames from 'classnames';

import createCompanyInPipedrive from '../../../api/create-company-in-pipedrive';
import deleteCompanyFromPipedrive from '../../../api/delete-company-from-pipedrive';
import updateCompanyInPipedrive from '../../../api/update-company-in-pipedrive';

import { AddIcon, RefreshIcon, RemoveIcon } from '../../../assets/images';
import Button from '../../Button/Button';

import Confirmation from '../../Confirmation/Confirmation';
import { ICompanyContainer } from '../../../models/Company';

const svgStyle = {
    height: '25px',
    width: '36px',
    fill: '#fff',
} as React.CSSProperties;

const buttonStyle = {
    maxWidth: '42px',
} as React.CSSProperties;

const CompanyContainer: React.FC<ICompanyContainer> = ({
    name,
    address,
    postal_code_and_city,
    cvr,
    companyExist,
    companies,
    setCompanies,
    setAlertType,
    setAllertMessage,
    isVisibleConfirmation,
    setVisibilityConfirmation,
}) => {
    const [buttonDisabled, setButtonDisable] = useState(false);
    const [confirmationTarget, setConfirmationTarget] = useState<string | null>(
        null,
    );

    useEffect(() => {
        $('.companyName').hover(
            function() {
                if (this.offsetWidth < this.scrollWidth) {
                    $(this).attr('title', $(this).text());
                }
            },
            function() {
                $(this).removeAttr('title');
            },
        );
    });

    const updateCompaniesAfterAdding = () => {
        if (companies) {
            let newCompanies = [...companies];

            setCompanies(
                newCompanies.map(c => {
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
            newCompanies.map(c => {
                if (c.name === name) {
                    return {
                        ...c,
                        companyExist: false,
                    };
                }
                return c;
            }),
        );
    };

    const addButton = async cvr => {
        setButtonDisable(true);
        setAlertType('add');
        setAllertMessage('Virksomheden er tilføjet til Pipedrive!');
        const result = await createCompanyInPipedrive(cvr);
        if (result?.data?.success !== true) {
            setAlertType('error');
            setAllertMessage('Fejl ved tilføjelse af virksomheden!');
        }
        updateCompaniesAfterAdding();

        ($('#alert') as any).modal({ backdrop: false, keyboard: false });
        setTimeout(() => {
            ($('#alert') as any).modal('hide');
            setButtonDisable(false);
        }, 1500);
    };

    const deleteCompany = async (name: string) => {
        setButtonDisable(true);
        setAlertType('remove');
        setAllertMessage('Virksomheden er fjernet fra Pipedrive!');
        const result = await deleteCompanyFromPipedrive(name);
        if (result?.data?.success !== true) {
            setAlertType('error');
            setAllertMessage('Fejl ved sletning af virksomheden!');
        }
        updateCompaniesAfterDeleting();
        ($('#alert') as any).modal({ backdrop: false, keyboard: false });
        setTimeout(() => {
            ($('#alert') as any).modal('hide');
            setButtonDisable(false);
        }, 1500);
    };

    const updateButton = async (name: string, cvr: number) => {
        setButtonDisable(true);
        setAlertType('update');
        setAllertMessage('Virksomhedsdata er opdateret!');
        const result = await updateCompanyInPipedrive(name, cvr);
        if (result?.data?.success !== true) {
            setAlertType('error');
            setAllertMessage('Fejl ved opdatering af virksomhedsdata!');
        }

        ($('#alert') as any).modal({ backdrop: false, keyboard: false });
        setTimeout(() => {
            ($('#alert') as any).modal('hide');
            setButtonDisable(false);
        }, 1500);
    };

    return (
        <>
            {isVisibleConfirmation ? (
                <Confirmation
                    target={confirmationTarget}
                    isVisible={isVisibleConfirmation}
                    setVisibility={setVisibilityConfirmation}
                    deleteCompany={deleteCompany}
                >
                    {confirmationTarget || ''}
                </Confirmation>
            ) : (
                <></>
            )}
            <div className={classnames('d-flex border rounded my-1 shadow-sm')}>
                <div className="d-flex flex-column flex-fill pl-3 py-3 w-75">
                    <h3 className="mb-0 text-truncate w-75 companyName">
                        {name}
                    </h3>
                    <p className="mb-0">
                        {address}, {postal_code_and_city}
                    </p>
                    <p className="mb-0">CVR {cvr}</p>
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
                                setConfirmationTarget(name);
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
                            onClick={() => updateButton(name, cvr)}
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
