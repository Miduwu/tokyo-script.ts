import { Client } from "discord.js"

export interface TokyoScriptOptions {
    brackets: { start: string, end: string },
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
    content: string
}

export interface BasicFunction {
    name: string,
    execute: (text: string, data: FunctionStructure) => void
}

export class TokyoScript {
    constructor(client: Client, options?: TokyoScriptOptions);
    public parse(text: string, context: any): string;
    public addFunction(name: string, func: Function): void;
    public deleteFunction(name: string): void;
    public addVariable(name: string, value: string): void;
    public deleteVariable(name: string): void;
}