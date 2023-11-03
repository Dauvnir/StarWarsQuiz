import {filteredArray} from '../main.js';
const urlPart = 'https://swapi.dev/api/people/';
//--------------------------------------------------------------------------
let idsArray = [];
let arrNames = [];
let uniqueIdsArr = [];
let uniqueValue;
let randomIndexValue;
let urlArray = [];
let nameValuePairsArray = [];
let url;
let getRandomNum;
let peopleFilteredArray = [];
//--------------------------------------------------------------------------
const removeDuplicates = () => {
	idsArray.forEach((element) => {
		if (!uniqueIdsArr.includes(element) && element != 17) {
			uniqueIdsArr.push(element);
		}
	});
};

const getNumbers = () => {
	do {
		peopleFilteredArray = filteredArray;
		getRandomNum = Math.floor(Math.random() * 81 + 1);
		if (peopleFilteredArray.length > 75) {
			peopleFilteredArray = [];
		}
		if (peopleFilteredArray.includes(getRandomNum)) {
			while (peopleFilteredArray.includes(getRandomNum)) {
				getRandomNum = Math.floor(Math.random() * 81 + 1);
			}
			idsArray.push(getRandomNum);
		} else {
			idsArray.push(getRandomNum);
		}
		removeDuplicates(idsArray);
	} while (uniqueIdsArr.length <= 3);
};

const getNames = () => {
	for (let i = 0; i <= 3; i++) {
		url = `${urlPart}${uniqueIdsArr[i]}`;
		urlArray.push(url);
	}
};
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

async function finalDataPeopleMode() {
	clearData();
	getNumbers();
	getNames();
	await getData();
	randomValue();
}
//--------------------------------------------------------------------------
export {uniqueValue, finalDataPeopleMode, arrNames, nameValuePairsArray};
