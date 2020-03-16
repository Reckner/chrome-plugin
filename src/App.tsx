import React, { useState } from 'react';

import CompaniesList from './containers/CompaniesList';
import { Company, Button, Input, Loader } from './components';
import { ICompany } from './models/Company';
import { fetchCompanies } from './helpers/fetchCompanies';
import { SettingsIcon } from './assets/images';

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
        <div className="d-flex flex-column py-4 pl-4 h-100">
            <div className="d-flex pb-4 pr-4">
                <Input
                    id="search"
                    name="search"
                    type="search"
                    containerClassName="w-100 mb-0 shadow-sm"
                    onChange={handleSearch}
                />
                <Button className="align-self-end ml-4 p-0 my-auto">
                    <SettingsIcon />
                </Button>
            </div>
            {isLoading && showLoader ? (
                <Loader />
            ) : (
                <CompaniesList>
                    {companies.map(company => {
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
                    })}
                </CompaniesList>
            )}
        </div>
    );
}
