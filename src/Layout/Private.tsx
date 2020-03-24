import React, { memo, useState } from 'react';

import ApiSetup from '../containers/ApiSetup/ApiSetup';
import Companies from '../containers/Companies/Companies';

function Private() {
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

export default memo(Private);
