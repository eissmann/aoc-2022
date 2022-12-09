import { getFileContent } from '../utils/fileHandling'

interface RangeType {
    start: number
    end: number
}

const inputName = __dirname + '/puzzle-input'

const isFullyOverlappingRanges = (range1: RangeType, range2: RangeType): boolean => {
    return (
        (range1.start <= range2.start && range1.end >= range2.end) ||
        (range2.start <= range1.start && range2.end >= range1.end)
    )
}

const isOverlappingRanges = (range1: RangeType, range2: RangeType): boolean => {
    return (
        (range1.start <= range2.start && range2.start <= range1.end) ||
        (range2.start <= range1.start && range1.start <= range2.end)
    )
}

const splitPairs = (pair: string): RangeType[] => {
    return pair.split(',').map((section): RangeType => {
        const split = section.split('-')
        return {
            start: +split[0],
            end: +split[1],
        }
    })
}

const solvePart1 = (values: string[]): number => {
    const items = values.map((pair): number => {
        const sections = splitPairs(pair)

        if (isFullyOverlappingRanges(sections[0], sections[1])) {
            return 1
        }
        return 0
    })
    return items.reduce((a, b): number => a + b)
}

const solvePart2 = (values: string[]): number => {
    const items = values.map((pair): number => {
        const sections = splitPairs(pair)

        if (isOverlappingRanges(sections[0], sections[1])) {
            return 1
        }
        return 0
    })
    return items.reduce((a, b): number => a + b)
}

function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2(values))
}

solve()
