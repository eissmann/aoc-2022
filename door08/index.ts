import { getFileContent } from '../utils/fileHandling'

const inputName = __dirname + '/puzzle-input'

function solve() {
    // build matrix
    const stream = getFileContent(inputName)
        .split('\n')
        .map((line) => line.split('').map(Number))

    const visibleFromLeft = (x: number, y: number) => {
        return stream[y].slice(0, x).every((tree) => tree < stream[y][x])
    }

    const visibleFromRight = (x: number, y: number) => {
        return stream[y].slice(x + 1).every((tree) => tree < stream[y][x])
    }

    const visibleFromTop = (x: number, y: number) => {
        return stream.slice(0, y).every((tree) => tree[x] < stream[y][x])
    }

    const visibleFromBottom = (x: number, y: number) => {
        return stream.slice(y + 1).every((tree) => tree[x] < stream[y][x])
    }

    const isVisible = (x: number, y: number) => {
        if ([x, y].indexOf(0) >= 0 || y === stream.length - 1 || x === stream[0].length - 1) {
            return true
        }

        return (
            visibleFromLeft(x, y) ||
            visibleFromRight(x, y) ||
            visibleFromTop(x, y) ||
            visibleFromBottom(x, y)
        )
    }
    const getScenicScore = (x: number, y: number) => {
        if ([x, y].indexOf(0) >= 0 || y === stream.length - 1 || x === stream[0].length - 1) {
            return 0
        }

        let left = 0
        let right = 0
        let top = 0
        let bottom = 0

        //left
        let itX = x - 1
        while (itX >= 0) {
            if (stream[y][x] <= stream[y][itX]) {
                itX = -1
            } else {
                itX -= 1
            }
            left += 1
        }

        // right
        itX = x + 1
        while (itX <= stream[0].length - 1) {
            if (stream[y][x] <= stream[y][itX]) {
                itX = stream[0].length
            } else {
                itX += 1
            }
            right += 1
        }

        // top
        let itY = y - 1
        while (itY >= 0) {
            if (stream[y][x] <= stream[itY][x]) {
                itY = -1
            } else {
                itY -= 1
            }
            top += 1
        }

        // bottom
        itY = y + 1
        while (itY <= stream.length - 1) {
            if (stream[y][x] <= stream[itY][x]) {
                itY = stream.length
            } else {
                itY += 1
            }
            bottom += 1
        }

        // console.log('LEFT', `${x},${y}`, stream[y][x], left)
        // console.log('RIGHT', `${x},${y}`, stream[y][x], right)
        // console.log('TOP', `${x},${y}`, stream[y][x], top)
        // console.log('BOTTOM', `${x},${y}`, stream[y][x], bottom)
        return left * right * top * bottom
    }

    let visible = 0
    let scenicScore = 0

    for (let y = 0; y < stream.length; y++) {
        for (let x = 0; x < stream[0].length; x++) {
            if (isVisible(x, y)) {
                visible++
                scenicScore = Math.max(scenicScore, getScenicScore(x, y))
            }
        }
    }

    console.log('Part 1:', visible)
    console.log('Part 2:', scenicScore)
}

solve()
