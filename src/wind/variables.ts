function force(object: Record<string, any>, key: string): string | null {
    if(!(key in object)) return null
    return object[key]
}

export function Parse(text: string, context: any, brackets: any, custom?: any[]): string {
    const date = new Date(new Date().toLocaleString('en-US'));
    const vars = {
        'user.id': context.author?.id || context.user?.id,
        'user.name': context.author?.username || context.user?.username,
        'user.tag': context.author?.tag || context.user?.tag,
        'user.mention': context.author?.toString() || context.user?.toString(),
        'user.discriminator': context.author?.discriminator || context.user?.discriminator,
        'user.avatar': context.author?.displayAvatarURL({size: 512, dynamic: true}) ?? context.user?.displayAvatarURL({size: 512, dynamic: true}),
        'server.id': context.guild?.id,
        'server.name': context.guild?.name,
        'server.members': context.guild?.memberCount?.toString(),
        'server.icon': context.guild?.iconURL({size: 512, dynamic: true}),
        'server.owner.id': context.guild?.ownerId,
        'date.now': `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
        'blank': ' ',
        'break': '\n' 
    }
    let final: string = text
    const keys = Object.keys(vars)
    for(const key of keys) {
        let reg = new RegExp(`${brackets.start}${key}${brackets.end}`, 'gi')
        final = final.replace(reg, force(vars, key)!)
    }
    if(custom) {
        let customs = custom.map(v => v.name)
        for(const c of customs) {
            let reg = new RegExp(`${brackets.start}${c}${brackets.end}`, 'gi')
            final = final.replace(reg, custom.find(v => v.name == c.toLowerCase()).value)
        }
    }
    return final
}