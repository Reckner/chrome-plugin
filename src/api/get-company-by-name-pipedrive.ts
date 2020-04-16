import axios from 'axios';
import { getApiToken } from '../helpers/getApiToken';

const getCompanyByNamePipedrive = async (name: string) => {
    let search = name.replace(/ /g, '%20');
    search = search.replace(/&/g, '%26');
    const response = await axios.get(
        `https://app.pipedrive.com/v1/organizations/search?term=${search}&fields=name&start=0&api_token=${getApiToken()}`,
    );

    const { items } = response.data.data;

    return items ? items : [];
};

export default getCompanyByNamePipedrive;
