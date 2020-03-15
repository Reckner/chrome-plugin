import React from 'react';
import { ICompany } from '../../models/Company';
import createCompanyInPipedrive from '../../api/create-company';

import styles from './Company.module.scss';

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
        <div className={styles.companyWrapper}>
            <div className={styles.companyData}>
                <h3>{name}</h3>
                <p>
                    {address}, {postal_code_and_city}
                </p>
                <p>CVR {cvr}</p>
            </div>
            <button
                className={styles.addButton}
                onClick={() => addButton(name)}
            >
                +
            </button>
        </div>
    );
};

export default Company;
