import { isEmpty } from './validations'

export const daysInWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

export const ten = (val) => val >= 10 ? val : '0' + val;

export const thousand =  (val) => {
    if(val >= 1000) return val;
    if(val >= 100) return '0' + val;
    if(val >= 10) return '00' + val;
    return '000' + val;
}

export const formatVNDate = (d) => {
    if(!d) return '';
    d = new Date(d);
    const y = thousand(d.getFullYear());
    const m = ten(d.getMonth() + 1);
    const date = ten(d.getDate());
    return date + '/' + m + '/' + y;
}

export const convertVNDateToSQLDateFormat = (d) => {
    const arr = d.split('/');
    return arr[2] + '-' + arr[1] + '-' + arr[0];
}

export const getVNTimeFormat = (time) => {
    let d = new Date(time);
    // d = new Date(d.setHours(d.getHours() - 7));
    const day = d.getDay();
    const hour = d.getHours();
    const min = d.getMinutes();
    const date = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${daysInWeek[day]} ${ten(date)}/${ten(month)}/${thousand(year)} - ${ten(hour)}:${ten(min)}`;
    // return new Date(time).toLocaleString('vi-VN');
}


export const is2MonthRange = (from, to) => {
    const d = new Date(to);
   
    const anotherD = new Date(d.setMonth(d.getMonth() - 2));
    return new Date(from).getTime() - anotherD.getTime() >= 0 ; 
}