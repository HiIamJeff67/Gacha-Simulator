import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { count, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { AuthContext } from '../../Context/AuthContext';
import './CollectionLibrary.css';

import ArrowImg from '../../Images/arrow-point-to-right.png';
import CharacterStarGenerator1999 from '../SimulatorFor1999/GachaingDisplay1999/CharacterStarGenerator.jsx';
import CharacterStarGeneratorGenshin from '../SimulatorForGenshin/GachaingDisplayGenshin/CharacterStarGenerator.jsx';

const CollectionLibrary = () => {
	const stageTick = 500;
	const [currentStage, setCurrentStage] = useState(0);	// 0 * stageTick : 1999, 1 * stageTick : genshin
	const {currentUser} = useContext(AuthContext);
	const [currentGame, setCurrentGame] = useState('1999');

	const navigate = useNavigate();
	const [fetchingUserDataDone1999, setFetchingUserDataDone1999] = useState(false);
	const [userGuarantee1999, setUserGuarantee1999] = useState(0);
	const [userCardCollections1999, setUserCardCollections1999] = useState([]);
	const [userRareCollections1999, setUserRareCollections1999] = useState(0);


	const [fetchingUserDataDoneGenshin, setFetchingUserDataDoneGenshin] = useState(false);
	const [userGuaranteeGenshin, setUserGuaranteeGenshin] = useState(0);
	const [userCardCollectionsGenshin, setUserCardCollectionsGenshin] = useState([]);
	const [userRareCollectionsGenshin, setUserRareCollectionsGenshin] = useState(0);

	const chr1999ImageContext = require.context('../../Images/1999ImgSrc', false, /\.(webp)$/);
	const chrGenshinImageContext = require.context('../../Images/GenshinImgSrc', false, /\.(png)$/);

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

		const getUserRecord1999 = async () => {
			try {
				const res = await getDoc(doc(db, `userPulls1999`, currentUser.uid));
				if (res.exists()) {
					setUserGuarantee1999(res.data().guarantee);
					setUserCardCollections1999(res.data().pulls);
					setFetchingUserDataDone1999(true);
				}
			} catch (err) {
				console.log(`Failed to Connected to the firebase database or the data does not exist : ${err}`);
			}
		};

		const getUserRecordGenshin = async () => {
			try {
				const res = await getDoc(doc(db, `userPullsGenshin`, currentUser.uid));
				if (res.exists()) {
					setUserGuaranteeGenshin(res.data().guarantee);
					setUserCardCollectionsGenshin(res.data().pulls);
					setFetchingUserDataDoneGenshin(true);
				}
			} catch (err) {
				console.log(`Failed to Connected to the firebase database or the data does not exist : ${err}`);
			}
		};

		const renderProcess = async () => {
			await getUserRecord1999();
			await getUserRecordGenshin();
		}
		renderProcess();
	},[]);

	useEffect(() => {
		const getUserRareChrAmount1999 = () => {
			let count = 0;
			for (const pull of userCardCollections1999) {
				if (pull.star === 6) {
					count++;
				}
			}
			setUserRareCollections1999(count);
		}
		getUserRareChrAmount1999();
	}, [userCardCollections1999]);

	useEffect(() => {
		const getUserRareChrAmountGenshin = () => {
			let count = 0;
			for (const pull of userCardCollectionsGenshin) {
				if (pull.star === 5) {
					count++;
				}
			}
			setUserRareCollectionsGenshin(count);
		}
		getUserRareChrAmountGenshin();
	},[userCardCollectionsGenshin]);

  return (
    <div className='library-container'>
        <div className='record-top-bar'>
            <div className='game-switcher'>
                <button className='switch-left-btn' 
					onClick={() => {
						setCurrentStage(stageTick);
						setCurrentGame('Genshin');
					}}>
                    <img src={ArrowImg} alt=""/>
                </button>
                <div className='game-name-container'>
                    <div className="game-name" style={game1999NameStyle}>Reversed 1999</div>
                    <div className="game-name" style={gameGenshinNameStyle}>Genshin Impact</div>
                </div>
                <button className='switch-right-btn' 
					onClick={() => {
						setCurrentStage(0);
						setCurrentGame('1999');
					}}>
                    <img src={ArrowImg} alt=""/>
                </button>
            </div>
            <div className='total-item-amount'>
							<div className='total-item-amount-title'>總抽數</div>
							<span className='sep'>:</span>
							<div className='total-item-amount-details'>
								{(currentGame === '1999') && userCardCollections1999.length}
								{(currentGame === 'Genshin') && userCardCollectionsGenshin.length}
							</div>
						</div>
						<div className='rare-chr-amount'>
							<div className='rare-chr-amount-title'>最高稀有度角色數</div>
							<span className='sep'>:</span>
							<div className='rare-chr-amount-details'>
								{(currentGame === '1999') && userRareCollections1999}
								{(currentGame === 'Genshin') && userRareCollectionsGenshin}
							</div>
						</div>
            <div className='distance-to-prevGuarantee'>
							<div className='distance-to-prevGuarantee-title'>距離上次限定保底</div>
							<span className='sep'>:</span>
							<div className='distance-to-prevGuarantee-details'>
								{(currentGame === '1999') && userGuarantee1999}
								{(currentGame === 'Genshin') && userGuaranteeGenshin}
							</div>
						</div>
        </div>
        <div className='card-display-area'>
					{(currentGame === '1999') && fetchingUserDataDone1999 &&
						 <div className='card-display-1999'>
								{userCardCollections1999.map((card, index) => {
									if (!card.name || !card.star || !card.data) return;
									return (
										<div className='card-1999' key={index}>
											<img className='card-img-1999' src={chr1999ImageContext(`./${card.name}.webp`)} alt="" />
											<div className='card-name-1999'>
												<div className='card-star-1999'>
													<CharacterStarGenerator1999 generateNum={card.star}/>
												</div>
												{card.name}
											</div>
										</div>)
								})}
						</div>}
					{(currentGame === 'Genshin') && fetchingUserDataDoneGenshin &&
					 	<div className='card-display-genshin'>
							{userCardCollectionsGenshin.map((card, index) => {
									if (!card.name || !card.star || !card.data) return;
									return (
										<div className='card-genshin' key={index}>
											<img className='card-img-genshin' src={chrGenshinImageContext(`./${card.name}.png`)} alt="" />
											<div className='card-name-genshin'>
												<div className='card-star-genshin'>
													<CharacterStarGeneratorGenshin generateNum={card.star}/>
												</div>
												{card.name}
											</div>
										</div>)
								})}
						</div>}
        </div>
    </div>
  )

}

export default CollectionLibrary