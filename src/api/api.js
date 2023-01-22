const host = "http://localhost:3030/";

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const user = JSON.parse(sessionStorage.getItem("userData"));
  if (user) {
    const token = user.accessToken;
    sessionStorage.setItem("sesstionToken", token);
    sessionStorage.setItem("userId", user._id);
    options.headers["X-Authorization"] = token;
  }

  try {
    const response = await fetch(host + url, options);

    if (response.status == 204) {
      return response;
    }

    if (response.ok == false) {
      throw new Error(response.message);
    }
    const responseData = await response.json();

    return responseData;
  } catch (err) {
    // alert(err.message);
    throw err;
  }
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, "put");
export const del = request.bind(null, "delete");
