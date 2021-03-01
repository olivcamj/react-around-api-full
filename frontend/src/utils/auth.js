export const BASE_URL = "https://api.around.students.nomoreparties.site";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
       return response.json();
     })
     .then((res) => {
       return res;
     }).catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    method: 'GET',
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => data)
  .catch((err) => {
    return console.log(err);
  })
}; 
