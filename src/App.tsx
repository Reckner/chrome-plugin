import React from 'react';

import CompaniesList from './containers/CompaniesList';

const MockData: Company[] = [
    {
        name: 'DANISH MINDSET ApS',
        cvr: 35660275,
        address: 'Søndertorp 11',
        postal_code_and_city: '7400 Herning',
        start_date: '06.02.2014',
        status: 'Normal',
        business_type: 'Anpartsselskab',
        advertising_protection: 'No',
    },
    {
        name: 'DANISH SOFTWARE A/S',
        cvr: 35028439,
        address: 'Fredericiavej 16',
        postal_code_and_city: '7100 Vejle',
        start_date: '22.01.2013',
        status: 'Normal',
        business_type: 'Aktieselskab',
        advertising_protection: 'Yes',
    },
    {
        name: 'Orga Holding ApS',
        cvr: 39223864,
        address: 'c/o Camilla Vik Italiensvej 45',
        postal_code_and_city: '2300 København S',
        start_date: '01.01.2018',
        status: 'Normal',
        business_type: 'Anpartsselskab',
        advertising_protection: 'Yes',
    },
    {
        name: 'GLOBUS DATA ApS',
        cvr: 78389613,
        address: 'Kongevejen 369',
        postal_code_and_city: '2840 Holte',
        start_date: '15.10.1985',
        status: 'Normal',
        business_type: 'Anpartsselskab',
        advertising_protection: 'No',
    },
    {
        name: 'BUGIstudio/BUGInamnam/Abild&Oliver',
        cvr: 15128402,
        address: 'Gustav Johannsens Vej 5, st.',
        postal_code_and_city: '2000 Frederiksberg',
        start_date: '01.04.1991',
        status: 'Aktiv',
        business_type: 'Enkeltmandsvirksomhed',
        advertising_protection: 'Yes',
    },
    {
        name: 'SPOK ApS',
        cvr: 25042182,
        address: 'Frederiksborggade 1, 4. tv.',
        postal_code_and_city: '1360 København K',
        start_date: '01.11.1999',
        status: 'Normal',
        business_type: 'Anpartsselskab',
        advertising_protection: 'No',
    },
    {
        name: 'RUBEN RUBANI ApS',
        cvr: 33966121,
        address: 'c/o SpotProduction A/S Filmbyen 23, 2.',
        postal_code_and_city: '8000 Aarhus C',
        start_date: '12.10.2011',
        status: 'Normal',
        business_type: 'Anpartsselskab',
        advertising_protection: 'Yes',
    },
];

interface Company {
    name: string;
    cvr: number;
    address: string;
    postal_code_and_city: string;
    start_date: string;
    status: string;
    business_type: string;
    advertising_protection: string;
}

export default function App() {
    return (
        <div className="extension-wrapper">
            <input
                className="form-control"
                type="text"
                placeholder="Search"
                aria-label="Search"
            />
            <CompaniesList>
                {MockData.map(company => {
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

const Company = ({ name, address, postal_code_and_city, cvr }) => {
    return (
        <div className="company-wrapper">
            <h3>{name}</h3>
            <p>
                {address}, {postal_code_and_city}
            </p>
            <p>CVR {cvr}</p>
        </div>
    );
};
