import {uniqueValue, arrNames, hallOfFameScores} from './main.js';
//--------------------------------------------------------------------------
const menuOptions = document.querySelectorAll(
	'.peopleOptionB, .starshipsOptionB, .vehiclesOptionB'
);

const peopleOption = document.querySelector('.peopleOptionB');
const starshipsOption = document.querySelector('.starshipsOptionB');
const vehiclesOption = document.querySelector('.vehiclesOptionB');
const headerMode = document.querySelector('.descriptionHeader');
const answers = document.querySelector('.answers');
const settingBtn = document.querySelector('.settingBtn');
const answerBtns = document.querySelectorAll('.buttonAnswer');
const imgStarWars = document.querySelector('.swImage');
const playButton = document.querySelector('.playButton');
const lightSaber = document.querySelector('.saber');
const descriptionMode = headerMode.nextElementSibling;
const buttons = playButton.parentElement;
const firstRanking = document.querySelector('.firstRanking');
const rankingBtn = document.querySelectorAll('.firstRanking, .secondRanking');
const descriptionHallMode = document.querySelectorAll(
	'.descriptionModeRules, .descriptionHallOfFame'
);

//--------------------------------------------------------------------------
let data = null;
let nameMode;

//--------------------------------------------------------------------------
menuOptions.forEach((currentValue, currentIndex) => {
	currentValue.addEventListener('click', async () => {
		sessionStorage.setItem('mode', currentIndex);
		data = sessionStorage.getItem('mode');
		nameModes();
		changeMode();
		headerModeChange();
		changeRankingDependsOnMode();
		return data;
	});
});
//--------------------------------------------------------------------------
function nameModes() {
	try {
		if (data == '0') {
			nameMode = 'people';
			return nameMode;
		} else if (data == '1') {
			nameMode = 'vehicles';
			return nameMode;
		} else if (data == '2') {
			nameMode = 'starships';
			return nameMode;
		}
	} catch (error) {
		console.error(error);
	}
}
const changeMode = () => {
	if (data == '0') {
		peopleOption.querySelector('.border').classList.add('activeIndicator');
		peopleOption.style.color = 'black';

		vehiclesOption.querySelector('.border').classList.remove('activeIndicator');
		starshipsOption.querySelector('.border').classList.remove('activeIndicator');
		vehiclesOption.style.color = 'grey';
		starshipsOption.style.color = 'grey';
	} else if (data == '1') {
		vehiclesOption.querySelector('.border').classList.add('activeIndicator');
		vehiclesOption.style.color = 'black';

		peopleOption.querySelector('.border').classList.remove('activeIndicator');
		starshipsOption.querySelector('.border').classList.remove('activeIndicator');
		starshipsOption.style.color = 'grey';
		peopleOption.style.color = 'grey';
	} else if (data == '2') {
		starshipsOption.querySelector('.border').classList.add('activeIndicator');
		starshipsOption.style.color = 'black';

		peopleOption.querySelector('.border').classList.remove('activeIndicator');
		vehiclesOption.querySelector('.border').classList.remove('activeIndicator');
		peopleOption.style.color = 'grey';
		vehiclesOption.style.color = 'grey';
	} else {
		peopleOption.style.color = 'grey';
		vehiclesOption.style.color = 'grey';
		starshipsOption.style.color = 'grey';
		peopleOption.querySelector('.border').classList.remove('activeIndicator');
		vehiclesOption.querySelector('.border').classList.remove('activeIndicator');
		starshipsOption.querySelector('.border').classList.remove('activeIndicator');
	}
};

const headerModeChange = () => {
	if (data == '0') {
		headerMode.textContent = 'MODE: Who is this character?';
	} else if (data == '1') {
		headerMode.textContent = 'MODE: Which vehicle is this?';
	} else if (data == '2') {
		headerMode.textContent = 'MODE: Which starships is this?';
	} else {
		headerMode.textContent = 'Choose your MODE Young Jedi !';
		imgStarWars.src = 'imgUi/jajar.jpg';
	}
};

const changeText = () => {
	answerBtns.forEach(async (btn, index) => {
		btn.innerHTML = arrNames[index];
	});
	imgStarWars.src = `./img/modes/${nameMode}/${uniqueValue}.jpg`;
};
const dissapearBtns = () => {
	descriptionMode.style.display = 'none';
	buttons.style.display = 'none';
	answers.style.display = 'flex';
	settingBtn.style.display = 'none';
	lightSaber.style.display = 'flex';
};
const showBtns = () => {
	descriptionMode.style.display = 'block';
	buttons.style.display = 'flex';
	answers.style.display = 'none';
	settingBtn.style.display = 'block';
	lightSaber.style.display = 'none';
	data = null;
};
const blockBtns = () => {
	if (data == '0') {
		vehiclesOption.disabled = true;
		starshipsOption.disabled = true;
	} else if (data == '1') {
		peopleOption.disabled = true;
		starshipsOption.disabled = true;
	} else if (data == '2') {
		vehiclesOption.disabled = true;
		peopleOption.disabled = true;
	} else {
		peopleOption.disabled = false;
		starshipsOption.disabled = false;
		vehiclesOption.disabled = false;
	}
};

function changeRankingFirstTime() {
	rankingBtn.forEach((element) => {
		element.classList.toggle('hidden');
	});
	descriptionHallMode.forEach((element) => {
		element.classList.toggle('hidden');
	});
	data = '0';
	headerModeChange();
	changeMode();
	nameModes();
	hallOfFameScores();
}
function changeRankingDependsOnMode() {
	if (firstRanking.classList.contains('hidden')) {
		hallOfFameScores();
	}
}
rankingBtn.forEach((element) => {
	element.addEventListener('click', changeRankingFirstTime);
});

headerModeChange();
changeMode();
//--------------------------------------------------------------------------
export {
	changeText,
	blockBtns,
	dissapearBtns,
	answerBtns,
	data,
	showBtns,
	headerModeChange,
	changeMode,
	nameMode,
};
