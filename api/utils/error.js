// Instead of writting the same error code each and every time we will use this.
export const errorHandler = (statusCode,message) =>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}