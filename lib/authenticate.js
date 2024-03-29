import jwt_decode from "jwt-decode";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();

    return token ? jwt_decode(token) : null;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = readToken();

  return token ? true : false;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${apiUrl}/login`, {
    method: "POST",

    body: JSON.stringify({ 
      username: user, 
      password: password }),

    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  
  if (res.status === 200) {
    setToken(data.token); 

  } else {
    throw new Error(data.error.code);
  }
}

export async function registerUser(userData) {
  const res = await fetch(`${apiUrl}/register`, {
    method: "POST",
    body: JSON.stringify({
      username: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      password2: userData.password2,
      role: userData.role,
    }),

    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  if (res.status === 201) { return true; } 
  else { throw new Error(data.error.code); }
}

