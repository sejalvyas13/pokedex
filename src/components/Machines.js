import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Machine = (props) => {
	const [ errorData, setError ] = useState(null);
	const [ machineData, setmachineData ] = useState(undefined);
	useEffect(
		() => {
			async function fetchData() {
				try {
					const { data: machine } = await axios.get(`https://pokeapi.co/api/v2/machine/${props.match.params.id}`);
					setmachineData(machine);
					console.log(machine);
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
                <h1 className='cap-first-letter'>Machine {machineData && machineData.id}</h1>
                <br />
                <p>
                    <span className='title'>ID: </span>
                    {machineData && machineData.id}
                    <br />
                    <span className='title'>Move:</span> {machineData && machineData.move && machineData.move.name}
                    <br />
                    <span className='title'>Item:</span> {machineData && machineData.item && machineData.item.name}
                    <br />
                    <span className='title'>Version: </span>
                    {machineData && machineData.version_group.name}
                    <br />
                </p>
                
            </div>
        );
    }

};

export default Machine;
