import { Client } from "discord.js"
export type Brackets = 1 | 2

export interface TokyoScriptOptions {
    brackets: Brackets,
    separator: string,
    ignore?: string[],
    allowEmbeds?: boolean
}

export interface FunctionStructure {
    name: string,
    regexp: RegExpMatchArray | null,
    inside: string,
    itself: string,
    splits: string[]
}

export interface MessageObject {
    embeds: any[]
    content: string,
    allowedMentions?: any,
    files?: any
}

export interface BasicFunction {
    name: string,
    execute: (text: string, data: FunctionStructure) => void
}

export class TokyoScript {
    constructor(client: Client, options?: TokyoScriptOptions);
    public interprete(text: string, context: any): string | MessageObject;
    public addFunction(func: BasicFunction): void;
    public deleteFunction(name: string): void;
    public addVariable(name: string, value: string): void;
    public deleteVariable(name: string): void;
    public get(type: InterpreterTypes)
}