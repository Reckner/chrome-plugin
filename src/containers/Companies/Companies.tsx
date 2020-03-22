import React, { useState } from 'react';

import {
    Company,
    Button,
    Input,
    Loader,
    Container,
    Header,
} from '../../components';
import { ICompanyContainer } from '../../models/Company';
import { fetchCompanies } from '../../helpers/fetchCompanies';
import { SettingsIcon, AlertIcon } from '../../assets/images';
import ifCompanyExistsInPipedrive from '../../helpers/ifCompanyExistsInPipedrive';

export default function Companies({ switchPage }) {
    const [companies, setCompanies] = useState<ICompanyContainer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState(null);

    const handleSearch = e => {
        e.persist();
        const search = document.querySelector('#search');
        search?.addEventListener('keyup', function(this) {
            setIsLoading(true);
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

        setIsLoading(true);

        if (input?.length > 2) {
            const foundCompanies = await fetchCompanies(input);

            for (const company of foundCompanies) {
                if (await ifCompanyExistsInPipedrive(company.name || '')) {
                    company.name = `+${company.name}`;
                }
            }

            setCompanies(foundCompanies);

            setIsLoading(false);
            setSearch(e.target.value);
        } else {
            setIsLoading(false);
            setCompanies([]);
            setSearch(null);
        }
    };

    return (
        <>
            <Header className="d-flex align-items-center justify-content-between">
                <h4 className="text-secondary mb-0">CRM Plugin</h4>
                <Button
                    className="align-self-end ml-4 p-0 my-auto"
                    value="ApiSetup"
                    onClick={() => switchPage('ApiSetup')}
                >
                    <SettingsIcon />
                </Button>
            </Header>
            <Container>
                <div className="d-flex pb-4 pr-4">
                    <Input
                        id="search"
                        name="search"
                        type="text"
                        containerClassName="w-100 mb-0 shadow-sm"
                        className="shadow-sm"
                        onChange={handleSearch}
                    />
                </div>
                {isLoading ? (
                    <Loader />
                ) : companies.length == 0 && search !== null ? (
                    <div className="d-flex flex-fill flex-column align-items-center justify-content-center pr-4">
                        <AlertIcon />
                        <p className="text-disabled">
                            Ingen virksomheder fundet
                        </p>
                    </div>
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
        </>
    );
}
