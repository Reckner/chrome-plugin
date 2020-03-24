import axios from 'axios';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByName from './get-company-by-name-pipedrive';
import prepareData from '../helpers/prepareCompanyData';

const updateCompanyInPipedrive = async (name: string, cvr: number) => {
    const data = await prepareData(cvr);

    interface IValues {
        [key: string]: any;
    }
    const values: IValues = {};

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    const companies = await getCompanyByName(name);

    companies.forEach(async company => {
        if (company.name.trim() === name.trim()) {
            await axios.put(`https://api.pipedrive.com/v1/organizations/${company.id}?api_token=${getApiToken()}`, values,
            );
        }
    });
};

export default updateCompanyInPipedrive;
