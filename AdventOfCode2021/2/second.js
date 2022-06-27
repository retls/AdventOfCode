const fs = require('fs');

function getData(filename){
    const file = fs.readFileSync(filename, 'utf-8')
    const lines = file.split(/\r?\n/);
    const destructured = lines.map(instruction => {
        const seperate = instruction.split(' ');
        return [seperate[0], parseInt(seperate[1])]
    })
    return destructured
}

function puzzleOne(inp){
    const positionCount = { 
        "forward": 0, 
        "down": 0, 
        "up": 0 
    }
    inp.forEach(instruc => positionCount[instruc[0]] += instruc[1])
    return positionCount.forward * (positionCount.down - positionCount.up);
}

function puzzleTwo(inp){
    const positionCount = { 
        "forward": 0, 
        "depth": 0,
        "aim": 0,
        goUp: function(oneMove){
            this.depth += this.aim * oneMove;
        }
    }
    inp.forEach(instruc => {
        if(instruc[0] === "forward"){
            positionCount[instruc[0]] += instruc[1];
            positionCount.goUp(instruc[1])
        } else {
            instruc[0] === 'up' ? positionCount.aim -= instruc[1] : positionCount.aim += instruc[1];
        }
    })
    return positionCount.depth * positionCount.forward;
}


//1936494
console.log("Puzzle two, first part solution: ")
console.log(puzzleOne(getData('input.txt')))

//1997106066
console.log("Puzzle two, second part solution: ")
console.log(puzzleTwo(getData('input.txt')))