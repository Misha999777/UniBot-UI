import {BASE_URL} from "../config";
import {AuthService} from "./AuthService";

const request = async (options) => {
    const headers = {};

    headers["Content-Type"] = "application/json";

    const authService = new AuthService();
    await authService.loadUser();
    headers["Authorization"] = "Bearer " + await authService.getToken();

    const defaults = {headers: headers};

    let body = options.body;
    if (body instanceof FormData) {
        delete defaults.headers['Content-Type'];
    }

    return fetch(options.url, {...defaults, ...options}).then(response => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        if (response.status === 204) {
            return response;
        }
        return response.json();
    })
};

export function getBots(req) {
    return request({
        url: BASE_URL + "/bots",
        method: "GET",
        body: JSON.stringify(req)
    });
}

export function register(req) {
    return request({
        url: BASE_URL + "/register",
        method: "POST",
        body: JSON.stringify(req)
    });
}

export function addWeek(req) {
    return request({
        url: `${BASE_URL}/setWeek`,
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

export function getItems(section, botId) {
    switch (section) {
        default:
            return null;
        case "Расписание":
            return request({
                url: `${BASE_URL}/bots/` + botId + `/lessons`,
                method: "GET"
            });
        case "Ссылки":
            return request({
                url: `${BASE_URL}/bots/` + botId + `/apps`,
                method: "GET"
            });
        case "Учебники":
            return request({
                url: `${BASE_URL}/bots/` + botId + `/books`,
                method: "GET"
            });
        case "Лекции":
            return request({
                url: `${BASE_URL}/bots/` + botId + `/lectures`,
                method: "GET"
            });
        case "Студенты":
            return request({
                url: `${BASE_URL}/bots/` + botId + `/students`,
                method: "GET"
            });
        case "Преподаватели":
            return request({
                url: `${BASE_URL}/bots/` + botId + `/teachers`,
                method: "GET"
            });
    }
}

export function addItem(data) {
    switch (data.section) {
        default:
            return null;
        case "Расписание":
            return request({
                url: `${BASE_URL}/lessons`,
                method: "POST",
                body: JSON.stringify({
                    id: data.objectID,
                    lessonOfFirstWeek: data.title,
                    lessonOfSecondWeek: data.subtitle,
                    day: data.day,
                    bot: "/bots/" + data.bot
                })
            });
        case "Ссылки":
            return request({
                url: `${BASE_URL}/apps`,
                method: "POST",
                body: JSON.stringify({
                    id: data.objectID,
                    name: data.title,
                    url: data.subtitle,
                    bot: "/bots/" + data.bot
                })
            });
        case "Учебники":
            return request({
                url: `${BASE_URL}/books`,
                method: "POST",
                body: JSON.stringify({
                    id: data.objectID,
                    name: data.title,
                    url: data.subtitle,
                    bot: "/bots/" + data.bot
                })
            });
        case "Лекции":
            return request({
                url: `${BASE_URL}/lectures`,
                method: "POST",
                body: JSON.stringify({
                    id: data.objectID,
                    name: data.title,
                    url: data.subtitle,
                    bot: "/bots/" + data.bot
                })
            });
        case "Студенты":
            return request({
                url: `${BASE_URL}/students`,
                method: "POST",
                body: JSON.stringify({
                    id: data.objectID,
                    name: data.title,
                    data: data.subtitle,
                    bot: "/bots/" + data.bot
                })
            });
        case "Преподаватели":
            return request({
                url: `${BASE_URL}/teachers`,
                method: "POST",
                body: JSON.stringify({
                    id: data.objectID,
                    name: data.title,
                    data: data.subtitle,
                    bot: "/bots/" + data.bot
                })
            });
    }
}

export function deleteItem(section, id) {
    switch (section) {
        default:
            return null;
        case "Расписание":
            return request({
                url: `${BASE_URL}/lessons/` + id,
                method: "DELETE"
            });
        case "Ссылки":
            return request({
                url: `${BASE_URL}/apps/` + id,
                method: "DELETE"
            });
        case "Учебники":
            return request({
                url: `${BASE_URL}/books/` + id,
                method: "DELETE"
            });
        case "Лекции":
            return request({
                url: `${BASE_URL}/lectures/` + id,
                method: "DELETE"
            });
        case "Студенты":
            return request({
                url: `${BASE_URL}/students/` + id,
                method: "DELETE"
            });
        case "Преподаватели":
            return request({
                url: `${BASE_URL}/teachers/` + id,
                method: "DELETE"
            });
    }
}
