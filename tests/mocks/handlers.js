import { http, HttpResponse } from "msw";
import { comment, post } from "../validEntries";

export const handlers = [
    http.get("http://localhost:5000/login", () => {
        return HttpResponse(null, { status: 401 });
    }),

    http.post("http://localhost:5000/login", () => {
        return HttpResponse.json({
            data: "welcome back",
        });
    }),

    http.post("http://localhost:5000/signup", () => {
        return HttpResponse.json({
            username: "username",
        });
    }),

    http.get("http://localhost:5000/posts", () => {
        return HttpResponse.json([{ id: 0, title: "title", content: "content", username: "user" }]);
    }),

    http.post("http://localhost:5000/logout", () => {
        return HttpResponse(null, { status: 205 });
    }),

    http.get(`http://localhost:5000/posts/${post.id}`, () => {
        return HttpResponse.json(post);
    }),

    http.post("http://localhost:5000/comments", () => {
        return HttpResponse.json({ msg: "APE POSTED", id: 99 });
    }),
];

export const handlersAlternative = {
    loginPost401: http.post("http://localhost:5000/login", () => {
        return HttpResponse(null, { status: 401 });
    }),
    loginGet: http.get("http://localhost:5000/login", () => {
        return HttpResponse.json({ username: "username" });
    }),
    signUpPost400: http.post("http://localhost:5000/signup", () => {
        return HttpResponse(null, { status: 400 });
    }),
    // add a new comment
    postIdGet: http.get(`http://localhost:5000/posts/${post.id}`, () => {
        return HttpResponse.json({ ...post, comments: [...post.comments, comment] });
    }),
    postIdGet400: http.get(`http://localhost:5000/posts/${post.id}`, () => {
        return HttpResponse(null, { status: 400 });
    }),
};
