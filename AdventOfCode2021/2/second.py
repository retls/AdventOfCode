def get_data(filename):
    '''
    Read data from a file, put it in array and pack instruction : value into array of tuples.
    '''
    myfile = open(filename)
    data = myfile.read().split('\n')
    return list(map(lambda x: (x.split(' ')[0], int(x.split(' ')[1])), data))

def puzzle_one(instructions):
    '''
    Based on instructions passed in increse values in positionCount.
    Return the difference between up and down key times forward key.
    '''
    positionCount = {"forward": 0, "up": 0, "down": 0}
    for instruction in instructions:
        positionCount[instruction[0]] += instruction[1]
    return positionCount['forward'] * (positionCount['down'] - positionCount['up'])

def puzzle_two(instructions):
    '''
    Based on instructions increase or decrease depth.
    '''
    positionCount = {"forward": 0, "depth": 0, "aim": 0}
    for instruction in instructions:
        if instruction[0] == "forward":
            positionCount[instruction[0]] += instruction[1]
            positionCount["depth"] += positionCount["aim"] * instruction[1]
        else:
            # Instruction "up" means aim decreases by amount in instruction.
            if instruction[0] == 'up':
                positionCount["aim"] += instruction[1]
            # Instruction "down" means aim increases.
            else:
                positionCount["aim"] -= instruction[1]
    # Solution to puzzle two is final depth times for how many points it moved forward.
    return abs(positionCount["depth"] * positionCount["forward"]);

print("Puzzle two, first part solution: ")
# If we run into error, call get_data function with full path to the file.
print(puzzle_one(get_data('input.txt')))
print("Puzzle two, second part solution: ")
# If we run into error, call get_data function with full path to the file.
print(puzzle_two(get_data('input.txt')))