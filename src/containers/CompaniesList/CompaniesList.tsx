import React from 'react';

import styles from './CompaniesList.module.scss';

const CompaniesList = ({ children }) => {
    return <div className={styles.companiesWrapper}>{children}</div>;
};

export default CompaniesList;
