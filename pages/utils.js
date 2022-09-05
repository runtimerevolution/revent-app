const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_GET = process.env.NEXT_PUBLIC_GET;
const NEXT_PUBLIC_POST = process.env.NEXT_PUBLIC_POST;

export async function fetchEndpoint(endpoint, method, ...args) {
  if (method == NEXT_PUBLIC_GET) {
    return fetch(NEXT_PUBLIC_API_URL + endpoint, {
      method: NEXT_PUBLIC_GET,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => {
      return data.json();
    });
  } else if (method == NEXT_PUBLIC_POST) {
    const body = args[0];
    return fetch(NEXT_PUBLIC_API_URL + endpoint, {
      method: NEXT_PUBLIC_POST,
      mode: "cors",
      body,
    }).then((data) => data.json());
  }
}

export async function getSubmissionList() {
  return fetchEndpoint("submissions/", NEXT_PUBLIC_GET);
}

export async function postSubmission(body) {
  return fetchEndpoint("submissions/", NEXT_PUBLIC_POST, body);
}

export async function getUserList() {
  return fetchEndpoint("users/", NEXT_PUBLIC_GET);
}

export async function getSubmissionsFromContest(id) {
  return fetchEndpoint("contests/" + id, NEXT_PUBLIC_GET);
}
