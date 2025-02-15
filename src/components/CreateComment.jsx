import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form, useActionData } from "react-router-dom";
import styles from "./CreateComment.module.css";
import requests from "../utils/requests";
import { validateData } from "../utils/utils";

function CreateComment({ postId, setPost }) {
    const response = useActionData();
    const [messageStatus, setMessageStatus] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        if (response && response.status === 200) {
            const form = document.querySelector("form");
            form.reset();
            (async () => {
                const responsePost = await requests.getPost(postId, controller);
                const post = responsePost.data;
                setPost(post);
            })();
        }
        if (response && response.errMsg) {
            setMessageStatus(response.errMsg);
        } else if (messageStatus !== null) {
            setMessageStatus(null);
        }
        return () => {
            controller.abort("Cancelled because of React StrictMode it gets called twice.");
        };
    }, [response, postId]);

    return (
        <div className={styles.container}>
            {messageStatus
                ? messageStatus.map((message) => {
                      <div>{message}</div>;
                  })
                : null}
            <div>Write a new comment:</div>
            <Form className={styles.form} method="POST" action={`/posts/${postId}`}>
                <textarea rows="4" cols="60" name="content"></textarea>
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
    const validationMessages = validateData(submission);
    if (validationMessages.length > 0) {
        return { errMsg: validationMessages };
    }
    return await requests.submitComment(submission);
};

CreateComment.propTypes = {
    postId: PropTypes.number.isRequired,
    setPost: PropTypes.func.isRequired,
};

export default CreateComment;
