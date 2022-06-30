import { Response, ResponseStatus, ResponseStatusMessage } from '../Models/Response.js';

const getFromActuator = (url,endpoint) => {  
    return new Promise ((resolve, reject)  => 
        fetch(`${url}/actuator/${endpoint}`)        
            .then(async res => resolve(await onFetch(res)))
            .catch(err => reject(onFetchError(err))))
}


const onFetchError = err => {
   const body = {
        error: {
            status: ResponseStatusMessage.FETCH_ERROR,
        },
        originalError: err
    }

    return new Response(body, ResponseStatus.FETCH_ERROR, ResponseStatusMessage.FETCH_ERROR);
}

const onFetch = async res => {   
    let response;
    if (res.ok)
        response = new Response(
            await res.json(), 
            ResponseStatus.OK, 
            ResponseStatusMessage.OK
        )
    else
        if (res.status === 404) {
            const body = {
                error: {
                    status: ResponseStatusMessage.NOT_FOUND
                }
            }
            response = new Response(
                body, 
                ResponseStatus.NOT_FOUND,
                ResponseStatusMessage.NOT_FOUND
            )
        } else {
            const body = {
                error: {
                    status: ResponseStatusMessage.ERROR,
                },
                originalError: res                
            }            
            response = new Response(
                body, 
                ResponseStatus.ERROR, 
                ResponseStatusMessage.ERROR
            )
        }        
        
    return response;
}

export default getFromActuator;