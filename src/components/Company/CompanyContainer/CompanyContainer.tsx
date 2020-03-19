import React from 'react';
import { ICompanyContainer } from '../../../models/Company';
import createCompanyInPipedrive from '../../../api/create-company';
import classnames from 'classnames';

import Button from '../../Button/Button';

const addButton = async ({ name, cvr, address, postal_code_and_city }) => {
    await createCompanyInPipedrive({
        name,
        cvr,
        address,
        postal_code_and_city,
    });
};

const CompanyContainer: React.FC<ICompanyContainer> = ({
    name,
    address,
    postal_code_and_city,
    cvr,
}) => {
    return (
        <div className={classnames('d-flex border rounded my-1 shadow-sm')}>
            <div className="d-flex flex-column flex-fill pl-3 py-3 w-75">
                <h3 className="mb-0 text-truncate w-75">{name}</h3>
                <p className="mb-0">
                    {address}, {postal_code_and_city}
                </p>
                <p className="mb-0">CVR {cvr}</p>
            </div>
            <Button
                appearance="success"
                className="p-3"
                onClick={() =>
                    addButton({ name, cvr, address, postal_code_and_city })
                }
            >
                +
            </Button>
        </div>
    );
};

export default CompanyContainer;