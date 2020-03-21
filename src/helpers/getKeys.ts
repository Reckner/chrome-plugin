export const getKeyFromLocalStorage = () =>{
    var keys = localStorage.getItem('customFields') || [];
    return keys;
}