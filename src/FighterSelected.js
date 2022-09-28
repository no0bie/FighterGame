import React, { useEffect, useState} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";

const FighterSelect = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    let selFighter;
    let red = false;

    try{
        selFighter = location.state.stateFighter;
    }
    catch{
        red = true;
    }

    // 0 - id, 1 - name, 2 - level, 2 - vicories, 3 - losses
    selFighter = selFighter.split(";");

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    let isOwner = false;

    const [btnVis, setBtnVis] = useState("none");
    const [owner, setOwner] = useState(false);
    
    const checkOwnership = async () => {
        isOwner = await contract.isOwner(selFighter[0])
        if (isOwner){
            setOwner(true);
            setBtnVis("visible");
        }
        else{
            setOwner(false);
            setBtnVis("hidden");
        }
    }

    useEffect(() => {
        checkOwnership();
    }, [])

    
    if (red){
        return <Navigate to="/" />
    }

    


    window.ethereum.on('accountsChanged', () => {
        window .ethereum.request({method: 'eth_requestAccounts'})
        .then( () => {
            console.log("Account changed");
            checkOwnership();
            console.log(isOwner)
        })
    });

    const fight = (_id, _name) => {
        console.log(isOwner)
        if (owner){
            navigate('/enemies', {state :{selFighterId : _id, selFighterName: _name}});
        }
    }

    return (
        <div>
        <table className="cell">
        <tbody><tr>
            <td className="pj">
            <div id="swf_perso" className="swf transparent" style={{width : "100px", height : "175px"}}>
                    <img src="img_avatar.png" style={{width : "100%", height: "100%"}} />
                </div>
            </td>
            <td className="sheet">
                <div className="level">
                    <img src="/img/inv.gif" /> {selFighter[2]} 
                </div>
                <h2>{selFighter[1]}</h2>
                <table>
                    <tbody><tr>
                    <td className="essent">
                        <p><img src="/img/victory.png" /> Victories: {selFighter[3]}</p>
                        <p><img src="/img/lossess.png" /> Losses: {selFighter[4]}</p>
                        </td>
                        <p>Experiencia: 0 / 3</p><div className="levelBarContainer">
                        <div style={{width: "0px"}} className="levelBar"></div>
                        </div>
                        </tr></tbody></table>
                        <ul className="actions">
                        <li>
                        {}
                        <button style={{visibility: btnVis}} onClick={() => fight(selFighter[0], selFighter[1])} className="button4">Fight</button>
            </li></ul></td></tr>
            </tbody></table>
            <div style={{display: "flex", }}>
                <button>Atras</button>
                <button>Siguiente</button>
            </div>
            </div>
            
        );
}

export default FighterSelect;