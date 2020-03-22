import getCustomFieldsKeysFromPipedrive from '../api/get-custom-fields-keys-pipedrive';

const saveCustomFieldsKeysToLocalStorage = async () => {
    const keys = await getCustomFieldsKeysFromPipedrive();
    localStorage.setItem('customFields', JSON.stringify(keys));
};

export default saveCustomFieldsKeysToLocalStorage;
