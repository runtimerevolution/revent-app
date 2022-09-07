const { NEXT_PUBLIC_API_URL } = process.env
const GET = 'GET'
const POST = 'POST'

export async function fetchEndpoint(endpoint, method, ...args) {
    if (method == GET) {
        return fetch(NEXT_PUBLIC_API_URL + endpoint, {
            method: GET,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((data) => {
            return data.json()
        })
    } else if (method == POST) {
        const body = args[0]
        return fetch(NEXT_PUBLIC_API_URL + endpoint, {
            method: POST,
            mode: 'cors',
            body,
        }).then((data) => data.json())
    }
}

export async function getSubmissionList() {
    return fetchEndpoint('submissions/', GET)
}

export async function postSubmission(body) {
    return fetchEndpoint('submissions/', POST, body)
}

export async function getUserList() {
    return fetchEndpoint('users/', GET)
}

export async function getSubmissionsFromContest(id) {
    return fetchEndpoint('contests/' + id, GET)
}
