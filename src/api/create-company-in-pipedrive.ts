import axios from 'axios';

import { getApiToken } from '../helpers/getApiToken';
import prepareData from '../helpers/prepareCompanyData';
import ICompany from '../models/Company';

interface IValues {
    [key: string]: any;
}

const createCompanyInPipedrive = async (companies: ICompany[], cvr: number) => {
    const company = companies.filter((c) => {
        if (c.cvr === cvr) {
            return c;
        }
        return null;
    })[0];

    const data = await prepareData(company);

    const values: IValues = {};

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    return await axios.post(
        `https://app.pipedrive.com/v1/organizations?api_token=${getApiToken()}`,
        values,
    );
};

export default createCompanyInPipedrive;
