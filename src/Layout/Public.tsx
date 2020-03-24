import React, { memo } from 'react';

import ApiSetup from '../containers/ApiSetup/ApiSetup';

function Public() {
    return <ApiSetup guest={true} />;
}

export default memo(Public);
