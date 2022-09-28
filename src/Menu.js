import React, { useEffect, useState} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS} from './config';

const Menu = () => {    
    
    const location = useLocation();
    const navigate = useNavigate();
    let tmpAccount;
    let red = false;

    try{
        tmpAccount = location.state.account;
    }
    catch{
        red = true;
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();

    //const [provider, setProvider] = useState();
    //const [signer, setSigner] = useState();
    const [contract, setContract] = useState(new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer));
    const [account, setAccount] = useState(tmpAccount);
    const [ownedFighters, setOwnedFighters] = useState(["Loading;Loading"]);

    useEffect( async () =>  {
        let fightersRaw = (await contract.getFighterByOwner(tmpAccount)).split(",");
        fightersRaw.splice(-1);
        setOwnedFighters(fightersRaw);
    }, []) 

    if (red){
        return <Navigate to="/" />
    }

    window.ethereum.on('accountsChanged', () => {
        window.ethereum.request({method: 'eth_requestAccounts'})
        .then(accounts => {
            accountChangedHandler(accounts[0]);
        })
    });

    const accountChangedHandler = async newAccount => {
        setAccount(newAccount);;
        updateEthers(newAccount);
    }

    const updateEthers = async newAccount => {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        //setProvider(tempProvider);

        signer = provider.getSigner();
        //setSigner(tempSigner);

        let  tempContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(tempContract);

        getAccountFighters(newAccount, tempContract);
    }

    const getAccountFighters = async newAccount => {
        let fightersRaw = (await contract.getFighterByOwner(newAccount)).split(',');
        fightersRaw.splice(-1)
        setOwnedFighters(fightersRaw);
    }

    const fighterSelect = id => {
        navigate('/fighter', {state: { stateAccount: account, stateFighter: id}});
    }
    
    const createFighter = async e => {
        e.preventDefault();
        let tx = await contract.mintFighter(e.target.mintName.value);
        await tx.wait();
        getAccountFighters(account, contract);
    }

    return (
        <div>
            <div className="account-display">    
                <h3>Account: {account.split('').splice(0,6).join('') + "..." + tmpAccount.split('').splice(-6).join('')}</h3>
                <button onClick={() => (navigate('/'))}>Logout</button>
            </div>
                <div className="cards centered">
                {ownedFighters.map((fighter) => (
                    <div key={fighter}>
                        <div className="fighter-card" onClick={() => (fighterSelect(fighter))} key={fighter}>
                            <img src="img_avatar.png" alt="avatar" style={{width: "100%"}} />
                            <div className="container">
                            <h4><b>{fighter.split(';')[1]}</b></h4>
                            <p>Level: {fighter.split(';')[2]}</p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                <form className="centered" onSubmit={createFighter}>
                    <input id="mintName"></input>
                    <button type="submit">New Fighter</button>
                </form>
        </div>
    );
}

export default Menu 