import React, { memo } from 'react';
import classnames from 'classnames';
import { Input, Button, Container } from '../../components';
import { CloseIcon } from '../../assets/images';
import saveKeysToLocalStorage from '../../helpers/saveKeys'

interface ApiSetup {
    switchPage?: any;
    guest?: any;
}

const ApiSetup: React.FC<ApiSetup> = ({ switchPage, guest }) => {
    const [state, setState] = React.useState({
        Api: '',
    });

    function handleChange(evt) {
        setState({ Api: evt.target.value });
    }

    const handleSave = async e => {
        e.preventDefault();

        localStorage.setItem('Api', state.Api);
        await saveKeysToLocalStorage();
        window.location.reload();
    };

    const handleRemove = e => {
        e.preventDefault();

        localStorage.removeItem('Api');
        window.location.reload();
    };

    return (
        <Container className="justify-content-between">
            <div className="d-flex pb-4 pr-4 justify-content-between">
                <h1 className="mb-0">CRM Plugin</h1>
                <Button
                    onClick={() => switchPage('default')}
                    className={classnames('align-self-end ml-4 p-0 my-auto', {
                        invisible: guest,
                    })}
                >
                    <CloseIcon />
                </Button>
            </div>
            <div className="d-flex flex-column pr-4">
                <Input
                    id="api"
                    label="Enter Api"
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
                        Remove
                    </Button>
                ) : (
                    <Button appearance="success" onClick={handleSave}>
                        Submit
                    </Button>
                )}
            </div>
            <p className="mb-0 pr-4">
                CRM Plugin to import Companies from Danish company register to
                Pipedrive
            </p>
        </Container>
    );
};

export default memo(ApiSetup);
