import axios from 'axios';

import { getApiToken } from '../helpers/getApiToken';
import getCompanyByName from './get-company-by-name-pipedrive';


const deleteCompanyFromPipedrive = async (name: string) => {
    const companies = await getCompanyByName(name);

    companies.forEach(async company => {
        if (company.name.trim() === name.trim()) {
            await axios.delete(
                `https://api.pipedrive.com/v1/organizations/${
                    company.id
                }?api_token=${getApiToken()}`,
            );
        }
    });
};

export default deleteCompanyFromPipedrive;
