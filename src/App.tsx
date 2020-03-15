import React, { useState } from 'react';

import CompaniesList from './containers/CompaniesList';
import Company from './components/Company';
import { ICompany } from './models/Company';

import { fetchCompanies } from './helpers/fetchCompanies';

export default function App() {
    const [companies, setCompanies] = useState<ICompany[]>([]);

    const handleSearch = async e => {
        e.preventDefault();
        if (e.target.value?.length > 2) {
            setCompanies(await fetchCompanies(e.target.value));
        }
    };

    return (
        <div className="extension-wrapper">
            <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
            />
            <CompaniesList>
                {companies.map(company => {
                    return (
                        <Company
                            key={company.cvr}
                            name={company.name}
                            address={company.address}
                            postal_code_and_city={company.postal_code_and_city}
                            cvr={company.cvr}
                        />
                    );
                })}
            </CompaniesList>
        </div>
    );
}
