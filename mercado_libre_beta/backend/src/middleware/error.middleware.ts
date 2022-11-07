import { HTTP_STATUS } from '../constants/api.constants'
import { errorResponse } from '../utils/api.utils'

const errorMiddleware = (error:any, req:any, res:any, next:any) => {
    const status = error.status || HTTP_STATUS.INTERNAL_ERROR;
    const message = error.message || 'An unexpected error ocurred'; 

    return res.status(status).json(errorResponse(message))
}

export default errorMiddleware