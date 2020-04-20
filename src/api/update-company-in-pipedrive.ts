import axios from 'axios';
import _ from 'lodash';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByCVR from './get-company-by-cvr-pipedrive';
import ICompany from '../models/Company';
import prepareData from '../helpers/prepareCompanyData';

const updateCompanyInPipedrive = async (
    companies: ICompany[],
    cvr: number,
): Promise<any> => {
    const newCompany = companies.filter(c => {
        if(c.cvr === cvr){
            return c;
        }
        return null;
    })[0]
    const data = await prepareData(newCompany);

    interface IValues {
        [key: string]: any;
    }
    const values: IValues = {};

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    const oldCompanies = await getCompanyByCVR(newCompany.cvr);

    return new Promise(async (resolve, reject) => {
        if (_.isArray(oldCompanies)) {
            for (const company of oldCompanies) {
                if (parseInt(company.item.custom_fields[0], 10) === newCompany.cvr) {
                    resolve(
                        await axios
                            .put(
                                `https://api.pipedrive.com/v1/organizations/${
                                    company.item.id
                                }?api_token=${getApiToken()}`,
                                values,
                            )
                            .catch((err) => reject(err)),
                    );
                }
            }
        } else {
            resolve({});
        }
    });
};

export default updateCompanyInPipedrive;
