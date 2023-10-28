```javascript
import React from 'react';
import axios from 'axios';

class Security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            encryptedCommunication: false,
            accessControl: false
        };
    }

    componentDidMount() {
        this.checkSecurityStatus();
    }

    checkSecurityStatus = async () => {
        try {
            const response = await axios.get('/api/security');
            this.setState({
                encryptedCommunication: response.data.encryptedCommunication,
                accessControl: response.data.accessControl
            });
        } catch (error) {
            console.error('Error fetching security status', error);
        }
    }

    render() {
        const { encryptedCommunication, accessControl } = this.state;

        return (
            <div id="security">
                <h2>Security Status</h2>
                <div>
                    <h3>Secure Communication: {encryptedCommunication ? 'Enabled' : 'Disabled'}</h3>
                    <h3>Access Control: {accessControl ? 'Enabled' : 'Disabled'}</h3>
                </div>
            </div>
        );
    }
}

export default Security;
```