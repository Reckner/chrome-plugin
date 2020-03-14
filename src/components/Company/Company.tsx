import React from 'react';
import { ICompany } from '../../models/Company';

import styles from './Company.module.scss';

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
            <button className={styles.addButton}>+</button>
        </div>
    );
};

export default Company;
