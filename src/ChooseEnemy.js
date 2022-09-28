import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS} from './config';
import { useState, useEffect } from "react"

const ChooseEnemy = () => {
    const location = useLocation();
    let selFighterId, selFighterName;
    let red = false;

    try{
        selFighterId = location.state.selFighterId;
        selFighterName = location.state.selFighterName;
    }
    catch{
        red = true;
    }

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner();
    let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const [enemies, setEnemies] = useState(["Loading;Loading;Loading;Loading;Loading"]);
    
    useEffect( async () =>  {
        let enemiesRaw = (await contract.getEnemies(selFighterId));
        let enemiesParsed = [];
        let enemiesInfo = [];

        if (enemiesRaw.length > 0){

            for (let i = 0; i < enemiesRaw.length; i++){
                enemiesParsed.push(parseInt(enemiesRaw[i]._hex, 16));
            }

            let iters = (enemiesRaw.length >= 6 ? 6 : enemiesRaw.length);

            for (let i = 0; i < iters; i++){
                let randNumber = Math.floor(Math.random() * enemiesParsed.length);
                let id = enemiesParsed[randNumber];
                let info = await contract.getFighterInformation(id);
                enemiesInfo.push(id + ";" + info);
                enemiesParsed.splice(randNumber,1);
            }
            setEnemies(enemiesInfo);
        }
        else{
            setEnemies([";No enemies found for your level"])
        }
    }, []) 

    const enemySelect = async (_id, _name) => {
        let fighters = [`${selFighterId};${selFighterName}`, `${_id};${_name}`]
        let winner = await contract.fight(selFighterId, _id);
        console.log(fighters[parseInt(winner.value, 16)]);
    }

    // 0 - id; 1 - name; 2 - level; 3 - victories; 4 - losses

    return (
        <div className="centered">
            <div className="enemies">
                {enemies.map((enemy) => (
                    <div key={enemy}>
                        <div className="fighter-card" onClick={(e) => (enemySelect(enemy.split(";")[0], enemy.split(";")[1]))} key={enemy}>
                            <img src="img_avatar.png" alt="avatar" style={{width: "100%"}} />
                            <div className="container">
                            <h4><b>{enemy.split(";")[1]}</b></h4>
                            <p>Level: {enemy.split(";")[2]}</p>
                            <p>Victories: {enemy.split(";")[3]}</p>
                            <p>Losses: {enemy.split(";")[4]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a href="/fighter">Back</a>
        </div>
    );
}

export default ChooseEnemy;