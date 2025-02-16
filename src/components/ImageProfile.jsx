import PropTypes from "prop-types";

export default function ImageProfile({ profileSrc }) {
    return (
        <>
            {profileSrc.includes(".webm") ? (
                <video autoPlay loop muted poster="profile picture">
                    <source src={profileSrc} type="video/webm" />
                </video>
            ) : (
                <img src={profileSrc} alt="profile picture" />
            )}
        </>
    );
}

ImageProfile.propTypes = {
    profileSrc: PropTypes.string.isRequired,
};
