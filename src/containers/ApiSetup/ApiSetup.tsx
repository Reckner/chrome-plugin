import React, { memo } from 'react';
import { Input, Button, Container } from '../../components';
import { CloseIcon } from '../../assets/images';

interface ApiSetup {
    switchPage: any;
}

const ApiSetup: React.FC<ApiSetup> = ({ switchPage }) => {
    return (
        <Container>
            <div className="d-flex pb-4 pr-4 align-items-center justify-content-end">
                <Button
                    onClick={() => switchPage('default')}
                    className="align-self-end ml-4 p-0 my-auto"
                >
                    <CloseIcon />
                </Button>
            </div>
            <div className="d-flex flex-column flex-fill justify-content-center pb-4 pr-4">
                <Input
                    id="search"
                    label="Enter Api"
                    name="search"
                    type="search"
                    containerClassName="w-100 mb-3"
                    className="shadow-sm"
                />
                <Button appearance="success">Submit</Button>
            </div>
        </Container>
    );
};

export default memo(ApiSetup);
