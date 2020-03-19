import React, { useState } from 'react';

import { Company, Button, Input, Loader, Container } from '../../components';
import { ICompanyContainer } from '../../models/Company';
import { fetchCompanies } from '../../helpers/fetchCompanies';
import { SettingsIcon } from '../../assets/images';

export default function Companies({ switchPage }) {
    const [companies, setCompanies] = useState<ICompanyContainer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSearch = e => {
        e.persist();
        const search = document.querySelector('#search');
        search?.addEventListener('keyup', function(this) {
            // clears timeout before starting new one
            clearTimeout(this.timeoutKeyUp);

            // creating new timeout
            this.timeoutKeyUp = setTimeout(function() {
                handleRequest(e);
            }, 500);
        });
    };

    const handleRequest = async e => {
        const { value: input } = e.target;
        if (input?.length > 2) {
            setCompanies(await fetchCompanies(input));
            setIsLoading(false);
        } else {
            setIsLoading(false);
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
            {isLoading ? (
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
