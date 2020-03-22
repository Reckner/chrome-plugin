import React, { memo, useEffect } from 'react';
import { Private, Public } from './Layout';

function App() {
    switch (!localStorage.getItem('Api')) {
        case false:
            return <Private />;
        default:
            return <Public />;
    }
}

export default memo(App);
