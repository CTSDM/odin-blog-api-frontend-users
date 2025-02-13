import { env } from "../../config/config.js";

async function submitLogin(data) {
    const url = `${env.server_url}/login`;
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const userData = await response.json();
        return { status: response.status, ...userData };
    }
    return { status: response.status };
}

async function submitSignup(data) {
    const url = `${env.server_url}/signup`;
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const json = await response.json();
        return { status: response.status, data: json };
    }
    return { status: response.status };
}

async function submitLogout(controller) {
    const url = `${env.server_url}/logout`;
    const response = await fetch(url, {
        mode: "cors",
        method: "post",
        credentials: "include",
        signal: controller.signal,
    });
    return response;
}

async function getPost(id, controller) {
    const url = `${env.server_url}/posts/${id}`;
    const response = await fetch(url, {
        credentials: "include",
        method: "get",
        signal: controller.signal,
    });
    if (response.ok) {
        const json = await response.json();
        return { status: response.status, data: json };
    }
    return { status: response.status };
}

async function submitComment(data) {
    const url = `${env.server_url}/comments`;
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return { status: response.status };
}

async function deleteComment(data) {
    const url = `${env.server_url}/comments`;
    const response = await fetch(url, {
        credentials: "include",
        method: "delete",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return { status: response.status };
}

async function getAllPosts(controller) {
    const url = `${env.server_url}/posts`;
    const response = await fetch(url, {
        signal: controller.signal,
        credentials: "include",
        method: "get",
    });
    if (response.ok) {
        const json = await response.json();
        return { status: response.status, data: json };
    }
    return { status: response.status };
}

async function getLogin(controller) {
    const url = `${env.server_url}/login`;
    const response = await fetch(url, {
        signal: controller.signal,
        mode: "cors",
        credentials: "include",
        method: "get",
    });
    if (response.ok) {
        const json = await response.json();
        return { status: response.status, username: json.username };
    }
    return { status: response.status };
}

async function submitLike(postId, method) {
    const url = `${env.server_url}/posts/${postId}/like`;
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: method,
    });
    return { status: response.status };
}

export default {
    getLogin,
    getPost,
    getAllPosts,
    deleteComment,
    submitComment,
    submitLike,
    submitLogin,
    submitLogout,
    submitSignup,
};
