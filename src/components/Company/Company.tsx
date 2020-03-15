import React from 'react';
import { ICompany } from '../../models/Company';
import createCompanyInPipedrive from '../../api/create-company';
import classnames from 'classnames';

import Button from '../Button/Button';

const addButton = async name => {
    await createCompanyInPipedrive({ name });
};

const Company: React.FC<ICompany> = ({
    name,
    address,
    postal_code_and_city,
    cvr,
}) => {
    return (
        <div
            className={classnames(
                'd-flex border rounded',
            )}
        >
            <div className="d-flex flex-column flex-fill pl-3 py-3 mw-100">
                <h3 className="mb-0 text-truncate">{name}</h3>
                <p className="mb-0">
                    {address}, {postal_code_and_city}
                </p>
                <p className="mb-0">CVR {cvr}</p>
            </div>
            <Button appearance="success" onClick={() => addButton(name)}>
                +
            </Button>
        </div>
    );
};

export default Company;
