interface Person {
    name: string
    age: number
}

type PersonKeys = keyof Person //'name' or age

let key: PersonKeys = 'name'

type User = {
    _id: number
    name: string
    email: string
    createdAt: Date
}

type UserKeysNoMeta = Exclude<keyof User, '_id' | 'createdAt'>

type userKeysNoMeta = Pick<User, 'name' | 'email'>

let u1: UserKeysNoMeta = 'name'
