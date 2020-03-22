export const getApiToken = () => {
    const apiToken = localStorage.getItem('Api') || null;

    return apiToken;
};
