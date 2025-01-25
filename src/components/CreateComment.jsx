import { Form, useActionData } from "react-router-dom";
import PropTypes from "prop-types";

function CreateComment({ postId }) {
    const response = useActionData();

    if (response && response.status >= 400) {
        console.log("something went wrong");
    }

    return (
        <div>
            <div>Write a new comment:</div>
            <Form method="POST" action={`/posts/${postId}`}>
                <textarea rows="4" cols="80" name="content"></textarea>
                <input type="text" hidden name="postId" defaultValue={postId} />
                <button type="submit">Submit new comment</button>
            </Form>
        </div>
    );
}

export const action = async ({ request }) => {
    const data = await request.formData();
    const submission = {
        content: data.get("content"),
        postId: data.get("postId"),
    };

    const status = await submitComment(submission);
    return status;
};

async function submitComment(data) {
    const url = "http://localhost:5000/comments";
    const response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000",
        },
    });

    return response.status;
}

CreateComment.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default CreateComment;
