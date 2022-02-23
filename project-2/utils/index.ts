export function isEmpty(data: any[] | Record<string, any> | string) {
    if (Array.isArray(data) || typeof data == 'string') return data.length === 0
    return Object.keys(data).length === 0
}