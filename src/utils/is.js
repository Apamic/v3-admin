// import {isArray} from "ant-design-vue/es/_util/util";

// export function isEmpty(val) {
//     if (isArray)
// }


export function isUrl(path) {
    const reg =
        /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}