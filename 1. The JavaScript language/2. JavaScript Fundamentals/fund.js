"use strict";

/* Commenting out the code
alert("I’m JavaScript!");
*/
// alert("I’m JavaScript!");

let message = 'message';

console.log(message)
let $ = 1; // declared a variable with the name "$"
let _ = 2; // and now a variable with the name "_"

console.log($ + _); // 3

const COLOR_RED = "#F00";

//Task 2
let admin, name = 'John';
admin = name;
console.log(admin);


//Data types

//Number
let number = 12; //The number type represents both integer and floating point numbers.
number = 12.4

//BigInt
// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;

//String
let str = "Hello";
let phrase = `can embed another ${str}`;
console.log(phrase)

//Boolean (logical type)
const trueValue = true;
const falseValue = false;

//The “null” value
//“reference to a non-existing object” or a “null pointer”
let age = null;

//The “undefined” value
let ageUndefined;
console.log(ageUndefined)

//Objects and Symbols

//The typeof operator
// The typeof operator returns the type of the argument.
console.log(typeof 0) // "number"
console.log(typeof 10n) // "bigint"


/*
Summary
There are 8 basic data types in JavaScript.

number - for numbers of any kind: integer or floating-point, integers are limited by ±253.
bigint - is for integer numbers of arbitrary length.
string - for strings. A string may have zero or more characters, there’s no separate single-character type.
boolean - for true/false.
null - for unknown values – a standalone type that has a single value null.
undefined - for unassigned values – a standalone type that has a single value undefined.
object - for more complex data structures.
symbol - for unique identifiers.
The typeof operator allows us to see which type is stored in a variable.

Two forms: typeof x or typeof(x).
Returns a string with the name of the type, like "string".
For null returns "object" – this is an error in the language, it’s not actually an object.
 */


//Alert, prompt, confirm
// age = prompt('How old are you?', 100);

// alert(`You are ${age} years old!`); // You are 100 years old!
// let isBoss = confirm("Are you the boss?");
// alert(isBoss); // true/false

//String Conversion String(value)
//Numeric Conversion Number(value)

//Math + - * / % **
//The unary plus or, in other words, the plus operator + applied to a single value,
// doesn’t do anything to numbers. But if the operand is not a number,
// the unary plus converts it into a number.

// Converts non-numbers
console.log(+true);
console.log(+"")

//Increment(++)/decrement(--)
//postfix value++
//prefix ++value


//Bitwise operators
//The list of operators:
//
// AND ( & )
// OR ( | )
// XOR ( ^ )
// NOT ( ~ )
// LEFT SHIFT ( << )
// RIGHT SHIFT ( >> )
// ZERO-FILL RIGHT SHIFT ( >>> )


//Comparisons
//== non-strict check
//A strict equality operator === checks the equality without type conversion.

/*
if(){
}else if(){
}else{
}
 */
//let result = condition ? value1 : value2;


// ?? and ||
/*
|| returns the first truthy value.
?? returns the first defined value.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table
 */

let height = 0;

console.log(height || 100); // 100
console.log(height ?? 100); // 0

//Loops
/*
while
do...while
for(;;)

break
continue
 */

//Labels for break/continue

/*
labelName: for (...) {
  ...
}
break labelName;
*/

//Function Declaration
function helloWorld() {
    console.log('Hello world');
}

helloWorld();

//args and default values
function argFunction(value = 'test') {
    console.log(value)
}

function showMessage(text) {
    text = text || 'empty';
    console.log(text);
}

//Function expressions
let sayHi = function (text = "Hello Function expressions") {
    console.log(text);
};
sayHi();
let copySayHi = sayHi;
copySayHi('I am copy of sayHi');


//Callback functions

/*
We’ll write a function ask(question, yes, no) with three parameters:

question
Text of the question
yes
Function to run if the answer is “Yes”
no
Function to run if the answer is “No”

function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
*/

/*
Functions are values. They can be assigned, copied or declared in any place of the code.
If the function is declared as a separate statement in the main code flow, that’s called a “Function Declaration”.
If the function is created as a part of an expression, it’s called a “Function Expression”.
Function Declarations are processed before the code block is executed. They are visible everywhere in the block.
Function Expressions are created when the execution flow reaches them.
 */

// Arrow functions
/*
let func = (arg1, arg2, ...argN) => expression
*/
let sum = (first, second) => first + second

//Multiline arrow functions (...args) => { body }
let bigFunction = (arg1, arg2) => {
    console.log(arg1);
    console.log(arg2);
};

