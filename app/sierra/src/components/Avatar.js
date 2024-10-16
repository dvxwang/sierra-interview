import PropTypes from 'prop-types';
import defaultAvatar from '../assets/missing_avatar.png';

const Avatar = (props) => {

    // Rough estimates, can be more refined based on viewport detection
    const size = props.size === 'lg' ? {
        width: '15vh',
        height: '15vh'
    } : 
    {
        width: '8vh',
        height: '8vh'
    }

    return (
        <div className='mx-auto avatar-container rounded-circle' style={size}>
            <img 
                src={props.src}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src=defaultAvatar;
                }}
            />
        </div>
    );
}

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.string,
}

export default Avatar;