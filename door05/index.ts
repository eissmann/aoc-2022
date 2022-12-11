import { getFileContent } from '../utils/fileHandling'

const inputName = __dirname + '/puzzle-input'

const solvePart1 = (stackSet: string, moves: string): string => {
    const stacks = setupStacks(stackSet)

    moves.split('\n').forEach((instruction: string) => {
        const [count, from, to] = (instruction.match(/[0-9]+/g) as RegExpMatchArray).map(Number)
        const crates = stacks[from - 1].splice(-count).reverse()

        stacks[to - 1].push(...crates)
    })

    return stacks.map((column) => (column.length ? column.pop() : '')).join('')
}

const solvePart2 = (stackSet: string, moves: string): string => {
    const stacks = setupStacks(stackSet)

    moves.split('\n').forEach((instruction: string) => {
        const [count, from, to] = (instruction.match(/[0-9]+/g) as RegExpMatchArray).map(Number)
        const crates = stacks[from - 1].splice(-count)

        stacks[to - 1].push(...crates)
    })

    return stacks.map((column) => (column.length ? column.pop() : '')).join('')
}

function setupStacks(stack: string) {
    return stack
        .split('\n')
        .slice(0, -1)
        .reverse()
        .map((line) => {
            return line?.match(/.{1,4}/g)?.map((entry) => {
                return entry.trim().replace('[', '').replace(']', '')
            })
        })
        .reduce((acc, crates = ['']): string[][] => {
            crates.forEach((crate, idx) => {
                if (crate) {
                    if (!acc[idx]) acc[idx] = []
                    acc[idx].push(crate)
                }
            })
            return acc
        }, [] as string[][])
}

function solve() {
    const [stack, moves] = getFileContent(inputName).split('\n\n')

    console.log('Part 1:', solvePart1(stack, moves))
    console.log('Part 2:', solvePart2(stack, moves))
}

solve()
