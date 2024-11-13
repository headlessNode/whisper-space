class CustomNotFoundError extends Error {
    constructor(message){
        super(message);
        this.status = 404;
        this.name = "NotFoundError";
    }
}

class HashingFailed extends Error {
    constructor(message){
        super(message);
        this.status = 500;
        this.name = "HashingFailed";
    }
}

module.exports = {
    CustomNotFoundError,
    HashingFailed
}