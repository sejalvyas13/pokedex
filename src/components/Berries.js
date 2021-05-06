import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Berries = (props) => {
	const [ errorData, setError ] = useState(null);
	const [ berryData, setBerryData ] = useState(undefined);
	useEffect(
		() => {
			async function fetchData() {
				try {
					const { data: berry } = await axios.get(`https://pokeapi.co/api/v2/berry/${props.match.params.id}`);
					setBerryData(berry);
					console.log(berry);
				} catch (e) {
                    console.log(e);
                    setError(e);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);

	
    console.log("error is " +  errorData);
    if(errorData!= null){
        return(
            <div className='show-body'>
                404 - Not found
            </div>
        );
        
    }

    else{
        return (
            <div className='show-body'>
                <h1 className='cap-first-letter'>{berryData && berryData.name}</h1>
                <br />
                
                <p>
                    <span className='title'>ID: </span>
                    {berryData && berryData.id}
                    <br />
                    <span className='title'>Firmness:</span> {berryData && berryData.firmness.name}
                    <br />
                    <span className='title'>Growth time: </span>
                    {berryData && berryData.growth_time}
                    <br />
                    <br/>

                    <span className='title'>Flavors</span>:
                    <dl className='list-unstyled'>
                        {berryData &&
                            berryData.flavors.map((flavor) => {
                                return (<dt key={flavor.flavor.name}>{flavor.flavor.name} : {flavor.potency}
                                </dt>);
                        })}
                    </dl>

                    <span className='title'>Smoothness:</span> {berryData && berryData.smoothness} <br />
                    <br />
                    <span className='title'>Natural gift power:</span> {berryData && berryData.natural_gift_power}
                    <br />
                </p>
                
            </div>
        );
    }

};

export default Berries;
