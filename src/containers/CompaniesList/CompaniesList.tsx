import React from 'react';

interface CompaniesList {
    children: React.ReactNode;
}
const CompaniesList: React.FC<CompaniesList> = ({ children }) => {
    return <div className={'d-flex flex-column w-100 overflow-auto pr-4'}>{children}</div>;
};

export default CompaniesList;
