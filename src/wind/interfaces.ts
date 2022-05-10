import { MessageEmbed } from "discord.js"

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
    code: (text: string, data: FunctionStructure) => string
}

export interface EmbedFunction {
    name: string,
    code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => MessageObject
}