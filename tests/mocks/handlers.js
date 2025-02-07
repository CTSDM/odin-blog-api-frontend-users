import { http, HttpResponse } from "msw";

export const handlers = [
    // Mock a GET request to /signup route on the backend server
    http.get("http://localhost:5000/login", () => {
        return HttpResponse(null, { status: 401 });
    }),

    http.post("http://localhost:5000/signup", () => {
        return HttpResponse.json({
            username: "username",
        });
    }),

    http.get("http://localhost:5000/posts", () => {
        return HttpResponse.json({
            id: 0,
            title: "title",
            content: "content",
            username: "user",
        });
    }),
];
