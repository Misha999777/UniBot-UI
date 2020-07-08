import {ACCESS_TOKEN, BASE_URL} from "../constants";

const request = (options) => {
  const headers = {};

  headers["Content-Type"] = "application/json";

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers["Authorization"] = "Bearer " + localStorage.getItem(ACCESS_TOKEN);
  }

  const defaults = { headers: headers };

  let body = options.body;
  if (body instanceof FormData) {
    delete defaults.headers['Content-Type'];
  }

  return fetch(options.url, { ...defaults, ...options}).then(response => {
    if (response.status === 401) {
      localStorage.clear();
      window.location.reload();
      return Promise.reject(response);
    }
    if (!response.ok) {
      return Promise.reject(response);
    }
    if(response.status === 204) {
      return response;
    }
    return response.json();
  })
};

export function login(req) {
  return request({
    url: BASE_URL + "/auth",
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function getBooks() {
  return request({
    url: `${BASE_URL}/books`,
    method: "GET"
  });
}

export function addBook(req) {
  return request({
    url: `${BASE_URL}/books`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function deleteBook(req) {
  return request({
    url: `${BASE_URL}/books/` + req.id,
    method: "DELETE",
    body: JSON.stringify(req)
  });
}

export function getApp() {
  return request({
    url: `${BASE_URL}/apps`,
    method: "GET"
  });
}

export function addApp(req) {
  return request({
    url: `${BASE_URL}/apps`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function deleteApp(req) {
  return request({
    url: `${BASE_URL}/apps/` + req.id,
    method: "DELETE",
    body: JSON.stringify(req)
  });
}

export function getLecture() {
  return request({
    url: `${BASE_URL}/lectures`,
    method: "GET"
  });
}

export function addLecture(req) {
  return request({
    url: `${BASE_URL}/lectures`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function deleteLecture(req) {
  return request({
    url: `${BASE_URL}/lectures/` + req.id,
    method: "DELETE",
    body: JSON.stringify(req)
  });
}

export function getLesson() {
  return request({
    url: `${BASE_URL}/lessons`,
    method: "GET"
  });
}

export function addLesson(req) {
  return request({
    url: `${BASE_URL}/lessons`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function deleteLesson(req) {
  return request({
    url: `${BASE_URL}/lessons/` + req.id,
    method: "DELETE",
    body: JSON.stringify(req)
  });
}

export function getStudent() {
  return request({
    url: `${BASE_URL}/students`,
    method: "GET"
  });
}

export function addStudent(req) {
  return request({
    url: `${BASE_URL}/students`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function deleteStudent(req) {
  return request({
    url: `${BASE_URL}/students/` + req.id,
    method: "DELETE",
    body: JSON.stringify(req)
  });
}

export function getTeacher() {
  return request({
    url: `${BASE_URL}/teachers`,
    method: "GET"
  });
}

export function addTeacher(req) {
  return request({
    url: `${BASE_URL}/teachers`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function deleteTeacher(req) {
  return request({
    url: `${BASE_URL}/teachers/` + req.id,
    method: "DELETE",
    body: JSON.stringify(req)
  });
}

export function addWeek(req) {
  return request({
    url: `${BASE_URL}/weeks`,
    method: "POST",
    body: JSON.stringify(req)
  });
}

export function uploadImage(image) {
  let form = new FormData();
  form.append('file', image);
  return request({
    url: `${BASE_URL}/uploadFile`,
    method: 'POST',
    body: form,
  });
}
