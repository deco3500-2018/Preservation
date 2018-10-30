// On index page
function submitAction(){
	var age = document.forms.age.value;
	var pictures = document.forms.pictures.value;
	var count = pictures;
	var place = document.forms.location.value;
	var startYear = document.forms.startYear.value;
	var endYear = document.forms.endYear.value;
	var category = document.forms.category.value;
	var randomList = randomNumberList(pictures);
	var url = 'test.html?age='+age+'&pictures='+pictures+'&location='+place+'&startYear='+startYear+'&endYear='+endYear+'&category='+category+'&count='+count+'&randomList='+randomList;
	window.open(url, "_self");
}

function nav_f() {
	$("nav").hide();
	$("#container").css('display', 'block');
}

// On evaluation page, random function
function randomNumberList(loopCount) {
	var min = 1;
	var max = 500;
	var randomNumbers = [];
	while(loopCount != randomNumbers.length){
		randomNumber = Math.floor(Math.random() * (max + 1 - min)) + min;
		if(!randomNumbers.includes(randomNumber)){
			randomNumbers.push(randomNumber);
		}
	}
	return randomNumbers;
}

