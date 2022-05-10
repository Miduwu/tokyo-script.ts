# @midowo/tokyo-script.ts
Custom package made by Mid with basic string-based functions and variables.

## Usage:
```ts
import { TokyoScript, FunctionStructure } from '@midowo/tokyo-script.ts'

const Parser = new Parser(MyDiscordClient, {
    brackets: { start: '{', end: '}' },
    separator: ',',
    allowEmbeds: true,
    ignore: []
})

// Adding custom functions
Parser.addFuction('uppercase', (text: string, data: FunctionStructure) => {
    return text.replace(data.itself, data.inside.toUppercase())
})
// Deleting functions
Parser.deleteFunction('uppercase')
// Adding custom variables
Parser.addVariable('hi', 'bye') // {hi} will be replaced to bye
// Deleting variables
Parser.deleteVariable('hi')

// The parser itself:
Parser.parse('hi {USER.NAME}', interaction)
// With messages:
Parser.parse('hi {USER.NAME}', message)
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
