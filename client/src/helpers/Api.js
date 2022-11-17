import Local from "./Local";

class Api {
  /**
   * Log in a user
   **/

  static async loginUser(username, password) {
    let body = { username, password };
    console.log("tao");
    return await this._doFetch("/auth/login", "POST", body);
  }

  /**
   * Get all users
   **/

  static async getUsers() {
    return await this._doFetch("/users");
  }

  /**
   * Get data for user with ID 'userId'
   **/

  static async getUser(user_id) {
    return await this._doFetch(`/users/${user_id}`);
  }

  /**
   * General purpose GET (for URLs like /members-only)
   **/

  static async getContent(url) {
    return await this._doFetch(url);
  }

  // GET all roadtrips

  static async getRoadtrips() {
    return await this._doFetch("/roadtrips");
  }


  //POST new stop
  static async addStop(newPlace) {
    return await this._doFetch("/stops", "POST", newPlace);
  }

  //DELETE stop
  // static async deleteStop(id) {
  //   return await this._doFetch(`/stops/${id}`, "DELETE", id);
  // }

  /**
   * Private method for internal use only
   **/

  static async _doFetch(url, method = "GET", body = null) {
    // Prepare fetch() options
    let options = {
      method,
      headers: {},
    };

    // Add token to headers if it exists in localStorage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    // Add the body if one is supplied
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    // Do the fetch() and store the results in a "unified" myresponse obj
    //console.log(body);
    //console.log(options);
    let myresponse = { ok: false, data: null, status: 0, error: "" };
    try {
      let response = await fetch(url, options);
      console.log(response);
      if (response.ok) {
        myresponse.ok = true;
        myresponse.data = await response.json();
        myresponse.status = response.status;
      } else {
        myresponse.status = response.status;
        myresponse.error = response.statusText;
      }
    } catch (err) {
      myresponse.error = err.message;
    }

    return myresponse;
  }
}

export default Api;
