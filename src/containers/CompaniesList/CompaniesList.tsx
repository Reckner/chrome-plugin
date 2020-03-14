import React from 'react';

import styles from './CompaniesList.module.scss';

const CompaniesList: React.FC = ({ children }) => {
    return <div className={styles.companiesWrapper}>{children}</div>;
};

export default CompaniesList;
