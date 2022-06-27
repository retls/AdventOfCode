def get_data(filename):
    '''
    Read data from a file, put it in list and transform to integers.
    '''
    myfile = open(filename)
    return myfile.read().split()

def count_digits(data):
    '''
    Counts number of ones at each index for all elements of input data.
    '''
    data_length = len(data)/2
    digit_count = [0]*len(data[0])
    for numbers in data:
        for i,digit in enumerate(numbers):
            if digit == '1': digit_count[i] += 1
    # Returns list containing one or zero depending of which one occurs more at given index
    return list(map(lambda x: '1' if x >= data_length else '0' , digit_count))

def count_digit(data, index, oxygen):
    '''
    Calculates if one or zero occurs more times at given index that is passed in as argument.
    '''
    data_length = len(data)/2
    counter = 0
    for num in data:
        if num[index] == '1': counter += 1
    if oxygen:
        # Calculating oxygen return the number that occurs less
        return '1' if counter >= data_length else '0'
    else:
        # Calculating co2 return number that occurs most
        return '0' if counter >= data_length else '1'

def reduce_data(data, oxygen = True):
    '''
    Removes elements of data based on index of an element mathcing return from count_digit function.
    '''
    new_data = data
    index = 0
    while len(new_data) > 1:
        # Check which digit occurs more or less based on oxygen param.
        count = count_digit(new_data, index, oxygen)
        # Filter out elements of array that have value returnd from count_digit at given index.
        new_data = list(filter(lambda x: x[index] == count, new_data))
        index += 1
    return new_data

def puzzle_one(data):
    # List with one or zeroes, depeding on which one occurs more in all of the elements at each index.
    gamma = count_digits(data)
    # Epsilon in reverse of gamma. We switch 1s for 0os and vice versa.
    epsilon = list(map(lambda x: '0' if x == '1' else '1', gamma))
    #Convert both to decimal.
    dec_gamma = int(''.join(gamma),2)
    dec_epsilon = int(''.join(epsilon),2)
    return dec_gamma * dec_epsilon

def puzzle_two(data):
    # For each index in elemnts, check which of the values at that index occurs least, and remove them, 
    # until there is only one element left in list.
    oxygen_generator = int(reduce_data(data, True)[0], 2)
    # Similar to oxygen, only it removes elements at given index that have values that occurs the most.
    co2_scrubber = int(reduce_data(data, False)[0], 2)
    return oxygen_generator * co2_scrubber

print("Puzzle three, first part solution: ")
# If we run into error, call get_data function with full path to the file.
print(puzzle_one(get_data('input.txt')))
print("Puzzle three, first part solution: ")
# If we run into error, call get_data function with full path to the file.
print(puzzle_two(get_data('input.txt')))