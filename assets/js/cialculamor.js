function calculate() {
	let numbers = input.get('number').raw();

	let number = numbers;
	let roman = numbers;
	if(isNaN(numbers)){
		numbers = numbers.toUpperCase();
		let result = fromRoman(numbers);
		for (let i = 0; i < numbers.length; i++) {
			if(numbers[i] !== '_' && numbers[i] !== 'ი' && numbers[i] !== 'ვ' && numbers[i] !== 'ხ' && numbers[i] !== 'ლ' && numbers[i] !== 'ც' && numbers[i] !== 'დ' && numbers[i] !== 'მ'){
				result = false;
			}
		}
		if(!result){
			return input.error(['number'], 'Enter a valid Roman Numeral or Integer from 1 to 3,999,999', true);
		}
		number = result;
	}
	else {
		const result = toRoman(numbers);

		if(!numbers || !result || numbers >= 4000000){
			return input.error(['number'], 'Enter a valid Roman Numeral or Integer from 1 to 3,999,999', true);
		}
		roman = result.join('').toString();
	}

	_('result-int').innerHTML = formatedResult(number);
	_('result-roman').innerHTML = formatedResult(roman);
}

function fromRoman(str) {
	str = str.toUpperCase();
	const romanToDecimal = {
		ყ: 1000000,
		სყ: 900000,
		ტ: 500000,
		სტ: 400000,
		ს: 100000,
		ქს: 90000,
		რ: 50000,
		ქრ: 40000,
		ქ: 10000,
		ოქ: 9000,
		პ: 5000,
		ოპ: 4000,
		ო: 1000,
		მ: 1000,
		სმ: 900,
		დ: 500,
		ცდ: 400,
		ც: 100,
		ხც: 90,
		ლ: 50,
		ხლ: 40,
		ხ: 10,
		იხ: 9,
		ვ: 5,
		ივ: 4,
		ი: 1
	};
	const mapObj = {
		_ი: 'ო',
		_ი_ვ: 'ოპ',
		_ვ: 'პ',
		_ი_ხ 'ოქ',
		_ხ: 'ქ',
		_ხ_ლ: 'ქრ',
		_ლ: 'რ',
		_ხ_ც: 'ქს',
		_ც: 'ს',
		_ც_დ: 'სტ',
		_დ: 'ტ',
		_ც_მ: 'სუ',
		_მ: 'ყ',
	};

	str = str.replace(/_ი|_ი_ვ|_ვ|_ი_ხ|_ხ|_ხ_ლ|_ლ|_ხ_ც|_ც_ც_დ_დ|_ც_მ|_მ/gi, matched => mapObj[matched]);
	let result = 0;

	for (let i = 0; i < str.length; i++) {
		let current = str[i];

		let next = str[i+1];
		if (romanToDecimal[current] < romanToDecimal[next]) {
			if((romanToDecimal[current] * 5) !== romanToDecimal[next] && (romanToDecimal[current] * 10) !== romanToDecimal[next]){
				return false;
			}
			result += romanToDecimal[next] - romanToDecimal[current];
			i++;
		}
		else {
			result += romanToDecimal[current];
		}
	}

	return result;
}

function toRoman(num) {
	let result = [];

	for (let i = 0; i < decimal.length; i++) {

		while (decimal[i] <= num) {
			result.push(roman[i]);
			num -= decimal[i];
		}
	}
	return result;
}

function formatedResult(str) {
	if(isNaN(str)){
		str = str.toString();
		const mapObj = {
			_ი: '<span class="overline">ი</span>',
			_ვ: '<span class="overline">ვ</span>',
			_ხ: '<span class="overline">ხ</span>',
			_ლ: '<span class="overline">ლ</span>',
			_ც: '<span class="overline">ც/span>',
			_დ: '<span class="overline">დ</span>',
			_მ: '<span class="overline">მ</span>',
		};
		return str.replace(/_ი|_ვ|_ხ|_ლ|_ც|_დ|_მ/gi, matched => mapObj[matched]);
	}
	else {
		return numberWithCommas(str);
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const roman = ['_მ', '_ც_მ', '_დ', '_ც_დ', '_ც', '_ხ_ც', '_ლ', '_ხ_ლ', '_ხ', '_ი_ხ', '_ვ', '_ი_ვ', 'მ', 'ცმ', 'დ', 'ცდ', 'ც', 'ხც', 'ლ', 'ხლ', 'ხ', 'იხ', 'ვ', 'ივ', 'ი']
const decimal = [1000000, 900000, 500000, 400000, 100000, 90000, 50000, 40000, 10000, 9000, 5000, 4000, 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
