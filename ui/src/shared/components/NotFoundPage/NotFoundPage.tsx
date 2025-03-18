import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div>
            <h1>Four Oh Four</h1>
            <p>
                This page has not been found. Please go <Link to='/'>home</Link>.
            </p>
        </div>
    );
};
