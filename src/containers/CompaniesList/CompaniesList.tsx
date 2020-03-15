import React from 'react';
import classnames from 'classnames';

// import styles from './CompaniesList.module.scss';

interface CompaniesList {
    children: React.ReactNode;
}
const CompaniesList: React.FC<CompaniesList> = ({ children }) => {
    return <div className={'d-flex flex-column w-100'}>{children}</div>;
};

export default CompaniesList;
