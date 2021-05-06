import React, { useState, useEffect } from 'react';
import axios from 'axios';
import noImage from '../img/download.png';

const Pokemon = (props) => {
	const [ errorData, setError ] = useState(null);
	const [ pokeData, setPokeData ] = useState(undefined);
	useEffect(
		() => {
			async function fetchData() {
				try {
					const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`);
					setPokeData(pokemon);
					console.log(pokemon);
				} catch (e) {
                    console.log(e);
                    setError(e);
				}
			}
			fetchData();
		},
		[ props.match.params.id ]
	);

	

	let img = null;
	if (pokeData && pokeData.sprites.front_default) {
		img = <img alt='Show' src={pokeData.sprites.front_default} />;
    }
    else {
	 	img = <img alt='Show' src={noImage} />;
    }
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
                <h1 className='cap-first-letter'>{pokeData && pokeData.name}</h1>
                <br />
                {img}
                <br />
                <p>
                    <span className='title'>ID: </span>
                    {pokeData && pokeData.id}
                    <br />
                    <span className='title'>Species:</span> {pokeData && pokeData.species && pokeData.species.name}
                    <br />
                    <span className='title'>Base Experience: </span>
                    {pokeData && pokeData.base_experience}
                    <br />
                    <span className='title'>Order:</span> {pokeData && pokeData.order} <br />
                    <br />
                    <span className='title'>Weight:</span> {pokeData && pokeData.weight}
                    <br />
                </p>
                
            </div>
        );
    }

};

export default Pokemon;
