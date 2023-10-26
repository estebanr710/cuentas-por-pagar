const randomString = (stringLength: number = 10): string => {
    const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < stringLength; i++) {
        let pos = Math.floor(Math.random() * CHARSET.length);
        randomString += CHARSET.substring(pos, pos + 1);
    };
    return randomString;
}

export default randomString;