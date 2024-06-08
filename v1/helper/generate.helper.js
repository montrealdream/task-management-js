// RANDOM STRING
module.exports.randomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for(let index = 0 ; index < length ; index++){
        result += characters.charAt(
            Math.ceil(
                Math.random() * characters.length
            )
        );
    }
    return result;
}