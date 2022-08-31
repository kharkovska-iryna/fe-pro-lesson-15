const input = document.querySelector('#input');
const addBtn = document.querySelector('#add-btn');
const randomBtn = document.querySelector('#random-btn');
const select = document.querySelector('#select');
const outBlock = document.querySelector('.out-block');

// create an object Number
function Num(number, type) {
    this.number = number,
    this.type = type
};

let num = null;

function sendRequest(method, url) {
	return fetch(url).then(response => {
		return response.text()
        .then(result => outBlock.append(result))
        .catch((error) => {
            console.log('error' + error)
        })
	})
};

function onClick(event) {
    event.preventDefault();
    if (!input.value) {
        return alert('Введите число')
    };
    if (input.value % 1 !== 0) {
        input.value = '';
        return alert('Введите целое число')
    };
    num = new Num(input.value, select.value);
    console.log(num);
    let requestURL = `http://numbersapi.com/${num.number}/${num.type}`;
    sendRequest('GET', requestURL);
    input.value = ''
};

function onClickRandomBtn(event) {
    event.preventDefault();
    let requestURL = `http://numbersapi.com/random/${select.value}`;
    sendRequest('GET', requestURL).then(result => outBlock.append(result));
};

addBtn.addEventListener('click', onClick);
randomBtn.addEventListener('click', onClickRandomBtn)

