

// https://projecteuler.net/problem=15

/*

- I can only move down, or right (no backtracking)
- i have a 20x20 grid.
- for a 2x2 grid, there are 6 possible combinations
    - RRDD
    - RDRD
    - RDDR
    - DRDR
    - DDRR

    2x2 = 4, we can imagine this as 4 coins?

    2^4 = 16. 16 total possible combinations, and 6 valid ones.



    It's sort of like... flipping 4 coins? All permutations?
    But RRRR is not valid.
    DDDD is also not valid.

    If we have D and R as -1 and 1 respectively, we could eliminate all the bad combinations!
    A valid combination must equal 0
    How do I generate all possible (valid) permutations of R and D for 20x20?


    > https://www.stat.berkeley.edu/~stark/SticiGui/Text/counting.htm

    2n different subsets can be formed from a collection of n elements
    So we have here ... 2^20 to start.

    Can we get all combinations and then trim the ones that are invalid?

    Math.pow(2,20) = 1048576

    That's... at least 1 million combinations. Booo. 
    Can we just assume half of them are going to be invalid? :/


    How about a 3x3 grid?

    2^9 = 512
    How many of these are valid?

    RRRDDD
    RRDRDD


    DDDRRR


    The pattern is... every time I make a move..
    I have to take back that move at some point...

    



*/