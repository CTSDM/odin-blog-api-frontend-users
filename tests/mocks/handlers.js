import { http, HttpResponse } from "msw";
import { comment, post } from "../validEntries";
import { env } from "../../config/config.js";

export const handlers = [
    http.get(env.server_url + "/login", () => {
        return new HttpResponse(null, { status: 401 });
    }),

    http.post(env.server_url + "/login", () => {
        return HttpResponse.json({
            data: "welcome back",
        });
    }),

    http.post(env.server_url + "/signup", () => {
        return HttpResponse.json({
            username: "username",
        });
    }),

    http.get(env.server_url + "/posts", () => {
        return HttpResponse.json([{ id: 0, title: "title", content: "content", username: "user" }]);
    }),

    http.post(env.server_url + "/logout", () => {
        return new HttpResponse(null, { status: 205 });
    }),

    http.get(env.server_url + `/posts/${post.id}`, () => {
        return HttpResponse.json(post);
    }),

    http.post(env.server_url + "/comments", () => {
        return HttpResponse.json({ msg: "APE POSTED", id: 99 });
    }),

    http.post(env.server_url + `/posts/${post.id}/like`, () => {
        return new HttpResponse(null, { status: 200 });
    }),

    http.delete(env.server_url + `/posts/${post.id}/like`, () => {
        return new HttpResponse(null, { status: 200 });
    }),
];

export const handlersAlternative = {
    loginPost401: http.post(env.server_url + "/login", () => {
        return new HttpResponse(null, { status: 401 });
    }),
    loginGet: http.get(env.server_url + "/login", () => {
        return HttpResponse.json({ username: "username" });
    }),
    loginGetLiked: http.get(env.server_url + "/login", () => {
        return HttpResponse.json({ username: "user" });
    }),
    signUpPost400: http.post(env.server_url + "/signup", () => {
        return HttpResponse.json({ errMsg: "some errors" }, { status: 201 });
    }),
    // add a new comment
    postIdGet: http.get(env.server_url + `/posts/${post.id}`, () => {
        return HttpResponse.json({ ...post, comments: [...post.comments, comment] });
    }),
    postIdGet400: http.get(env.server_url + `/posts/${post.id}`, () => {
        return new HttpResponse(null, { status: 404 });
    }),
    likePost500: http.post(env.server_url + `/posts/${post.id}/like`, () => {
        return new HttpResponse(null, { status: 500 });
    }),
    likeDelete404: http.delete(env.server_url + `/posts/${post.id}/like`, () => {
        return new HttpResponse(null, { status: 404 });
    }),
    likeDelete500: http.delete(env.server_url + `/posts/${post.id}/like`, () => {
        return new HttpResponse(null, { status: 500 });
    }),
};
