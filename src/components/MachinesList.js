import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import '../App.css';


const MachinesList = (props) => {
    let error = null;
    if(isNaN(parseInt(props.match.params.pageid)) || parseInt(props.match.params.pageid) > 72){
        error =  (
			<div>
                404 - Page Not Found 
            </div>
        );
    }

    console.log(props);
	const [ offset, setOffset ] = useState(parseInt(props.match.params.pageid)*20);
    const [ machineData, setMachineData ] = useState(undefined);
    let li = null;
    
    let items = [];

    const incrementOffset = async () => {
        setOffset(offset+20);
        props.location.pathname = '/machines/page/' + (parseInt(props.match.params.pageid) + 1).toString();
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
        
            <Link className='App-button-pagination' onClick={incrementOffset} to={`/machines/page/${parseInt(props.match.params.pageid) + 1}`}>
					Next
			</Link>
            
        );
        
    }
    if(offset >= 20 && offset < 72*20){
        items = [];
        items.push(
            
            <Link className='App-button-pagination' onClick={decrementOffset} to={`/machines/page/${parseInt(props.match.params.pageid) - 1}`}>
					Previous
			</Link>

        );
        items.push(

            <Link className='App-button-pagination' onClick={incrementOffset} to={`/machines/page/${parseInt(props.match.params.pageid) + 1}`}>
					Next
			</Link>
        );
        
    }
    if(offset === 72*20){
        items = [];
        items.push(
        
            <Link className='App-button-pagination' onClick={decrementOffset} to={`/machines/page/${parseInt(props.match.params.pageid) - 1}`}>
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
						const { data } = await axios.get(`https://pokeapi.co/api/v2/machine?offset=${offset}&limit=20`);
                        setMachineData(data.results);
					} catch (e) {
						console.log(e);
					}
			}
			fetchData();
		}, [offset]
	);

	

    const buildListItem = (machine) => {

		return (
			<span key={machine}>
                <Link to={`/machines/${machine}`} className='App-button-body'>
					Machine {machine}
				</Link>
			</span>
		);
    };
    
    
    
    let counter = offset;
    li =machineData && machineData.map((c) => {
                counter = counter + 1;
				return buildListItem(counter);
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

export default MachinesList;
