exports.randomStringMake = (count) => {
    const letter = "0123456789ABCDEFGHIJabcdefghijklmnopqrstuvwxyzKLMNOPQRSTUVWXYZ0123456789abcdefghiABCDEFGHIJKLMNOPQRST0123456789jklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < count; i++) {
        const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
        randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
    }
    return randomString;
};
