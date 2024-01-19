const BASE_URL = process.env.REACT_APP_API_URL
console.log(BASE_URL)
let positionOfDomainName = 4;
if (BASE_URL.startsWith('https'))
    positionOfDomainName += 1;
export const BASE_WS_URL = 'ws' + BASE_URL.slice(positionOfDomainName)
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