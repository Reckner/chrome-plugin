import axios from 'axios';
import _ from 'lodash';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByName from './get-company-by-name-pipedrive';
import ICompany from '../models/Company';

const deleteCompanyFromPipedrive = async (companies: ICompany[], cvr: number): Promise<any> => {
    const newCompany = companies.filter(c => {
        if(c.cvr === cvr){
            return c;
        }
        return null;
    })[0]


    const companiesToDelete = await getCompanyByName(newCompany.name);

    return new Promise(async (resolve, reject) => {
        if (_.isArray(companiesToDelete)) {
            for (const company of companiesToDelete) {
                if (company.item.name.trim() === newCompany.name.trim() && parseInt(company.item.custom_fields[0], 10) === newCompany.cvr) {
                    resolve(
                        await axios
                            .delete(
                                `https://api.pipedrive.com/v1/organizations/${
                                    company.item.id
                                }?api_token=${getApiToken()}`,
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

export default deleteCompanyFromPipedrive;
