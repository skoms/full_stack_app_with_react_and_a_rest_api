export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = "http://localhost:5000/api" + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
      console.log(options.body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      console.log('200');
      return response.json().then( data => data );
    }
    else if (response.status === 401) {
      console.log('401');
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then( data => data );
    } else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then( data => data );
    } else {
      throw new Error();
    }
  }
  
  async createCourse(course, user) {
    const response = await this.api('/courses', 'POST', course, true, user);
    if (response.status === 201) {
      return 201;
    } else if (response.status === 400) {
      return response.json().then(data => data.message );
    } else {
      throw new Error();
    }
  }

  async updateCourse(course, id, user) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, user);
    if (response.status === 204) {
      return 204;
    } else if (response.status === 403) {
      return response.json().then(data => data.message );
    } else {
      throw new Error();
    }
  }

  async deleteCourse(id) {
    const response = await this.api(`/courses/${id}`, 'DELETE');
    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then(data => data.errors );
    } else {
      throw new Error();
    }
  }
}