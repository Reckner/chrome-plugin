import axios from 'axios';
import { getApiToken } from '../helpers/getApiToken';

const getCompanyByNamePipedrive = async (name: string) => {
    const search = name.replace(/ /g, '%20');
    const response = await axios.get(
        `https://app.pipedrive.com/v1/organizations/find?term=${search}&start=0&api_token=${getApiToken()}`,
    );

    const { data } = response.data;

    return data ? data : [];
};

export default getCompanyByNamePipedrive;
