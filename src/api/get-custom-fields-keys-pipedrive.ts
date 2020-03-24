import axios from 'axios';

import { getApiToken } from '../helpers/getApiToken';

const getKeysFromPipedrive = async () => {
    const response = await axios.get(
        `https://app.pipedrive.com/api/v1/organizationFields?api_token=${getApiToken()}`,
    );
    const { data: fields } = response.data;

    const names = [
        '*CVR',
        'Name',
        'Address',
        'Tlf. (Reception)',
        'Etableringsdato',
        'Antal medarb.',
        'Branchekode',
        'Branchetekst',
        'Selskabsform',
    ];
    const keys: object[] = [];

    for (const name of names) {
        for (const field of fields) {
            if (field.name === name) {
                keys.push({
                    name,
                    key: field.key,
                });
            }
        }
    }

    return keys;
};

export default getKeysFromPipedrive;
