class Response {
    constructor (body, status, statusMessage) {
        this.body = body;
        this.status = status;
        this.statusMessage = statusMessage;
    }
}

const ResponseStatus = Object.freeze({
    OK: 'OK',
    NOT_FOUND: 'NOT FOUND',
    ERROR: 'ERROR',
    FETCH_ERROR: 'FETCH ERROR'
})

const ResponseStatusMessage = Object.freeze({
    OK: 'Ok',
    NOT_FOUND: 'Endpoint not accessible',
    ERROR: 'Endpoint returned with an error',
    FETCH_ERROR: 'An error occurred while fetching'
})

export { Response, ResponseStatus, ResponseStatusMessage };