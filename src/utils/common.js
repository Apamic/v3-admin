
export const copyText = (text) => {
    return new Promise((resolve) => {
        const copyInput = document.createElement('input');
        copyInput.value = text;
        document.body.appendChild(copyInput);
        copyInput.select();
        document.execCommand('copy');
        copyInput.remove();
        resolve(true);
    })
}


export const isBase64 = str => {
    if (str === '' || str.trim() === '') {
        return false;
    }
     try {
         return btoa(atob(str)) == str;
     } catch (err) {
        return false;
     }

}