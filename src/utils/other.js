export const pick = (obj,...props) => {
    return  Object.fromEntries(Object.entries(obj).filter(([k]) => props.includes(k)));
}

export const removeTag = (fragment) => new DOMParser().parseFromString(fragment,'text/html').body.textContent || '';

export const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(),0,0))/ 1000 / 60 / 60 / 24);

export const gray = (r,g,b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
