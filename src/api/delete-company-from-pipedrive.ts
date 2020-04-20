import axios from 'axios';
import _ from 'lodash';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByCVR from './get-company-by-cvr-pipedrive';
import ICompany from '../models/Company';

const deleteCompanyFromPipedrive = async (companies: ICompany[], cvr: number): Promise<any> => {
    const newCompany = companies.filter(c => {
        if(c.cvr === cvr){
            return c;
        }
        return null;
    })[0]


    const companiesToDelete = await getCompanyByCVR(newCompany.cvr);

    return new Promise(async (resolve, reject) => {
        if (_.isArray(companiesToDelete)) {
            for (const company of companiesToDelete) {
                const foundCVR = company.item.custom_fields.find((element) => {
                    if(element.length === 8 && !isNaN(element)){
                        return element;
                    } else {
                        return null;
                    }
                  })

                if (parseInt(foundCVR, 10) === newCompany.cvr) {
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
