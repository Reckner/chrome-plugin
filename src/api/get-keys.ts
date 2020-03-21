import axios from 'axios';

const token = '9352e66cf5185840cdd3dc97a1a06bf9efac2192';

const getKeysFromPipedrive = async () => {
    const response = await axios.get(`https://app.pipedrive.com/api/v1/organizationFields?api_token=${token}`);
    const { data:fields } = response.data;

    const names = ['*CVR', 'Name', 'Address', 'Tlf. (Reception)', 'Etableringsdato', 'Antal medarb.', 'Branchekode', 'Branchetekst', 'Selskabsform'];
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