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

    //delete name?

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
                const foundCVR = company.item.custom_fields.find((element) => {
                    if(element.length === 8 && !isNaN(element)){
                        return element;
                    } else {
                        return null;
                    }
                  })
                if (parseInt(foundCVR, 10) === newCompany.cvr) {
                    console.log(values);
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
