import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h1>Page Not Found</h1>
                <p>Page you are looking for does not exist!!!</p>
                <br />
                {/* <Link to="/">Return Home</Link> */}
            </div>
        );
    }
}

export default NotFound;