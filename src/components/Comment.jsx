import PropTypes from "prop-types";
import styles from "./Comment.module.css";
import backupSrc from "../assets/backup.svg";
import { getDateFormatted } from "../utils/utils";
import requests from "../utils/requests";

function Comment({ id, content, profilePictureLink, author, createdTime, username, setPost }) {
    const profileSrc = profilePictureLink ? profilePictureLink : backupSrc;

    async function handleClick() {
        const data = {
            username: author,
            id: id,
        };
        const response = await requests.deleteComment(data);

        if (response && response.status === 404) {
            console.log("The comment was not found.");
        } else if (response && response.status >= 400) {
            console.log("Unathorized operation.");
        } else if (response && response.status === 200) {
            // let's delete the comment also locally
            console.log("The comment was successfully deleted from the DB.");
            setPost((post) => {
                return { ...post, comments: post.comments.filter((comment) => comment.id !== id) };
            });
        } else {
            console.log("Something went wrong on the server");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles["profile-pic"]}>
                <img src={profileSrc} alt="User profile picture" />
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
    profilePictureLink: PropTypes.string,
    setPost: PropTypes.func.isRequired,
};

export default Comment;
