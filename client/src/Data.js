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
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json()
        .then( data =>{
          return {
            status: response.status,
            user: data
          };
        });
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then( data => {
        return {
          status: 200,
          course: data
        };
      });
    } else if (response.status === 404) {
      return { 
        status: response.status,
      };
    } if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json()
        .then( data => {
          return {
            status: 200,
            courses: data
          }; 
        });
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return {
        status: response.status,
        user: user
      };
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }
  
  async createCourse(course, user) {
    const response = await this.api('/courses', 'POST', course, true, user);
    if (response.status === 201) {
      return {
        status: 201,
        course: course,
      };
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }

  async updateCourse(course, id, user) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, user);
    if (response.status === 204) {
      return {
        status: 204,
        course: course,
      };
    } else if (response.status === 403) {
      return { 
        status: response.status
      };
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }

  async deleteCourse(id) {
    const response = await this.api(`/courses/${id}`, 'DELETE');
    if (response.status === 204) {
      return {
        status: 204
      };
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          return { 
            status: response.status,
            errors: data.message
          };
        });
    }
  }
}