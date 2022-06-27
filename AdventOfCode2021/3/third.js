const fs = require('fs');

function getData(filename){
    const file = fs.readFileSync(filename, 'utf-8')
    const input = file.split(/\r?\n/);
    return input;
}

function countDigits(inp){
    let inpLength = inp.length/2;
    let digitCounter = Array(inp[0].length).fill(0);
    inp.forEach(num => {
        for(let i = 0; i < num.length; i++){
            if (num[i] === '1') digitCounter[i]++;
        }
    })
    return digitCounter.map(num => num >= inpLength ? 1 : 0);
}

function countDigit(inp, index, oxygen){
    let inpLength = inp.length/2;
    let counter = 0;
    inp.forEach(num => {if(num[index] === '1') counter++;} )
    if (oxygen){
        return counter >= inpLength ? '1' : '0';
    } else{
        return counter >= inpLength ? '0' : '1';
    }
}

function reduceInp(inp, oxygen = true ){
    let input = inp;
    let index = 0;
    while(input.length > 1){
        let count = countDigit(input, index, oxygen);
        input = input.filter(num => num[index] === count)
        index++;
    }
    return input;
}

function puzzleOne(inp){
    const gamma = countDigits(inp);
    const epsilon = gamma.map(num => num === 1 ? 0: 1)
    const gammaRate = parseInt((gamma.join('')), 2);
    const epsilonRate = parseInt((epsilon.join('')), 2);
    return epsilonRate * gammaRate;
}

function puzzleTwo(inp) {
    const oxygenGenerator = parseInt((reduceInp(inp, true)[0]), 2)
    const co2Scrubber = parseInt((reduceInp(inp, false)[0]), 2)
    return oxygenGenerator * co2Scrubber;
}

//841526
console.log("Puzzle three, first part solution: ")
console.log(puzzleOne(getData('input.txt')))

//4790390
console.log("Puzzle three, second part solution: ")
console.log(puzzleTwo(getData('input.txt')));