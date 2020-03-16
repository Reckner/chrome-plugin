import React, { memo, useState } from 'react';
import Companies from './containers/Companies/Companies';
import ApiSetup from './containers/ApiSetup/ApiSetup';

function App() {
    const [page, setPage] = useState('default');

    function switchPage(page) {
        setPage(page);
    }

    switch (page) {
        case 'ApiSetup':
            return <ApiSetup switchPage={switchPage} />;
        default:
            return <Companies switchPage={switchPage} />;
    }
}

export default memo(App);
