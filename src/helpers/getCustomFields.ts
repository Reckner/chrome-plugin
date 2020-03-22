const getCustomFieldsFromLocalStorage = () =>{
    const customFields = localStorage.getItem('customFields');
    return customFields ? JSON.parse(customFields) : null;
}

export default getCustomFieldsFromLocalStorage;