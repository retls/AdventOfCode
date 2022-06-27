const fs = require('fs');

function getData(filename){
    const file = fs.readFileSync(filename, 'utf-8')
    const input = file.split(/\r?\n/);
    return input;
}

function parseData(inp){
    const draw = inp[0].split(',');
    const grids = [];
    let grid = []
    for(let i = 2; i < inp.length; i++){
        if(inp[i] === ''){
            grids.push(grid)
            grid = [];
        } else {
            grid.push(inp[i].trim().split(/\s+/))
        }
    }
    return {draw, grids}
}

function addVerticalToGrids(inp){
    let grids = [];
    let mergedGrid = [];
    let verticalLine = [];
    
    for(const grid of inp){
        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[i].length; j++){
                verticalLine.push(grid[j][i])
            }
            mergedGrid.push(verticalLine,grid[i]);
            verticalLine = [];
        }
        grids.push(mergedGrid);
        mergedGrid = [];
    }
    return grids;
}

function sumOfArray(ar){
    let sum = 0;
    ar.forEach(num => {
        sum += num
    })  
    return sum;
}

function markGrids(grids, value){
    for(let i = 0; i < grids.length; i++){
        for(let j = 0; j < grids[i].length; j++){
            let index = grids[i][j].indexOf(value)
            if(index !== -1){
                grids[i][j].splice(index,1)
            }
        }
    }
    return grids
}
function checkWinner(grids, winners){
    for(let i = 0; i < grids.length; i++){
        for(let j = 0; j < grids[i].length; j++){
            if(grids[i][j].length === 0){
                if(!winners.includes(i)){
                    winners.push(i);
                }
            }
        }
    }
    return winners;
}

function puzzleOneAndTwo(inp){
    let draw = inp.draw;
    let mergedGrids = addVerticalToGrids(inp.grids);
    let winningNumbers = []
    let winners = []
    let puzzleOne = true;
    while(draw.length > 0){
         winningNumbers.push(draw.shift())
         mergedGrids = markGrids(mergedGrids, winningNumbers[winningNumbers.length - 1])
         winners = checkWinner(mergedGrids, winners)
         if(winners.length === 1 && puzzleOne){
            //35711
            console.log("Puzzle four, first part solution: ")
            console.log(puzzleOutput(winners[0], winningNumbers))
            puzzleOne = false
         }  else if (winners.length === 100){
            //5586
            console.log("Puzzle four, second part solution: ")
            console.log(puzzleOutput(winners[winners.length-1], winningNumbers))
            break
         }
    }  
}

function puzzleOutput(winningIndex, winningNumbers){
    let winningGrid = originalData.grids[winningIndex];
    winningGrid = winningGrid.flat(1);
    const notChosen = winningGrid.filter(num => !winningNumbers.includes(num));
    const sumOfNotChosen = notChosen.map(str => parseInt(str));
    return sumOfArray(sumOfNotChosen) * parseInt(winningNumbers[winningNumbers.length -1]);
}


const originalData = parseData(getData('input.txt'));
const puzzleData = {
    draw: JSON.parse(JSON.stringify(originalData.draw)),
    grids: JSON.parse(JSON.stringify(originalData.grids))
}
puzzleOneAndTwo(parseData(getData('input.txt')))
