import React, { useState } from 'react';

import { Company, Button, Input, Loader, Container } from '../../components';
import { ICompanyContainer } from '../../models/Company';
import { fetchCompanies } from '../../helpers/fetchCompanies';
import { SettingsIcon } from '../../assets/images';

export default function Companies({ switchPage }) {
    const [companies, setCompanies] = useState<ICompanyContainer[]>([]);
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
        <Container>
            <div className="d-flex pb-4 pr-4">
                <Input
                    id="search"
                    name="search"
                    type="search"
                    containerClassName="w-100 mb-0 shadow-sm"
                    className="shadow-sm"
                    onChange={handleSearch}
                />
                <Button
                    className="align-self-end ml-4 p-0 my-auto"
                    value="ApiSetup"
                    onClick={() => switchPage('ApiSetup')}
                >
                    <SettingsIcon />
                </Button>
            </div>
            {isLoading && showLoader ? (
                <Loader />
            ) : (
                <Company.CompanyList>
                    {companies.map(company => {
                        return (
                            <Company.CompanyContainer
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
                </Company.CompanyList>
            )}
        </Container>
    );
}
