import { useEffect, useState } from 'react'
import StarFor1999 from '../StarFor1999/StarFor1999'
import './ProbabilityDisplay1999.css'
import { useParams } from 'react-router-dom';

const API_BASE = "https://gacha-simulator-backend.vercel.app";

const ProbabilityDisplay1999 = () => {
		const [chrInfo, setChrInfo] = useState(null);
    const [rateUpChrInfo, setRateUpChrInfo] = useState([]);
    const { poolIndex } = useParams();

    useEffect(() => {
      const fetchRateUpChrs = async function() {
        try {
          const response = await fetch('/PoolData1999.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch JSON, status: ${response.status}`);
          }

          const jsonData = await response.json();
          setRateUpChrInfo(jsonData.character[poolIndex - 1].rateUpChr);
        } catch (err) {
          console.error(`Error during fetching curPoolData from public json file: ${err.message}`);
        }
      }
      fetchRateUpChrs();
			const abortController = new AbortController();
			getAllChrs(abortController);

			return () => {
				abortController.abort();
			}
    },[])

		// useEffect(() => {
		// 	console.log(chrInfo);
		// },[chrInfo])

    const getAllChrs = function(abortController) {
        fetch(API_BASE + "/allChrs", { signal : abortController.signal })
            .then(res => res.json())
            .then(data => {
							setChrInfo(data);
            })
            .catch(error => {
							if (error === "AbortError") {
								console.log(`Use Abort to debug twice fetch : ${error}`);
							}
							else {
								console.log(`Error during generate all characters : ${error}`);
							}
            })
    }

  return (
    <div className='table-1999-container'>
      <table className='table-1999'>
        <thead>
          <tr>
              <th>
								<span className='table-1999-star-title'>Star</span>
								<span className='table-1999-star-title-alt'><StarFor1999/></span>
							</th>
              <th>Character Name</th>
              <th>Rate <div className='small-title'>(three decimal places)</div></th>
          </tr>
        </thead>
        <tbody className='tbody-1999'>
          {chrInfo && chrInfo.map((chrData, index) => {
						return (
							<tr key={`index-${index}`}>
								<td className='table-star-1999'>{chrData.star} <StarFor1999/></td>
								<td className={`table-chr-1999 ${((chrData.name === "當期限定角色") || rateUpChrInfo.includes(chrData.name)) ? "rateUp-chr" : ""}`}>
                  {(chrData.name === "當期限定角色") ? rateUpChrInfo[0] : chrData.name}
                </td>
								<td className='table-rate-1999'>{Math.round((chrData.rateEnd - chrData.rateStart) * 1000) / 1000} %</td>
							</tr>)
					})}
        </tbody>
      </table>
    </div>
  )
}

export default ProbabilityDisplay1999