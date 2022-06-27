const fs = require('fs');

function getData(filename){
    const file = fs.readFileSync(filename, 'utf-8')
    const input = file.split(/\r?\n/);
    const parsedInput = [];
    for(let line of input){
        let splitLine = line.split('->');
        let parsedLine = [
            parseInt(splitLine[0].split(',')[0]),
            parseInt(splitLine[0].split(',')[1]),
            parseInt(splitLine[1].split(',')[0]),
            parseInt(splitLine[1].split(',')[1])
        ]
        parsedInput.push(parsedLine)
    }
    return parsedInput;
}

function makeField(){
    let field = [];
    for(let i = 0; i < 1000; i++){
        field.push(Array(1000).fill(0))
    }
    return field
}
function moveHorVer(field, coords){
    const direction = (coords[0] - coords[2]) !== 0 ? 'x' : 'y'
    if(direction === 'x'){
        let smallXCoord = coords[0] > coords[2] ? coords[2] : coords[0];
        let bigXCoord = coords[0] > coords[2] ? coords[0] : coords[2];
        for(let i = smallXCoord; i < bigXCoord + 1; i++){
            field[coords[1]][i] += 1
        }
    } else {
        let smallYCoord = coords[1] > coords[3] ? coords[3] : coords[1];
        let bigYCoord = coords[1] > coords[3] ? coords[1] : coords[3];
        for(let i = smallYCoord; i < bigYCoord + 1; i++){
            field[i][coords[0]] += 1
        }
    }
    return field;
}
function moveVertical(field,coords){
    let counter = 0;
    //x Axis movement from right to left
    if(coords[0] > coords[2]){
        for(let i = coords[0]; i > coords[2] - 1; i--){
            if(coords[1] > coords[3]){
                field[coords[1] - counter][i] += 1
            } else {
                field[coords[1] + counter][i] += 1
            }
            counter++;
        }
    //x Axis movement from left to right
    } else {
        for(let i = coords[0]; i < coords[2] + 1; i++){
            if(coords[1] > coords[3]){
                field[coords[1] - counter][i] += 1
            } else {
                field[coords[1] + counter][i] += 1
            }
            counter++;
        }
    }
    return field;
}

function puzzleOne(){
    let field = makeField();
    const instructions = getData('input.txt');
    for(let instr of instructions){
        if(instr[0] === instr[2] || instr[1] === instr[3]){
            field = moveHorVer(field, instr)
        }
    }
    let counter = 0;
    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if(field[i][j] >= 2){
                counter++;
            }
        }
    }
    return counter;
}

function puzzleTwo(){
    let field = makeField();
    const instructions = getData('input.txt');
    for(let instr of instructions){
        if(instr[0] === instr[2] || instr[1] === instr[3]){
            field = moveHorVer(field, instr)
        } else{
            field = moveVertical(field, instr)
        }
    }
    let counter = 0;
    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if(field[i][j] >= 2){
                counter++;
            }
        }
    }
    return counter;
}
//4728
console.log("Puzzle five, first part solution: ")
console.log(puzzleOne())
//17717
console.log("Puzzle five, second part solution: ")
console.log(puzzleTwo())
