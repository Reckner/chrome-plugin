import getCompanyByName from './get-company-by-name-pipedrive';
import { getApiToken } from '../helpers/getApiToken';

import axios from 'axios';

const deleteCompanyFromPipedrive = async (name: string) => {
    const company = await getCompanyByName(name);

    if(Object.keys(company).length !== 0){
        await axios.delete(
            `https://api.pipedrive.com/v1/organizations/${company[0]['id']}?api_token=${getApiToken()}`
        );
    }
};

export default deleteCompanyFromPipedrive;