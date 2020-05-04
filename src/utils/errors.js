export const getErrorsFromResponse = (errors) => {
    let str = '';
    for(let prop in errors){
        str += errors[prop] + '\n';
    }
    return str;
};