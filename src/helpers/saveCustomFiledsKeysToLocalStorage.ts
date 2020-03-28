import getCustomFieldsKeysFromPipedrive from '../api/get-custom-fields-keys-pipedrive';

const saveCustomFieldsKeysToLocalStorage = async (token: string) => {
    const result = await getCustomFieldsKeysFromPipedrive(token).catch(() => {return null});
    if(result){
        const {keys, response} = result;
        if(response?.status === 200){
            localStorage.setItem('customFields', JSON.stringify(keys)); 
        }
        return response?.status;
    }
    return result;
};

export default saveCustomFieldsKeysToLocalStorage;
