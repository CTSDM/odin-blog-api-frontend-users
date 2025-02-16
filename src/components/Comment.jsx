import PropTypes from "prop-types";
import backupSrc from "../assets/backup.svg";
import { getDateFormatted } from "../utils/utils";
import requests from "../utils/requests";
import ImageProfile from "./ImageProfile";
import styles from "./Comment.module.css";

function Comment({ id, content, profileSrcServer, author, createdTime, username, setPost }) {
    const profileSrc = profileSrcServer ? profileSrcServer : backupSrc;

    async function handleClick() {
        const data = {
            username: author,
            id: id,
        };
        const response = await requests.deleteComment(data);

        if (response && response.status === 404) {
            window.alert("The comment was not found.");
        } else if (response && response.status >= 400) {
            window.alert("Unathorized operation.");
        } else if (response && response.status === 200) {
            setPost((post) => {
                return { ...post, comments: post.comments.filter((comment) => comment.id !== id) };
            });
        } else {
            window.alert(
                "Something went wrong on the server, please reload the page and try again.",
            );
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles["profile-pic"]}>
                <ImageProfile profileSrc={profileSrc} />
            </div>
            <div className={styles.info}>
                <div className={styles.author}>{author}</div>
                <div className={styles.date}>{getDateFormatted(createdTime)}</div>
            </div>
            <div className={styles.content}>{content}</div>
            {username === author ? (
                <button type="button" onClick={handleClick}>
                    Delete
                </button>
            ) : null}
        </div>
    );
}

Comment.propTypes = {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    username: PropTypes.string,
    createdTime: PropTypes.instanceOf(Date).isRequired,
    profileSrcServer: PropTypes.string,
    setPost: PropTypes.func.isRequired,
};

export default Comment;
