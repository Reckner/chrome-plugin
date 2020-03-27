import axios from 'axios';
import _ from 'lodash';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByName from './get-company-by-name-pipedrive';

const deleteCompanyFromPipedrive = async (name: string): Promise<any> => {
    const companies = await getCompanyByName(name);

    return new Promise(async (resolve, reject) => {
        if (_.isArray(companies)) {
            for (const company of companies) {
                if (company.name.trim() === name.trim()) {
                    resolve(
                        await axios
                            .delete(
                                `https://api.pipedrive.com/v1/organizations/${
                                    company.id
                                }?api_token=${getApiToken()}`,
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

export default deleteCompanyFromPipedrive;
