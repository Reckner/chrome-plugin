import axios from 'axios';
import { getApiToken } from '../helpers/getApiToken';

const getCompanyByCVRPipedrive = async (cvr: number) => {
    const response = await axios.get(
        `https://app.pipedrive.com/v1/organizations/search?term=${cvr}&fields=custom_fields&start=0&api_token=${getApiToken()}`,
    );

    const { items } = response.data.data;

    return items ? items : [];
};

export default getCompanyByCVRPipedrive;
