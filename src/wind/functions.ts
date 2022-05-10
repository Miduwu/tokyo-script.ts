import { BasicFunction, FunctionStructure } from './interfaces'

export const Random: BasicFunction = {
    name: 'random',
    code: (text: string, data: FunctionStructure) => {
        if(data.splits.length < 2) return text.replace(data.itself, data.inside)
        const random = Math.floor(Math.random() * data.splits.length)
        return text.replace(data.itself, data.splits[random])
    }
}

export const RandomNumber: BasicFunction = {
    name: 'number',
    code: (text: string, data: FunctionStructure) => {
        if(data.splits.length < 2) return text.replace(data.itself, data.inside)
        let [x, y] = [parseInt(data.splits[0]), parseInt(data.splits[1])]
        if(isNaN(x) || isNaN(y)) return text.replace(data.itself, data.itself)
        const random = Math.round(Math.random() * y - x + x)
        return text.replace(data.itself, random.toString())
    }
}