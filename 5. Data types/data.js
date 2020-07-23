'use strict';
/*
wrappers String() Number() Boolean() Symbol()
null/undefined have no methods
 */

//Numbers
/*
2 types
-regular number (64-bit)
-bigInt
 */
let n1 = 1e8;
console.log(n1);
let n2 = 1e-4;
console.log(n2);

//Hex, binary and octal numbers
let hex = 0x123d;
let oct = 0o17;
let bin = 0b10111;

//toString(base) returns a string representation with given base
console.log(hex.toString(10));
console.log(123..toString(3));//.. - call methods(one dot(.) float number)
// Rounding
/*
Math.floor
Math.ceil
Math.round
Math.trunc (not supported by Internet Explorer) - Removes anything after the decimal point without rounding
num.toFixed(precision)
 */

//isFinite and isNaN
// parseInt(str, radix) and parseFloat
let emValue = '12em';
console.log(parseInt(emValue));

/*
Math methods
max()
min()
random() between 0 and 1
pow()
 */

//String
let string1 = "";
let string2 = '';
let string3 = `hello ${string1}
                 double line`;
//Special characters
/*
\n
\r
\t
\' \"
\\
\b \f\ \v
\xXX
\uXXXX \u{XX...XX}
 */
console.log("\u{1F60D}");

console.log(string3[2]);
console.log(string3.charAt(3));

/*
.toUpperCase()
.toLowerCase()
str.indexOf(substr, pos) str.lastIndexOf(substr, position)
 */

//~n equals -(n + 1)
// if (~str.indexOf(...))

// includes, startsWith, endsWith
//

// str.slice(start [, end])
string3.slice(1);
// str.substring(start [, end])
string3.substring(2);

/*
slice(start, end)	from start to end (not including end)	allows negatives
substring(start, end)	between start and end	negative values mean 0
substr(start, length)	from start get length characters	allows negative start
 */


// str.codePointAt(pos)
string3.codePointAt(1);

let zLetter = String.fromCodePoint(90);
//.localeCompare()

let s1 = 'S\u0307\u0323'; // Ṩ, S + точка сверху + точка снизу
console.log(s1);

// .normalize()

//task Uppercase the first character
function ucFirst(value) {
    let newValue;
    if (value.length > 0) {
        newValue = value[0].toUpperCase().concat(value.substring(1));
    }
    return newValue;
}

console.log(ucFirst("test") === "Test");
//endTask

//checkSpam function
const spamWords = ['test1', 'test2']

function checkSpam(message) {
    for (const spamWordsKey in spamWords) {
        if (message.toLowerCase().includes(spamWordsKey)) return false;
    }
    return true;
}

console.log(checkSpam("Hello world"));
console.log(checkSpam("test1 qwerty"))

//end task

//Arrays
let array = [] //init

//Methods pop/push last, shift/unshift first
let fruits = ["Apple", "Orange", "Pear"];
console.log(`Init ${fruits}`);
// pop remove last
console.log(fruits.pop());
console.log(fruits);
//push add last
fruits.push("Pear");
console.log(fruits);
//shift remove first
console.log(fruits.shift());
console.log(fruits);
//unshift add first
fruits.unshift("Pear");
console.log(fruits);

//Methods push and unshift can add multiple elements at once:


//Task: A maximal subarray
console.log("Array task")

function getMaxSubSum(array) {
    let maxSum = 0;
    let currentSum = 0;

    for (let i = 0; i < array.length; i++) {
        currentSum += array[i];
        if (currentSum > maxSum) {
            maxSum = currentSum;
        }
        if (currentSum < 0) {
            currentSum = 0;
        }
    }
    return maxSum;

}

console.log(getMaxSubSum([-1, 2, 3, -9]) === 5);
console.log(getMaxSubSum([2, -1, 2, 3, -9]) === 6);
console.log(getMaxSubSum([-1, 2, 3, -9, 11]) === 11);
console.log(getMaxSubSum([-2, -1, 1, 2]) === 3);
console.log(getMaxSubSum([100, -9, 2, -3, 5]) === 100);
console.log(getMaxSubSum([1, 2, 3]) === 6);

//endTask


//Array methods
console.log(fruits);
fruits.splice(1, 1); //remove element
console.log(fruits);

/*
let arr = [1, 2, 3, 4, 5];
arr.slice([start], [end]);
arr.concat(arg1, arg2...);
arr.forEach(function(item, index, array) {
  // ... do something with item
});
arr.indexOf();

let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});

let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});

let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});

sort(fn);
The items are sorted as strings by default.
reverse()
split()
join()

let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);

*/


//Task: Translate border-left-width to borderLeftWidth
function camelize(value) {
    let newValue = value;
    newValue = newValue.split('-')
        .map(
            (word, index) => index === 0 ? word : word[0].toUpperCase() + word.slice(1)
        ).join('');
    return newValue;
}

console.log("camelize Task")
console.log(camelize("background-color") === 'backgroundColor');
console.log(camelize("list-style-image") === 'listStyleImage');
console.log(camelize("-webkit-transition") === 'WebkitTransition');
//endTask

//task Sort in decreasing order
let arr = [5, 2, 1, -10, 8];
arr.sort(((a, b) => b - a));
console.log(arr); // 8, 5, 2, 1, -10
//endTask

//Task Get average age
let john = {name: "John", age: 25};
let pete = {name: "Pete", age: 30};
let mary = {name: "Mary", age: 29};

arr = [john, pete, mary];

function getAverageAge(array) {
    let amount = array.reduce((amount, item) => amount + item?.age, 0);
    return amount / array.length;
}

console.log(getAverageAge(arr));
//end task

//task sort by age
function sortByAge(arr) {
    arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

arr = [pete, john, mary];

sortByAge(arr);
console.log(arr);
//end task

/*
Objects that can be used in for..of are called iterable.

Technically, iterables must implement the method named Symbol.iterator.
The result of obj[Symbol.iterator] is called an iterator. It handles the further iteration process.
An iterator must have the method named next() that returns an object
{done: Boolean, value: any}, here done:true denotes the end of the iteration
process, otherwise the value is the next value.
The Symbol.iterator method is called automatically by for..of, but we also can do it directly.
Built-in iterables like strings or arrays, also implement Symbol.iterator.
String iterator knows about surrogate pairs.
 */










