import { getFileContent } from '../utils/fileHandling'

const inputName = __dirname + '/puzzle-input'

interface StructurItemInterface {
    id?: number
    parent: number | null
    type: string
    size: number
    name: string
}

function solve() {
    const stream = getFileContent(inputName).split('\n')

    const structureBase: StructurItemInterface[] = [
        {
            id: 0,
            parent: null,
            type: 'dir',
            size: 0,
            name: '/',
        },
    ]

    let current: number
    current = 0
    let parent: number | null
    parent = null

    const runCommand = (cmd: string, arg = '', structure: StructurItemInterface[]) => {
        let newParent: number | null

        switch (cmd) {
            case 'cd':
                switch (arg) {
                    case '/':
                        current = 0
                        parent = null
                        break
                    case '..':
                        newParent = structure[parent || 0].parent
                        current = parent as number
                        parent = newParent
                        break
                    default:
                        structure.push({
                            id: undefined,
                            parent: current,
                            type: 'dir',
                            size: 0,
                            name: arg,
                        })
                        structure[structure.length - 1].id = structure.length - 1
                        parent = current
                        current = structure.length - 1
                }
                break
            default:
                break
        }

        return structure
    }

    const calculateSize = (
        size: number | string,
        name: string,
        structure: StructurItemInterface[],
    ) => {
        let parentIterator = null
        switch (size) {
            case 'dir':
                break
            default:
                structure.push({
                    id: undefined,
                    type: 'file',
                    size: +size,
                    name: name,
                    parent: current,
                })
                structure[structure.length - 1].id = structure.length - 1

                structure[current].size += +size
                parentIterator = structure[current].parent

                while (parentIterator !== null) {
                    structure[parentIterator].size += +size
                    parentIterator = structure[parentIterator].parent
                }
        }

        return structure
    }

    const structure = stream.reduce((acc: StructurItemInterface[], line: string) => {
        const parts = line.split(' ')
        if (parts[0] === '$') {
            acc = runCommand(parts[1], parts[2] || '', acc)
        } else {
            acc = calculateSize(parts[0], parts[1], acc)
        }
        return acc
    }, structureBase)

    console.log(
        'Part 1:',
        structure
            .filter((item) => {
                return item.type === 'dir' && item.size <= 100000
            })
            .reduce((acc, dir) => acc + dir.size, 0),
    )

    const totalSpace = 70000000
    const unused = totalSpace - structure[0].size
    const needed = 30000000 - unused

    console.log(
        'Part 2:',
        structure
            .filter((item) => {
                return item.type === 'dir' && item.size >= needed
            })
            .reduce((acc, dir) => {
                return acc.size < dir.size ? acc : dir
            }).size,
    )
}

solve()
