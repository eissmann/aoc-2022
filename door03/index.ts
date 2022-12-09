import { getFileContent } from '../utils/fileHandling'
import { uniqueStringIntersections } from '../utils/stringHandling'

const inputName = __dirname + '/puzzle-input'

const chunkArray = (array: any[], chunkSize: number): any[] => {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize)
        result.push(chunk)
    }

    return result
}

const getPriority = (char: string): number => {
    const priority = char.charCodeAt(0)

    if (priority >= 97) {
        return priority - (97 - 1)
    }

    return priority - (65 - 27)
}

const solvePart1 = (values: string[]): number => {
    const priorities = values.map((content) => {
        const pattern = `.{1,${content.length / 2}}`
        const compartements = content.match(new RegExp(pattern, 'g'))

        const result = 0
        if (!compartements) {
            return result
        }

        const letter = uniqueStringIntersections(compartements[0], compartements[1])
        return getPriority(letter)
    })

    return priorities.reduce((a, b): number => a + b)
}

const solvePart2 = (values: string[]): number => {
    const priorities = chunkArray(values, 3).map((three) => {
        let letter = uniqueStringIntersections(three[0], three[1])
        letter = uniqueStringIntersections(letter, three[2])

        return getPriority(letter)
    })

    return priorities.reduce((a, b): number => a + b)
}

function solve() {
    const values = getFileContent(inputName).split('\n')

    console.log('Part 1:', solvePart1(values))
    console.log('Part 2:', solvePart2(values))
}

solve()
