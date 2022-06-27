def get_data(filename):
    '''
    Read data from a file, put it in array and transform to integers.
    '''
    myfile = open(filename)
    data = myfile.read().split()
    return list(map(lambda x: int(x), data))

def puzzle_one(data):
    '''
    Loop over data and increase result for one if previous number is smaller than the next one.
    '''
    result = 0
    for i in range(1,len(data)):
        if data[i] > data[i-1]:
            result += 1
    return result

def puzzle_two(data):
    '''
    Loop over data and increase result by one if sum of three elements is bigger
    than previous sum of three digits (sum(a,b,c) < sum(b,c,d)).
    '''
    result = 0
    for i in range(0,len(data)-3):
        if sum(data[i:i+3]) < sum(data[i+1:i+4]):
            result += 1
    return result

print("Puzzle one, first part solution: ")
# If we run into error, call get_data function with full path to the file.
print(puzzle_one(get_data('input.txt')))
print("Puzzle one, second part solution: ")
# If we run into error, call get_data function with full path to the file.
print(puzzle_two(get_data('input.txt')))