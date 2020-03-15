import React from 'react';

// import styles from './CompaniesList.module.scss';

const CompaniesList: React.FC = ({ children }) => {
    return <div className={'d-flex flex-column w-100'}>{children}</div>;
};

export default CompaniesList;
