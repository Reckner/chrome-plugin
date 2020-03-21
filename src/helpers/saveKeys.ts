import getKeysFromPipedrive from '../api/get-keys';

const saveKeysToLocalStorage = async () =>{
    const keys = await getKeysFromPipedrive();
    localStorage.setItem('customFields', JSON.stringify(keys));
}

export default saveKeysToLocalStorage;