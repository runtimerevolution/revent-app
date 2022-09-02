const API_URL = process.env.API_URL;
const GET = process.env.GET;
const POST = process.env.POST;

export async function fetchEndpoint(endpoint, method, ...args) {
  console.log(API_URL + endpoint);
  console.log(process.env);
  console.log(GET);
  console.log(method);
  if (method == GET) {
    return fetch(API_URL + endpoint, {
      method: GET,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  } else if (method == POST) {
    const body = args[0];
    console.log(args);
    return fetch(API_URL + endpoint, {
      method: POST,
      mode: "cors",
      body,
    }).then((data) => data.json());
  }
}
