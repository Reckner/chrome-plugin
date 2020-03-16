import React from 'react';

interface CompanyList {
    children: React.ReactNode;
}
const CompanyList: React.FC<CompanyList> = ({ children }) => {
    return <div className={'d-flex flex-column w-100 overflow-auto pr-4'}>{children}</div>;
};

export default CompanyList;
