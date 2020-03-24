import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100 pr-4">
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
