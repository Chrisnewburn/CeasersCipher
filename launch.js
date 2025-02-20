const btnEncrypt = document.querySelector('#encrypt');
const btnDecrypt = document.querySelector('#decrypt');
const key = document.querySelector('#key');
const listLetters = [];

for (let i = 97; i <= 122; i++) {
    listLetters.push(String.fromCharCode(i));
}
for (let i = 65; i <= 90; i++) {
    listLetters.push(String.fromCharCode(i));
}
listLetters.push(String.fromCharCode(32));

btnEncrypt.addEventListener('click', () => {
    const textarea = document.querySelector('#text');
    const keyValue = Number(key.value);
    const encryptedText = encryptText(textarea.value, keyValue);
    textarea.value = encryptedText;
});

btnDecrypt.addEventListener('click', () => {
    const textarea = document.querySelector('#text');
    const keyValue = Number(key.value);
    const decryptedText = decryptText(textarea.value, keyValue);
    textarea.value = decryptedText;
});
     
function validateKey() {
    const keyValue = key.value.match(/^\d+$/) ? Number(key.value) : null;
    if (keyValue === null) {
        errorMessage.style.display = 'block';
        return null;
    } else {
        errorMessage.style.display = 'none';
        return keyValue;
    }
}

function encryptText(text, keyValue) {
    let newText = '';
    for (const letter of text) {
        if (!listLetters.includes(letter)) {
            newText += letter;
            continue;
        }
        const indexLetter = listLetters.findIndex((item) => item === letter);
        let indexNewLetter = indexLetter + keyValue;
        if (indexNewLetter >= listLetters.length) {
            indexNewLetter = indexNewLetter - listLetters.length;
        }
        newText += listLetters[indexNewLetter];
    }
    return newText;
}

function decryptText(text, keyValue) {
    let newText = '';
    for (const letter of text) {
        if (!listLetters.includes(letter)) {
            newText += letter;
            continue;
        }
        const indexLetter = listLetters.findIndex((item) => item === letter);
        let indexNewLetter = indexLetter - keyValue;
        if (indexNewLetter < 0) {
            indexNewLetter = indexNewLetter + listLetters.length;
        }
        newText += listLetters[indexNewLetter];
    }
    return newText;
}