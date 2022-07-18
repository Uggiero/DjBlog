const imageFirst = document.getElementById('image__scroll-first');
const imageSeocnd = document.getElementById('image__scroll-second');

imageFirst.addEventListener('click', (e) => {
	imageFirst.style.top = "15%";
	imageFirst.style.left = "35%";
	imageFirst.style.opacity = "0.3";
	imageFirst.style.zIndex = "1";
	imageSeocnd.style.top = "5%";
	imageSeocnd.style.left = "20%";
	imageSeocnd.style.opacity = "1";
	imageSeocnd.style.zIndex = "2";
})
imageSeocnd.addEventListener('click', (e) => {
	imageSeocnd.style.top = "15%";
	imageSeocnd.style.left = "35%";
	imageSeocnd.style.opacity = "0.3";
	imageSeocnd.style.zIndex = "1";
	imageFirst.style.top = "5%";
	imageFirst.style.left = "20%";
	imageFirst.style.opacity = "1";
	imageFirst.style.zIndex = "2";
})

const sliderNext = document.querySelector('.slider__next');
const sliderBack = document.querySelector('.slider__back');
const sliderItems = document.querySelector('.slider__items');
const sliderItem = document.querySelectorAll('.slider__item');
let sliderMove = 0;
const maxSliderItem = sliderItem.length * 380 - 760;

sliderBack.addEventListener('click', (e) => {
	sliderMove += + 380;
	if (sliderMove >= maxSliderItem)
		sliderMove = 0;
	sliderItems.style.left = -sliderMove + "px";
})
sliderNext.addEventListener('click', (e) => {
	sliderMove += - 380;
	if (sliderMove < 0)
		sliderMove = maxSliderItem - 380;
	sliderItems.style.left = -sliderMove + "px";
})

const songs = ['War For Love',
	'3LAU, Bright Lights — How You Love Me',
	'Bright Lights, Kaleena Zanders, Kandy — War For Love',
	'Pink Is Punk, Benny Benassi, Bright Lights — Ghost',
	'Hardwell, Dyro, Bright Lights — Never Say Goodbye',
	'Zeds Dead, Dirtyphonics, Bright Lights — Where Are You Now',
	'Zedd, Bright Lights — Follow You Down',];
headerMusic();
function headerMusic() {
	const playBtn = document.querySelector('.playmusic__play'),
		stopBtn = document.querySelector('.playmusic__stop'),
		audio = document.querySelector('audio'),
		title = document.querySelector('.header__maintitle'),
		progressContainer = document.querySelector('.playmusic__progress'),
		progress = document.querySelector('.progress'),
		timeLive = document.querySelector('.playmusic__time-live'),
		timeMax = document.querySelector('.playmusic__time-max'),
		width = progressContainer.clientWidth;


	let songIndex = 0;
	loadSong(songs[songIndex]);

	playBtn.addEventListener('click', playSong);
	stopBtn.addEventListener('click', pauseSong);

	function loadSong(song) {
		title.innerHTML = song;
		audio.src = `music/${song}.mp3`;
	}

	function playSong() {
		audio.play();
		stopBtn.style.display = "inline-block";
		playBtn.style.display = "none";
		audio.addEventListener('timeupdate', updateProgress);
	}
	function pauseSong() {
		audio.pause();
		playBtn.style.display = "inline-block";
		stopBtn.style.display = "none";
	}

	function updateProgress(event) {
		const { duration, currentTime } = event.srcElement;
		const progressPercent = (currentTime / duration) * width;
		timeMax.innerHTML = (duration / 60).toFixed(2);
		timeLive.innerHTML = (currentTime / 60).toFixed(2);
		progress.style.width = progressPercent + 'px';

		if (progressPercent == width) {
			playBtn.style.display = "inline-block";
			stopBtn.style.display = "none";
			progress.style.width = "1px";
		}
	}

	function setProgress(event) {
		const width = this.clientWidth;
		const clickWidth = event.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickWidth / width) * duration;
	}

	progressContainer.addEventListener('click', setProgress);
}

const olList = document.querySelector('.track__list-ol');
const liList = document.querySelectorAll('.track__list-li');


for (let i = 0; i < liList.length; i++) {
	liList[i].addEventListener("click", () => {
		for (let i = 0; i < liList.length; i++) {
			removeTrackFocus(liList[i]);
		}
		if (liList[i].classList.contains('track__list-li')) {
			addTrackFocus(liList[i]);
			liveTrackPlay(i + 1);
		}
	})
}

function addTrackFocus(track) {
	track.classList.add('track__focus');
}
function removeTrackFocus(track) {
	track.classList.remove('track__focus');
}
let counter = 0;
liveTrackPlay(1);
function liveTrackPlay(songIndex) {
	const playBtn = document.querySelector('.live__play'),
		stopBtn = document.querySelector('.live__stop'),
		audio = document.querySelector('.live__audio'),
		progressContainer = document.querySelector('.live__progress'),
		progress = document.querySelector('.progress-live'),
		timeLive = document.querySelector('.live__time-live'),
		timeMax = document.querySelector('.live__time-max'),
		width = progressContainer.clientWidth,
		cover = document.querySelector('.tracks__img'),
		imageActive = document.querySelector('.image__active');

	loadSong(songs[songIndex]);

	playBtn.addEventListener('click', playSong);
	stopBtn.addEventListener('click', pauseSong);

	function loadSong(song) {
		audio.src = `music/${song}.mp3`;
	}

	function playSong() {
		audio.play();
		stopBtn.style.display = "inline-block";
		playBtn.style.display = "none";
		cover.classList.add('image__active');
		audio.addEventListener('timeupdate', updateProgress);
		counter += counter + 1;
	}
	function pauseSong() {
		audio.pause();
		playBtn.style.display = "inline-block";
		stopBtn.style.display = "none";
		cover.classList.remove('image__active');
	}

	function updateProgress(event) {
		const { duration, currentTime } = event.srcElement;
		const progressPercent = (currentTime / duration) * width;
		timeMax.innerHTML = (duration / 60).toFixed(2);
		timeLive.innerHTML = (currentTime / 60).toFixed(2);
		progress.style.width = progressPercent + 'px';

		if (progressPercent == width) {
			playBtn.style.display = "inline-block";
			stopBtn.style.display = "none";
			progress.style.width = "1px";
			cover.classList.remove('image__active');
		}
	}

	function setProgress(event) {
		const width = this.clientWidth;
		const clickWidth = event.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickWidth / width) * duration;
	}

	progressContainer.addEventListener('click', setProgress);
	if (counter != 0) {
		playSong();
	}
	nullStyle();
	function nullStyle() {
		progress.style.width = "1px";
		timeMax.innerHTML = '0.00';
		timeLive.innerHTML = '0.00';
	}
}
