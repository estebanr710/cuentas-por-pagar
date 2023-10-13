const now = () => {

    let now = new Date().getTime();
    const UTC = new Date(now - ((5 * 60) * 60000));
    return UTC;
};

export default now;