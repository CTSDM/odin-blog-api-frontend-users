import PropTypes from "prop-types";
import styles from "./Comment.module.css";
import backupSrc from "../assets/backup.svg";

function Comment({ content, profilePictureLink, author, createdTime }) {
    const profileSrc = profilePictureLink ? profilePictureLink : backupSrc;
    return (
        <div className={styles.container}>
            <div className={styles["profile-pic"]}>
                <img src={profileSrc} alt="User profile picture" />
            </div>
            <div className={styles.info}>
                <div className={styles.author}>{author}</div>
                <div className={styles.date}>{createdTime.toDateString()}</div>
            </div>
            <div className={styles.content}>{content}</div>
        </div>
    );
}

Comment.propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdTime: PropTypes.instanceOf(Date).isRequired,
    profilePictureLink: PropTypes.string,
};

export default Comment;
