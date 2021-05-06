import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';


const PokeList = (props) => {
    let error = null;
    if(isNaN(parseInt(props.match.params.pageid)) || parseInt(props.match.params.pageid) > 48){
        error =  (
			<div>
                404 - Page Not Found 
            </div>
        );
    }

    console.log(props);
	const [ offset, setOffset ] = useState(parseInt(props.match.params.pageid)*20);
    const [ pokeData, setPokeData ] = useState(undefined);
    let li = null;
    let items = [];

    console.log("History action is " + props.history.action);

    if(offset != parseInt(props.match.params.pageid)*20){
        setOffset(parseInt(props.match.params.pageid)*20);
        console.log("Just ?");
    }


    const incrementOffset = async () => {
        setOffset(offset+20);
        //props.location.pathname = '/pokemon/page/' + (parseInt(props.match.params.pageid) + 1).toString();
        props.match.params.pageid = parseInt(props.match.params.pageid) + 1;
    };
    
    const decrementOffset = async () => {
        if(offset >= 20){
            setOffset(offset-20);
            props.match.params.pageid = parseInt(props.match.params.pageid) - 1;
        }
    };
    console.log("props pageid is " + parseInt(props.match.params.pageid));
    console.log("offset is " + offset);
    if(isNaN(offset) && parseInt(props.match.params.pageid) === 0){
        setOffset(0);
    }
    if(offset === 0){
        items = [];
        items.push(
        
            <Link className='App-button-pagination' onClick={incrementOffset} to={`/pokemon/page/${parseInt(props.match.params.pageid) + 1}`}>
					Next
			</Link>
            
        );
        
    }
    if(offset >= 20 && offset < 48*20){
        items = [];
        items.push(
            
            <Link className='App-button-pagination' onClick={decrementOffset} to={`/pokemon/page/${parseInt(props.match.params.pageid) - 1}`}>
					Previous
			</Link>

        );
        items.push(

            <Link className='App-button-pagination' onClick={incrementOffset} to={`/pokemon/page/${parseInt(props.match.params.pageid) + 1}`}>
					Next
			</Link>
        );
        
    }
    if(offset === 48*20){
        items = [];
        items.push(
        
            <Link className='App-button-pagination' onClick={decrementOffset} to={`/pokemon/page/${parseInt(props.match.params.pageid) - 1}`}>
					Previous
			</Link>
            
        );
        
    }


    const paginationBasic = (
    <div>
        {items}
    </div>
    );



	useEffect(
		() => {
			console.log('render');
			async function fetchData() {
					try {
						const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
                        setPokeData(data.results);
					} catch (e) {
						console.log(e);
					}
			}
			fetchData();
		}, [offset]
    );
    
    

	

    const buildListItem = (pokemon) => {

		return (
			<span key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.name}`} className='App-button-body'>
					{pokemon.name}
				</Link>
			</span>
		);
	};
    
    li =pokeData && pokeData.map((pokemon) => {
				return buildListItem(pokemon);
        });
            
    if(error!== null){
        return (
            <div className='App-body'>
                {error}
            </div>);
    }

    else{
        return (
            <div className='App-body'>
                <div className='list-unstyled'>{li}</div>
                <div>
                    {paginationBasic}
                </div>
            </div>
        );
    }
	
};

export default PokeList;
