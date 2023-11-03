import {filteredArray} from '../main.js';
const ids = [4, 6, 7, 8, 14, 16, 18, 19, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38, 42];
const urlPart = 'https://swapi.dev/api/vehicles/';
//--------------------------------------------------------------------------

let idsArray = [];
let uniqueIdsArr = [];
let urlArray = [];
let nameValuePairsArray = [];
let arrNames = [];
let randomIndexValue;
let uniqueValue;
let url;
let vehiclesFilteredArray = [];
let getRandomNum;
//--------------------------------------------------------------------------

const getNumbers = () => {
	do {
		vehiclesFilteredArray = filteredArray;
		getRandomNum = Math.floor(Math.random() * ids.length);
		if (vehiclesFilteredArray.length > 16) {
			vehiclesFilteredArray = [];
		}
		if (vehiclesFilteredArray.includes(ids[`${getRandomNum}`])) {
			while (vehiclesFilteredArray.includes(ids[`${getRandomNum}`])) {
				getRandomNum = Math.floor(Math.random() * ids.length);
			}
			idsArray.push(ids[`${getRandomNum}`]);
		} else {
			idsArray.push(ids[`${getRandomNum}`]);
		}
		removeDuplicates(idsArray);
	} while (uniqueIdsArr.length <= 3);
};

const removeDuplicates = () => {
	idsArray.forEach((element) => {
		if (!uniqueIdsArr.includes(element)) {
			uniqueIdsArr.push(element);
		}
	});
};
getNumbers();
const getNames = () => {
	for (let i = 0; i <= 3; i++) {
		url = `${urlPart}${uniqueIdsArr[i]}`;
		urlArray.push(url);
	}
};
getNames();

async function getData() {
	try {
		const dataArray = await Promise.all(
			urlArray.map(async (url) => {
				try {
					let response = await fetch(url);
					return response.json();
				} catch (error) {
					do {
						response = await fetch(url);
						return response.json();
					} while (!response.ok);
				}
			})
		);
		arrNames = dataArray.map((element) => {
			return element.name;
		});
		for (let i = 0; i < arrNames.length; i++) {
			let nameValuePairs = {
				name: arrNames[i],
				value: uniqueIdsArr[i],
			};
			nameValuePairsArray.push(nameValuePairs);
		}
		return arrNames;
	} catch (error) {
		console.error(error);
	}
}

const randomValue = () => {
	randomIndexValue = Math.floor(Math.random() * 4);
	uniqueValue = uniqueIdsArr[randomIndexValue];
	return uniqueValue;
};

const clearData = () => {
	url = null;
	idsArray = [];
	uniqueIdsArr = [];
	urlArray = [];
	arrNames = [];
	uniqueValue = null;
	randomIndexValue = null;
	nameValuePairsArray = [];
};

async function finalDataVehiclesMode() {
	clearData();
	getNumbers();
	getNames();
	await getData();
	randomValue();
}
//--------------------------------------------------------------------------

export {arrNames, finalDataVehiclesMode, uniqueValue, nameValuePairsArray};
