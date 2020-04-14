import React, { memo, useState } from 'react';
import classnames from 'classnames';
import $ from 'jquery';

import { Alert, Input, Button, Container, Header } from '../../components';

import saveCustomFieldsKeysToLocalStorage from '../../helpers/saveCustomFiledsKeysToLocalStorage';
import { CloseIcon } from '../../assets/images';

interface ApiSetup {
    switchPage?: any;
    guest?: any;
}

const ApiSetup: React.FC<ApiSetup> = ({ switchPage, guest }) => {
    const [state, setState] = React.useState({
        Api: '',
    });
    const [type, setType] = useState('');
    const [alertMessage, setAlertMessage] = useState('Error');

    function handleChange(evt) {
        setState({ Api: evt.target.value });
    }

    const handleSave = async (e) => {
        e.preventDefault();

        const responseStatus = await saveCustomFieldsKeysToLocalStorage(
            state.Api,
        );
        if (responseStatus === 401 || responseStatus === null) {
            setAlertMessage('Forkert API-nøgle!');
            setType('error');
            ($('#alert') as any).modal({
                backdrop: false,
                keyboard: false,
            });
            setTimeout(() => {
                ($('#alert') as any).modal('hide');
            }, 1500);
        } else {
            localStorage.setItem('Api', state.Api);
            setAlertMessage('API-nøgle er blevet tilføjet!');
            setType('add');
            ($('#alert') as any).modal({
                backdrop: false,
                keyboard: false,
            });
            setTimeout(() => {
                ($('#alert') as any).modal('hide');
                window.location.reload();
            }, 1500);
        }
    };

    const handleRemove = (e) => {
        e.preventDefault();

        localStorage.removeItem('Api');
        localStorage.removeItem('customFields');
        window.location.reload();
    };

    return (
        <>
            <Alert type={type}>{alertMessage}</Alert>
            <Header className="d-flex align-items-center justify-content-between">
                <h4 className="text-secondary mb-0">
                    Find og overfør Virk-data til PD
                </h4>
                <Button
                    onClick={() => switchPage('default')}
                    className={classnames('align-self-end ml-4 px-0 my-auto', {
                        invisible: guest,
                    })}
                >
                    <CloseIcon />
                </Button>
            </Header>
            <Container className="justify-content-between">
                <div className="d-flex flex-column flex-fill justify-content-center pr-4">
                    <Input
                        id="api"
                        label="Indtast Pipedrives API-nøgle"
                        name="name"
                        type="text"
                        containerClassName="w-100 mb-3"
                        className="shadow-sm disabled"
                        value={localStorage.getItem('Api')}
                        onChange={handleChange}
                        disabled={localStorage.getItem('Api')}
                    />
                    {localStorage.getItem('Api') ? (
                        <Button appearance="danger" onClick={handleRemove}>
                            Slet
                        </Button>
                    ) : (
                        <Button appearance="success" onClick={handleSave}>
                            Indsend
                        </Button>
                    )}
                </div>
                <p className="mb-0 pr-4">
                    Denne plugin henter data fra virk.dk og overfører dem til
                    Pipedrive
                </p>
            </Container>
        </>
    );
};

export default memo(ApiSetup);
