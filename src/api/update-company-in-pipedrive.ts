import axios from 'axios';
import _ from 'lodash';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByCVR from './get-company-by-cvr-pipedrive';
import ICompany from '../models/Company';
import prepareData from '../helpers/prepareCompanyData';

interface IValues {
    [key: string]: any;
}
const values: IValues = {};

const updateCompanyInPipedrive = async (
    companies: ICompany[],
    cvr: number,
): Promise<any> => {
    const newCompany = companies.filter((c) => {
        if (c.cvr === cvr) {
            return c;
        }
        return null;
    })[0];
    const data = await prepareData(newCompany);

    //delete name?

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    const oldCompanies = await getCompanyByCVR(newCompany.cvr);

    if (_.isArray(oldCompanies)) {
        for (const company of oldCompanies) {
            const foundCVR = company.item.custom_fields.find((element) => {
                if (element.length === 8 && !isNaN(element)) {
                    return element;
                }
            });
            if (parseInt(foundCVR, 10) === newCompany.cvr) {
                return await axios.put(
                    `https://api.pipedrive.com/v1/organizations/${
                        company.item.id
                    }?api_token=${getApiToken()}`,
                    values,
                );
            }
        }
    }
};

export default updateCompanyInPipedrive;
