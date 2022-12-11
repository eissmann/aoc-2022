import { getFileContent } from '../utils/fileHandling'

const inputName = __dirname + '/puzzle-input'

function solve() {
    const stream = getFileContent(inputName).split('\n').pop() || ''

    const findMarker = (length: number): number => {
        let testString = ''
        for (let i = 0; i < stream.length; i += 1) {
            testString = Array.from(new Set([...stream.slice(i, i + length).split('')])).join('')
            if (testString.length === length) {
                return i + length
            }
        }

        return -1
    }

    console.log('Part 1:', findMarker(4))
    console.log('Part 2:', findMarker(14))
}

solve()
