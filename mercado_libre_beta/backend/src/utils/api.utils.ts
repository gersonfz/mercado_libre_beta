export const successResponse = (data:any) => {
    return {
        success: true,
        data
    }
}

export const errorResponse = (message:any) => {
    return {
        success: false,
        error: message
    }
}

export class HttpError {
    status: number
    message: string

    constructor(status:any, message:any) {
        this.status = status
        this.message = message
    }
}