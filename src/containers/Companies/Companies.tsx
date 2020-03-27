import React, { useState } from 'react';
import $ from 'jquery';

import {
    Alert,
    Button,
    Company,
    Container,
    Header,
    Input,
    Loader,
} from '../../components';

import ifCompanyExistsInPipedrive from '../../helpers/ifCompanyExistsInPipedrive';
import { fetchCompanies } from '../../api/fetch-companies-from-virk';

import { SettingsIcon, AlertIcon } from '../../assets/images';

import { ICompanyContainer } from '../../models/Company';
import getCompanyData from '../../api/get-company-data-cvrapi';

export default function Companies({ switchPage }) {
    const [companies, setCompanies] = useState<ICompanyContainer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState(null);
    const [type, setType] = useState('');
    const [allertMessage, setAllertMessage] = useState('Error');

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
            let foundCompanies: ICompanyContainer[];
            if ($.isNumeric(input)) {
                const companyData = await getCompanyData(input);
                foundCompanies = [
                    {
                        cvr: companyData.data['vat'],
                        name: companyData.data['name'],
                        address: companyData.data['address'],
                        postal_code_and_city: companyData.data['zipcode'],
                    },
                ];
            } else {
                foundCompanies = await fetchCompanies(input);
            }

            setCompanies(await checkedCompanies(foundCompanies));
            setIsLoading(false);
            setSearch(e.target.value);
        } else {
            setIsLoading(false);
            setCompanies([]);
            setSearch(null);
        }
    };

    const checkedCompanies = (companies: ICompanyContainer[]) => {
        const formatted = Promise.all(
            companies.map(async company => {
                if (await ifCompanyExistsInPipedrive(company.name || '')) {
                    return {
                        ...company,
                        companyExist: true,
                    };
                }
                return company;
            }),
        );

        return formatted;
    };

    return (
        <>
            <Alert type={type}>{allertMessage}</Alert>
            <Header className="d-flex align-items-center justify-content-between">
                <h4 className="text-secondary mb-0">CRM Plugin</h4>
                <Button
                    className="align-self-end ml-4 px-0 my-auto"
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
                ) : companies.length === 0 && search !== null ? (
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
                                    companyExist={company.companyExist}
                                    companies={companies}
                                    setCompanies={setCompanies}
                                    setAlertType={setType}
                                    setAllertMessage={setAllertMessage}
                                />
                            );
                        })}
                    </Company.CompanyList>
                )}
            </Container>
        </>
    );
}
