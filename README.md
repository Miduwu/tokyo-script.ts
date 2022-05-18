# @midowo/tokyo-script.ts
Custom package made by Mid with basic string-based functions and variables.

## Usage:
```ts
import { TokyoScript, FunctionStructure } from '@midowo/tokyo-script.ts'

const Parser = new Parser(MyDiscordClient, {
    brackets: 1, // 1 for '{}' and 2 for '[]'
    separator: ',',
    allowEmbeds: true,
    ignore: []
})

// Adding custom functions
Parser.addFunction({
    name: 'uppercase',
    code: (text: string, data: FunctionStructure) => {
    return text.replace(data.itself, data.inside.toUpperCase())
}
})
// Deleting functions
Parser.deleteFunction('uppercase')
// Adding custom variables
Parser.addVariable('hi', 'bye') // {hi} will be replaced to bye
// Deleting variables
Parser.deleteVariable('hi')

// The parser itself:
Parser.interprete('hi {USER.NAME}', interaction)
// With messages:
Parser.interprete('hi {USER.NAME}', message)
```

### Function Structure:
```ts
{
    name: string,
    regexp: RegExpMatchArray | null,
    inside: string,
    itself: string,
    splits: string[]
}
```
