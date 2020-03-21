import { getKeysFromPipedrive } from '../api/get-keys';

export const saveKeysToLocalStorage = async () =>{
    const keys = await getKeysFromPipedrive();
    localStorage.setItem('customFields', JSON.stringify(keys));
}