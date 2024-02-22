export const randomColor = () => '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6,'0');

export const randomString = () => Math.random().toString(36).slice(2);



