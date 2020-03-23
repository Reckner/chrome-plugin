import React, { useEffect } from 'react';
import _ from 'lodash';
import { ICompanyContainer } from '../../../models/Company';
import createCompanyInPipedrive from '../../../api/create-company-in-pipedrive';
import deleteCompanyFromPipedrive from '../../../api/delete-company-from-pipedrive';
import classnames from 'classnames';
import { AddIcon, RefreshIcon, RemoveIcon } from '../../../assets/images';
import ifCompanyExistsInPipedrive from '../../../helpers/ifCompanyExistsInPipedrive';
import $ from 'jquery';
import Button from '../../Button/Button';

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
}) => {
    useEffect(() => {
        ($('[data-toggle="tooltip"]') as any).tooltip();
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
        await createCompanyInPipedrive(cvr);
        updateCompaniesAfterAdding();
    };

    const deleteButton = async (name: string) => {
        await deleteCompanyFromPipedrive(name);
        updateCompaniesAfterDeleting();
    };

    return (
        <div className={classnames('d-flex border rounded my-1 shadow-sm')}>
            <div className="d-flex flex-column flex-fill pl-3 py-3 w-75">
                <h3
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={name}
                    className="mb-0 text-truncate w-75 companyName"
                >
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
                        onClick={() => deleteButton(name)}
                    >
                        <RemoveIcon style={svgStyle} />
                    </Button>
                    <Button
                        style={buttonStyle}
                        appearance="info"
                        className="p-0 w-100"
                        onClick={() =>
                            addButton({
                                name,
                                cvr,
                                address,
                                postal_code_and_city,
                            })
                        }
                    >
                        <RefreshIcon style={svgStyle} />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CompanyContainer;
