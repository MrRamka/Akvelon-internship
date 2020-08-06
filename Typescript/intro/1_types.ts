//Types
const isFetching: boolean = true;

const int: number = 43;
const float: number = 3.4;
const num: number = 2e10;

const message: string = 'Hello';

const numberArray: number[] = [1, 2, 3, 5];
const array: Array<number> = [3, 5, 6];

const words: Array<string> = ['Hello', 'Ts'];

//Tuple
const contact: [string, number] = ['Vladimir', 1234];

//Any
let variable: any = 32;
variable = 'new';

// ====================
function sayName(name: string): void {
    console.log(name);
}

sayName('Vladimir');

//Never

function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {

    }
}

//Type
type Login = string;

const login: Login = 'admin';

type ID = string | number;

const id1: ID = '123';
const id2: ID = 123;

type SomeType = string | null | undefined;
