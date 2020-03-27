import axios from 'axios';
import _ from 'lodash';
import { getApiToken } from '../helpers/getApiToken';
import getCompanyByName from './get-company-by-name-pipedrive';
import prepareData from '../helpers/prepareCompanyData';

const updateCompanyInPipedrive = async (
    name: string,
    cvr: number,
): Promise<any> => {
    const data = await prepareData(cvr);

    interface IValues {
        [key: string]: any;
    }
    const values: IValues = {};

    data.forEach((_, index) => {
        values[data[index]['key']] = data[index]['value'];
    });

    const companies = await getCompanyByName(name);

    return new Promise(async (resolve, reject) => {
        if (_.isArray(companies)) {
            for (const company of companies) {
                if (company.name.trim() === name.trim()) {
                    resolve(
                        await axios
                            .put(
                                `https://api.pipedrive.com/v1/organizations/${
                                    company.id
                                }?api_token=${getApiToken()}`,
                                values,
                            )
                            .catch(err => reject(err)),
                    );
                }
            }
        } else {
            resolve({});
        }
    });
};

export default updateCompanyInPipedrive;
