import React, { useState } from 'react';

import CompaniesList from './containers/CompaniesList';
import Company from './components/Company';
import { ICompany } from './models/Company';

import { fetchCompanies } from './helpers/fetchCompanies';

export default function App() {
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    const handleSearch = async e => {
        e.preventDefault();
        if (e.target.value?.length > 2) {
            setIsLoading(true);
            setShowLoader(true);
            setCompanies(await fetchCompanies(e.target.value));
            setIsLoading(false);
        } else {
            setIsLoading(false);
            setShowLoader(false);
            setCompanies([]);
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
                {isLoading && showLoader ? (
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    companies.map(company => {
                        return (
                            <Company
                                key={company.cvr}
                                name={company.name}
                                address={company.address}
                                postal_code_and_city={
                                    company.postal_code_and_city
                                }
                                cvr={company.cvr}
                            />
                        );
                    })
                )}
            </CompaniesList>
        </div>
    );
}
