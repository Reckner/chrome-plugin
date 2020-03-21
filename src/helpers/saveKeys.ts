export const saveKeysToLocalStorage = (keys:object[]) =>{
    localStorage.setItem('customFields', JSON.stringify(keys));
}