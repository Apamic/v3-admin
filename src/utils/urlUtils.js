// 将路径中重复的正斜杆替换成单个斜杆隔开的字符串 返回将/去重后的结果
export const uniqueSlash = (path) => path.replace(/(https?:\/)|(\/)+/g, '$1$2');

//将对象添加当作参数拼接到URL上面
export const setObjToUrlParams = (baseUrl,obj) => {
    let parameters = ''
    let url = '';
    Object.keys(obj).forEach(k => {
        parameters += `${k}=${encodeURIComponent(obj[k])}&`;
    })
    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters;
    } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters;
    }
    return url;
}



