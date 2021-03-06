import { isEmpty } from './validations';
import { APP_ROOT_DOMAIN } from '../configs/api';

export const toMoneyFormat = (val) => {
    if(isEmpty(val)) return '';
    if(typeof val !== 'number') val = Number(val);
    return val.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -2);
}

export const removeVNAccents = (str) => {
    if(isEmpty(str)) return '';
  // remove accents
    const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
    const to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i = 0, l = from.length ; i < l ; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    return str;
}

export const convertStringToSlug = (str) => {
    if(isEmpty(str)) return '';
    
    str = removeVNAccents(str)
    str = str.toLowerCase()
            .trim()
            .replace(/[^a-z0-9\-]/g, '-')
            .replace(/-+/g, '-');
    return str;
}

export const formatImageUrl = (url) => {
    if(isEmpty(url)) return '';
    if(url.indexOf('http') == 0) return url;
    return APP_ROOT_DOMAIN + url;
}

export const truncate = (str, maxLength) => {
    if(isEmpty(str)) return '';
    if(str.length <= maxLength) return str;
    const index = str.indexOf(' ', maxLength);
    return str.substring(0, index) + '...';
}

export const removeHtmlTags = (myString) => {
    if(isEmpty(myString)) return '';
    return myString.replace(/<[^>]*>?/gm, '');
}

export const getByteSize = (str) => {
    // return new Blob([str]).size;
    const size = (new TextEncoder().encode(str)).length / 1024;
    return size.toFixed(2);
}