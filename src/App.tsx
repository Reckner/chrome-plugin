import React, { useState } from 'react';

import CompaniesList from './containers/CompaniesList';
import { Company, Button, Input } from './components';
import { ICompany } from './models/Company';
import data from './mock.json';
import { fetchCompanies } from './helpers/fetchCompanies';
import { SettingsIcon } from './assets/images';

export default function App() {
    const [companies, setCompanies] = useState<ICompany[]>([]);

    const handleSearch = async e => {
        e.preventDefault();
        if (e.target.value?.length > 2) {
            setCompanies(await fetchCompanies(e.target.value));
        }
    };

    return (
        <div className="d-flex flex-column p-4">
            <div className="d-flex pb-3">
                <Input
                    id="search"
                    name="search"
                    type="search"
                    containerClassName="w-100 mb-0"
                />
                <Button className="align-self-end ml-3 p-0 my-auto">
                    <SettingsIcon />
                </Button>
            </div>
            <CompaniesList>
                {data.map(company => {
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
