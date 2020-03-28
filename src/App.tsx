import React, { memo, useEffect } from 'react';
import $ from 'jquery';

import { Private, Public } from './Layout';

function App() {
    useEffect(() => {
        $(document).ready(function() {
            $('body').on('contextmenu', function() {
                return false;
            });
        });
    });

    switch (!localStorage.getItem('Api') && !localStorage.getItem('customFields')) {
        case false:
            return <Private />;
        default:
            return <Public />;
    }
}

export default memo(App);
