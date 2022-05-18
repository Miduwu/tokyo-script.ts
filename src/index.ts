import { BasicFunction, EmbedFunction, FunctionStructure, MessageObject, TokyoScriptOptions} from "./wind/interfaces";
import { RandomNumber, Random } from "./wind/functions";
import { Client, MessageEmbed } from "discord.js";
import { Parse } from './wind/variables'
import Embeds from './wind/embeds'

class TokyoScript {
    functions: Map<string, BasicFunction>
    embed_functions: Map<string, EmbedFunction>
    custom_vars: any[]
    client: Client
    brackets: { start: string, end: string }
    options: TokyoScriptOptions
    constructor(client: Client, options?: TokyoScriptOptions) {
        if(!(client instanceof Client)) throw new TypeError('TokyoScript: Invalid client provided in constructor.')
        this.functions = new Map()
        this.custom_vars = []
        this.embed_functions = new Map()
        this.options = {
            brackets: options?.brackets || 1,
            separator: options?.separator || ',',
            allowEmbeds: options?.allowEmbeds === false ? false: true,
            ignore: []
        }
        let brackets =  this.options.brackets == 1 ? '{ }': this.options.brackets == 2 ? '\\[ \\]': '{ }'
        this.brackets = { start: brackets.split(' ')[0], end: brackets.split(' ')[1] }
        this.client = client
        this.load_functions()
    }
    private unpack(func: string): FunctionStructure {
        const name = func.split(':')[0].toLowerCase()
        const inside = func.match((new RegExp(`:[^${this.brackets!.end}]+`)))![0].replace(':', '')
        return {
            name: name.replace(/[^a-zA-Z]/g, ''),
            inside: inside,
            splits: inside.split(this.options.separator!),
            itself: func,
            regexp: func.match((new RegExp(`${this.brackets!.start}[a-zA-Z]+:[^${this.brackets!.end}]+${this.brackets!.end}`)))
        }
    }
    private parse_functions(text: string): string {
        if(!text) return ''
        let functions = text.match((new RegExp(`${this.brackets!.start}(${Array.from(this.functions, ([name, value]) => name).join('|')})+:[^${this.brackets!.end}]+${this.brackets!.end}`, "gi")))
        if(!functions) return text
        let final: string = text
        for(const func of functions) {
            let _ = this.unpack(func)
            let Func = this.functions.get(_.name)
            if(!_.inside || !Func || this.options.ignore?.includes(_.name)) continue;
            
            final = Func.code(final, _)
        }
        return final
    }
    private parse_embeds(text: string): MessageObject {
        if(!text) return { content: null, embeds: [] }
        const embed = new MessageEmbed()
        let functions = text.match((new RegExp(`${this.brackets!.start}[a-zA-Z]+:[^${this.brackets!.end}]+${this.brackets!.end}`, "g")))
        if(!functions) return { content: text, embeds: [] }
        let final: MessageObject = { content: text, embeds: [] }
        for(const func of functions) {
            let _ = this.unpack(func)
            let Func = this.embed_functions.get(_.name)
            if(!_.inside ||!Func || this.options.ignore?.includes(_.name)) continue;
            final = Func.code(final, _, embed)
        }
        final.embeds = !embed.title && !embed.description && !embed.image && !embed.thumbnail && !embed.author && !embed.footer ? []: [embed]
        final.content = final.content?.trim() || null
        return final
    }
    private parse_variables(text: string, context: any): string {
        if(!text) return ''
        return Parse(text, context, this.brackets, this.custom_vars || [])
    }
    private load_functions(): void {
        this.addFunction(Random)
        this.addFunction(RandomNumber)
        for(const func of Embeds.functions) {
            this.embed_functions.set(func.name, { name: func.name, code: func.code })
        }
    }
    interprete(text: string, context: any): MessageObject | string {
        if(!text) return ''
        if(!context && this.options.allowEmbeds) throw new TypeError('TokyoScript: Invalid context provided. Try with: Message | Interaction | GuildMember')
        let without_embeds = this.parse_functions(this.parse_variables(text, context))
        let with_embeds = this.parse_embeds(without_embeds)
        return this.options.allowEmbeds ? with_embeds: without_embeds
    }
    addFunction(func: BasicFunction): void {
        if(!func.name || !func) throw new TypeError('TokyoScript: Missing parameters in addFunction()')
        if(typeof func.name !== 'string') throw new TypeError('TokyoScript: Invalid parameters provided in addFunction().')
        if(this.functions.has(func.name.toLowerCase())) throw new TypeError('TokyoScript: This function already exists.')
        this.functions.set(func.name.toLowerCase(), func)
    }
    deleteFunction(name: string): void {
        if(!name) throw new TypeError('TokyoScript: Missing name in deleteFunction()')
        if(typeof name !== 'string') throw new TypeError('TokyoScript: Invalid name provided in addFunction()')
        if(!this.functions.has(name.toLowerCase())) throw new TypeError('TokyoScript: This function doesn\'t exist.')
        this.functions.delete(name.toLowerCase())
    }
    addVariable(name: string, value: string): void {
        if(!name || !value) throw new TypeError('TokyoScript: Missing parameters in addVariable()')
        if(typeof name !== 'string' || typeof value !== 'string') throw new TypeError('TokyoScript: Invalid parameters provided in addVariable()')
        if(this.custom_vars.some(v => v.name === name.toLowerCase())) throw new TypeError('TokyoScript: This variable already exists.')
        this.custom_vars.push({name, value})
    }
    deleteVariable(name: string): void {
        if(!name) throw new TypeError('TokyoScript: Missing name in deleteVariable()')
        if(typeof name !== 'string') throw new TypeError('TokyoScript: Invalid name provided in addVariable()')
        if(!this.custom_vars.some(v => v.name === name.toLowerCase())) throw new TypeError('TokyoScript: This variable doesn\'t exist.')
        this.custom_vars = this.custom_vars.filter(v => v.name !== name.toLowerCase())
    }
}

export { TokyoScript }
export * from './wind/interfaces'