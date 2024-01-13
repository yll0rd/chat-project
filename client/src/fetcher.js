const BASE_URL = 'http://127.0.0.1:8000/'
const OK_CODES = [200, 201]

const fetcher = async (url, options = {}) => {
    let responseObject= {message: '', data: {}, OK: false}
    try {
        const response = await fetch(BASE_URL + url, options)
        const result = await response.json()
        if (OK_CODES.includes(response.status)) {
            responseObject= {data: {...result}, OK: true}
            if (result.message)
                responseObject.message = result.message
        }
        else {
            responseObject.data = {...result}
            throw new Error(result.message)
        }

    }
    catch (e) {
        // console.error(e)
        responseObject.message = `${e.message}`
    }
    return responseObject
}

export const postSignIn = (options= {}) => {
    return fetcher('api/signin/', options)
}

export const postSignUp = (options= {}) => {
    return fetcher('api/signup/', options)
}

export const getContacts = (options={}) => {
    return fetcher('api/contacts/', options)
}

export const checkLogin = (options={}) => {
    return fetcher('api/check-login/', options)
}

export const logOut = (options={}) => {
    return fetcher('api/signout/', options)
}

export const getMessages = (roomId='', options={}) => {
    return fetcher(`api/messages/${roomId}`, options)
}