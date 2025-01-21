import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PostPreview.module.css";

function PostPreview({ title, content, username, route, id }) {
    const ref = useRef();
    useEffect(() => {
        let modify = true;
        if (modify) {
            const heightCurrent = ref.current.offsetHeight;
            // the css has a max height of 20 rem
            const heightPxMax = convertRemToPixels(20);
            if (heightCurrent > heightPxMax) {
                ref.current.classList.add(styles["content-overflow"]);
                addOverflowDiv(ref.current);
            }
        }

        return () => (modify = false);
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <Link to={route + "/" + id}>{title}</Link>
            </div>
            <div>{username}</div>
            <div className={styles.content} ref={ref}>
                {content}
            </div>
        </div>
    );
}

PostPreview.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function addOverflowDiv(divContainer) {
    const divOverflow = document.createElement("div");
    divOverflow.textContent = " ";
    divOverflow.classList.add(styles["overflow-cover"]);
    divContainer.appendChild(divOverflow);
}

export default PostPreview;
