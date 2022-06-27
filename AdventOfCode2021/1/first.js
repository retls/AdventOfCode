const fs = require('fs');

function getData(filename){
    const file = fs.readFileSync(filename, 'utf-8')
    const input = file.split(/\r?\n/);
    return input.map(num => parseInt(num))
}

function sumOfArray(ar){
    let sum = 0;
    ar.forEach(num => {
        sum += num
    })  
    return sum;
}
function puzzleOne(inp){
    let result = 0;
    for(let i = 1; i < inp.length; i++) {
        if( inp[i] > inp[i-1] ) {
            result += 1
        }
    }
    return result;
}
console.log("Puzzle one, first part solution: ")
console.log(puzzleOne(getData('input.txt')));

function puzzleTwo(inp){
    let result = 0;
    for(let i = 0; i < inp.length-3; i++) {
        if( sumOfArray(inp.slice(i, i+3)) < sumOfArray(inp.slice(i+1, i+4)) ) {
            result += 1
        }
    }
    return result;
}

console.log("Puzzle one, second part solution: ")
console.log(puzzleTwo(getData('input.txt')));





