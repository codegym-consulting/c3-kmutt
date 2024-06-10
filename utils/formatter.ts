export const formatName = (name: string) => {
    return name.split(' ')[0] + ' ' + name.split(' ')[1].charAt(0) + '.'
}