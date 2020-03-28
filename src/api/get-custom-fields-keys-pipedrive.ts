import axios, { AxiosResponse } from 'axios';

import { getApiToken } from '../helpers/getApiToken';

interface respObject {
    keys: object[] | null,
    response: AxiosResponse<any> | null
}

const getKeysFromPipedrive = async (token: string) : Promise<respObject> => {
    return new Promise( async (resolve, reject) => {
        
        const response = await axios.get(
            `https://app.pipedrive.com/api/v1/organizationFields?api_token=${token}`,
        ).catch((err) => reject(err));
        
        if(response){
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

            resolve({keys, response});

        } else {
            resolve({keys: null, response: null});
        }
    })
};

export default getKeysFromPipedrive;
