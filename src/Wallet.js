import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [connectBtnText, setConnectBtnText] = useState('Login with Metamask');

    const history = useNavigate();

    const connectMetaHandler = () => {
        if (window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(accounts => {
                accountHandler(accounts[0]);
            })
            .catch(err => {
                setErrorMessage(err.message);
            });
        }
        else {
            setErrorMessage('Please install Metamask');
        }
    }

    const accountHandler = async newAccount => {
        history('/menu', {state:
            {
                account: newAccount,
            }
        })
    }
    
    return (
        <div className="centered">
            <div className="wallet-login">
                <h4>Login with Metamask</h4>
                <button onClick={connectMetaHandler}>Login with Metamask</button>
            </div>
            {errorMessage}
        </div>
    );
}

export default Wallet;