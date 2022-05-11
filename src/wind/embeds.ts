import { MessageEmbed } from 'discord.js'
import { MessageObject } from 'index'
import { FunctionStructure } from './interfaces'

export default {
    functions: [
        {
            name: 'title',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                embed.setTitle(data.inside)
                object.content = object.content.replace(data.itself, '')
                return object
            }
        },
        {
            name: 'description',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                embed.setDescription(data.inside)
                object.content = object.content.replace(data.itself, '')
                return object
            }
        },
        {
            name: 'image',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                embed.setImage(data.inside)
                object.content = object.content.replace(data.itself, '')
                return object
            }
        },
        {
            name: 'thumbnail',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                embed.setThumbnail(data.inside)
                object.content = object.content.replace(data.itself, '')
                return object
            }
        },
        {
            name: 'color',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                let color: any = data.inside
                embed.setColor(color)
                object.content = object.content.replace(data.itself, '')
                return object
            }
        },
        {
            name: 'footer',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                embed.setFooter({text: data.splits[0] || '', iconURL: data.splits[1] || ''})
                object.content = object.content.replace(data.itself, '')
                return object
            }
        },
        {
            name: 'author',
            code: (object: MessageObject, data: FunctionStructure, embed: MessageEmbed) => {
                embed.setAuthor({name: data.splits[0] || '', iconURL: data.splits[1] || ''})
                object.content = object.content.replace(data.itself, '')
                return object
            }
        }
    ]
}