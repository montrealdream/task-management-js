// RANDOM STRING
module.exports.randomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for(let index = 0 ; index < length ; index++){
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    return result;
}

// RANDOM STRING NUMBER
module.exports.randomNums = (length) => {
    let result = '';
    const characters = '0123456789';
    
    for(let index = 0 ; index < length ; index++){
        result += characters.charAt(
            Math.floor(
                Math.random() * characters.length
            )
        );
    }
    return result;
}