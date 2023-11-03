import {filteredArray} from '../main.js';
const ids = [5, 9, 10, 11, 12, 13, 15, 21, 22, 23, 27, 28, 29, 31, 39, 40, 41, 43, 47, 48];
const urlPart = 'https://swapi.dev/api/starships/';
//--------------------------------------------------------------------------
let idsArray = [];
let uniqueIdsArr = [];
let urlArray = [];
let nameValuePairsArray = [];
let arrNames = [];
let randomIndexValue;
let uniqueValue;
let url;
let getRandomNum;
let starshipsFilteredArray = [];
const getNumbers = () => {
	do {
		starshipsFilteredArray = filteredArray;
		getRandomNum = Math.floor(Math.random() * ids.length);
		if (starshipsFilteredArray.length > 16) {
			starshipsFilteredArray = [];
		}
		if (starshipsFilteredArray.includes(ids[`${getRandomNum}`])) {
			while (starshipsFilteredArray.includes(ids[`${getRandomNum}`])) {
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

async function finalDataStarshipsMode() {
	clearData();
	getNumbers();
	getNames();
	await getData();
	randomValue();
}
//--------------------------------------------------------------------------

export {arrNames, finalDataStarshipsMode, uniqueValue, nameValuePairsArray};
