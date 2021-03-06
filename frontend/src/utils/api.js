class Api {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    getInitialData(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            
          },
        }).then((res) =>
          res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
        );
    }

    getUserInfo(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).then((res) =>
          res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
        );
    }

    addCard({ link, name }, token) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
        },
            method: "POST",
            body: JSON.stringify({
                name,
                link
            })
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }
    
    deleteCard(cardId, token) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
        },
            method: "DELETE"
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }

    editUserInfo({name, about}, token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
        },
            method: "PATCH",
            body: JSON.stringify({
                name,
                about,
            })
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`))
    }

    changeLikeStatus(cardId, isLiked, token) {
      const methodBoolean = isLiked ? "PUT" : "DELETE";
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: methodBoolean,
      }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Error! ${res.statusText}`)
        )
    }

    setUserAvatar(avatarUrl, token){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
        },
          method: "PATCH",
          body: JSON.stringify({
            avatar: avatarUrl
          }),
        }).then((res) => {
          if (res.ok)  {
              return res.json() 
            }
          return Promise.reject(`Error! ${res.statusText}`);
        })
    }
}

const api = new Api({
  baseUrl: "https://api.around.students.nomoreparties.site",
});

export default api;
