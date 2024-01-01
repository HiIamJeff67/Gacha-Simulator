import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { AuthContext } from '../../Context/AuthContext';
import './CollectionLibrary.css';

import ArrowImg from '../../Images/arrow-point-to-right.png';
import CharacterStarGenerator from '../SimulatorFor1999/GachaingDisplay1999/CharacterStarGenerator.jsx';

const CollectionLibrary = () => {
	const stageTick = 500;
	const [currentStage, setCurrentStage] = useState(0);
	const {currentUser} = useContext(AuthContext);

	const navigate = useNavigate();
	const [fetchingUserDataDone, setFetchingUserDataDone] = useState(false);
	const [userGuarantee, setUserGuarantee] = useState(0);
	const [userCardCollections, setUserCardCollections] = useState([]);
	const [userRareCollections, setUserRareCollections] = useState(0);

	const chr1999ImageContext = require.context('../../Images/1999ImgSrc', false, /\.(webp)$/);

	const game1999NameStyle = {
		transform: `translateX(${(stageTick * 0) - currentStage}%)`
	}
	const gameGenshinNameStyle = {
		transform: `translateX(${(stageTick * 1) - currentStage}%)`
	}

	useEffect(() => {
		if (currentUser === null) {
			navigate('/');
			return;
		}

		const getUserRecord = async () => {
			try {
				const res = await getDoc(doc(db, "userPulls1999", currentUser.uid));
				if (res.exists()) {
					setUserGuarantee(res.data().guarantee);
					setUserCardCollections(res.data().pulls);
					setFetchingUserDataDone(true);
				}
			} catch (err) {
				console.log(`Failed to Connected to the firebase database or the data does not exist : ${err}`);
			}
		};

		const renderProcess = async () => {
			await getUserRecord();
		}
		renderProcess();
	},[]);

	useEffect(() => {
		const getUserRareChrAmount = () => {
			let count = 0;
			for (const pull of userCardCollections) {
				if (pull.star === 6) {
					count++;
				}
			}
			setUserRareCollections(count);
		}
		getUserRareChrAmount();
	}, [userCardCollections])

  return (
    <div className='library-container'>
        <div className='record-top-bar'>
            <div className='game-switcher'>
                <button className='switch-left-btn' onClick={() => {setCurrentStage(stageTick)}}>
                    <img src={ArrowImg} alt=""/>
                </button>
                <div className='game-name-container'>
                    <div className="game-name" style={game1999NameStyle}>Reversed 1999</div>
                    <div className="game-name" style={gameGenshinNameStyle}>Genshin Impact</div>
                </div>
                <button className='switch-right-btn' onClick={() => {setCurrentStage(0)}}>
                    <img src={ArrowImg} alt=""/>
                </button>
            </div>
            <div className='total-item-amount'>
							<div className='total-item-amount-title'>總抽數</div>
							<span className='sep'>:</span>
							<div className='total-item-amount-details'>{userCardCollections.length}</div>
						</div>
						<div className='rare-chr-amount'>
							<div className='rare-chr-amount-title'>最高稀有度角色數</div>
							<span className='sep'>:</span>
							<div className='rare-chr-amount-details'>{userRareCollections}</div>
						</div>
            <div className='distance-to-prevGuarantee'>
							<div className='distance-to-prevGuarantee-title'>距離上次限定保底</div>
							<span className='sep'>:</span>
							<div className='distance-to-prevGuarantee-details'>{userGuarantee}</div>
						</div>
        </div>
        <div className='card-display-area'>
					{((stageTick * 0) - currentStage) === 0 
						? <div className='card-display-1999'>
								{userCardCollections.map((card, index) => {
									if (!card.name || !card.star || !card.data) return;
									return (
										<div className='card-1999' key={index}>
											<img className='card-img-1999' src={chr1999ImageContext(`./${card.name}.webp`)} alt="" />
											<div className='card-name-1999'>
												<div className='card-star-1999'>
													<CharacterStarGenerator generateNum={card.star}/>
												</div>
												{card.name}
											</div>
										</div>)
								})}
						</div> 
						: <div className='card-display-genshin'>
							all genshin character here
						</div>}
        </div>
    </div>
  )

}

export default CollectionLibrary