export default class Data {
  /**
   * Enhanced, more modular version of the 'fetch' request to use with not only 'GET' etc
   * @param {string} path - the path in the api to make the request to
   * @param {string} method - what type of repuest to make (GET, POST, PUT, DELETE)
   * @param {object} body - request body object (for POST or PUT requests)
   * @param {boolean} requiresAuth - to specify whether or not the path requires authentification
   * @param {object} credentials - login credentials (only used when 'requiresAuth' is true)
   * @returns returns a promise of the fetch request
   */
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
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // Gets the user if credentials matches any
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
    } else if (response.status === 500) {
      return { 
        status: response.status,
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

  // Gets the couse if id matches any
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then( data => {
        return {
          status: response.status,
          course: data
        };
      });
    } else if (response.status === 404 || response.status === 500) {
      return { 
        status: response.status,
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

  // Gets all courses
  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json()
        .then( data => {
          return {
            status: response.status,
            courses: data
          }; 
        });
    } else if (response.status === 500) {
      return { 
        status: response.status,
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

  // Creates/POSTs a user to the API
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return {
        status: response.status,
        user: user
      };
    } else if (response.status === 500) {
      return { 
        status: response.status,
      };
    } else if (response.status > 299) {
      return response.json()
        .then(data => {
          if (typeof data.message === 'string') {
            return { 
              status: response.status,
              errors: [data.message]
            };
          } else {
            return { 
              status: response.status,
              errors: data.message
            };
          }
          
        });
    }
  }
  
  // Creates/POSTs a course to the API
  async createCourse(course, user) {
    const response = await this.api('/courses', 'POST', course, true, user);
    if (response.status === 201) {
      return {
        status: 201,
        course: course,
      };
    } else if (response.status === 500) {
      return { 
        status: response.status,
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

  // Updates/PUTs a course on the API
  async updateCourse(course, id, user) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, user);
    if (response.status === 204) {
      return {
        status: 204,
        course: course,
      };
    } else if (response.status === 403 || response.status === 500) {
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

  // DELETEs a specified course from the API
  async deleteCourse(id, user) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, user);
    if (response.status === 204) {
      return {
        status: 204
      };
    } else if (response.status === 500) {
      return { 
        status: response.status,
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