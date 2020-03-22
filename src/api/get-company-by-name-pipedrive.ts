import axios from 'axios';
import { getApiToken } from '../helpers/getApiToken';

const getCompanyByNamePipedrive = async (name: string) => {
    const response = await axios.get(
        `https://app.pipedrive.com/v1/organizations/find?term=${name}&start=0&api_token=${getApiToken()}`,
    );

    const { data } = response.data;
    return data ? data : {};
};

export default getCompanyByNamePipedrive;
