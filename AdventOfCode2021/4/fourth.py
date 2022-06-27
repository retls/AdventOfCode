def get_data(filename):
    '''
    Read data from a file, put it in list and transform to integers.
    '''
    myfile = open(filename)
    file_data = myfile.read().split('\n')
    draw = file_data[0].split(',')
    grids = list_split(file_data[2:])
    return (draw, grids)

def list_split(list):
    '''
    Splits the data into individual grids of five by five. (bingo grid)
    '''
    grids = []
    grid = []
    for i in range(0, len(list)):
        if list[i] == '':
            grids.append(grid)
            grid = []
        else:
            line = list[i].split(' ')
            # Remove empty values from line.
            line = [value for value in line  if value != '']
            grid.append(line)
    return grids

def add_vertical_lines(grids):
    '''
    Make vertical lines for 5 by 5 grinds that are input so we end up with 5 original
    horizontal liens and new 5 vertical for each grid in input grids.
    '''
    new_grids = []
    merged_grid = []
    vertical_line = []
    for grid in grids:
        for i in range(0, len(grid)):
            for j in range(0, len(grid[i])):
                # Creating vertical line out of five lines in grid for each index
                vertical_line.append(grid[j][i])
            # Append old grid line and new vertical one, and empty vertical_line for next line in grid.
            merged_grid.append(vertical_line)
            merged_grid.append(grid[i])
            vertical_line = []
        # Append full new grid with old five lines plus new five vertical ones to new_grids and empty metged_grid to be ready for next grid.
        new_grids.append(merged_grid)
        merged_grid = []
    return new_grids

def mark_grids(grids, value):
    '''
    If line in grid contains values passed in, it is removed.
    '''
    for i in range(0, len(grids)):
        for j in range(0, len(grids[i])):
            if value in grids[i][j]:
                grids[i][j].remove(value)
    return grids

def check_winner(grids, winners):
    '''
    Empty line in a grid means we have a winner and it is appened to winners list if it isn't there yet.
    '''
    for i in range(0, len(grids)):
        for j in range(0, len(grids[i])):
            if len(grids[i][j]) == 0:
                if(i not in winners):
                    winners.append(i)
    return winners

def puzzle_one_and_two(data):
    '''
    This function takes in data including draw including list of numbers drawn in sequnce and
    all the grids that are in play. It draws one number at a time,removes marked elements from
    grids, checks for winner and fills winners list with wiiners in order by which tehy won.
    '''
    draw = data[0]
    merged_grids = add_vertical_lines(data[1])
    winning_numbers = []
    winners = []
    puzzle_one = True
    index = 0
    while len(draw) > 0:
        # Draw number.
        winning_numbers.append(draw[index])
        # Mark (remove) number that was drawn.
        merged_grids = mark_grids(merged_grids, winning_numbers[index])
        # Check for winner and append it to the list if it occured.
        winners = check_winner(merged_grids, winners)
        # Puzzle one solution = first winner.
        if len(winners) == 1 and puzzle_one:
            print("Puzzle four, first part solution: ")
            print(puzzle_output(data[1], winners[0], winning_numbers))
            puzzle_one = False
        # Puzzle two solution = last winner.
        elif len(winners) == 100:
            print("Puzzle four, second part solution: ")
            print(puzzle_output(data[1], winners[len(winners) - 1], winning_numbers))
            break
        index += 1

def puzzle_output(grids, winning_index, winning_numbers):
    # Get winning grid from original data, so it contains all the numbers.
    winning_grid = original_data[1][winning_index]
    # Merge all the lines in grid into single list.
    winning_grid_merged = sum(winning_grid, [])
    # Filter out numers that were not drawn.
    not_chosen = list(filter(lambda x: x not in winning_numbers, winning_grid_merged))
    # Transform them into ints with list comprehension.
    not_chosen_int = [int(num) for num in not_chosen]
    # Result is sum of all numbers from the wiining grid that weren't chosen times last winning number that was drawn.
    return sum(not_chosen_int) * int(winning_numbers[len(winning_numbers) - 1])

# If we run into error, call get_data function with full path to the file.
original_data = get_data('input.txt')
puzzle_one_and_two(get_data('input.txt'))