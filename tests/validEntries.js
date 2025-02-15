const user = {
    username: "user",
    password: "Pa_123",
};

const post = {
    id: 0,
    title: "title TEST",
    content: "content TEST",
    visible: true,
    username: "usernameTEST",
    created_time: "2025-01-25T07:56:37.059Z",
    likes: ["user", "admin", "anotherUser", "randomUser"],
    comments: [
        {
            id: 1,
            content: "comment Test",
            created_time: "2025-01-25T07:56:37.059Z",
            username: "authorTEST",
        },
        {
            id: 2,
            content: "another comment Test",
            created_time: "2025-02-25T07:56:37.059Z",
            username: "anotherAuthorTEST",
        },
    ],
};

const comment = {
    id: 3,
    content: "This is a random new comment which will be used as a test",
    created_time: "2025-02-25T07:59:37.059Z",
    username: "authorTEST",
};

export { user, post, comment };
