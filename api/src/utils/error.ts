export const errorHandler = (statusCode: number, message: string) => {
    const error: any = new Error()
    error.code = statusCode
    error.message = message
    return error 
}