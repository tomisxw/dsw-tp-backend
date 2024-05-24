export interface Repository<T>{
    findAll(): T[] | undefined
    findOne(item: {codigo: string}): T | undefined
    add(item: T): T | undefined
    update(item: T) : T | undefined
    delete(item: {codigo: string}): T | undefined
}