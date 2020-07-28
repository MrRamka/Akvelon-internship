//creating an object
let firstUser = Object()
let user = {}

user = {
    name: "Ramka",
    age: 20
}
console.log(user.name)

// delete property
delete user.age

user = {
    name: "John",
    age: 23,
    "likes birds": true //multiword property must be quoted
}

user = {};

// set property
user["likes birds"] = true;

function createUser(name, age) {
    return {
        name,
        age
    }
}

user = createUser("Ramka", 20);
console.log(user.name);


//Property existence test, “in” operator
console.log("likes" in user); //false

// name, age
for (let key in user) {
    console.log(key)
}

// task isEmpty function for object
let schedule = {};

function isEmpty(schedule) {
    for (let key in schedule) {
        return true;
    }
    return false;
}

console.log(isEmpty(schedule)); // true
schedule["8:30"] = "get up";
console.log(isEmpty(schedule)); // false
// end task

// task count salary
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

function countSalary(salaries) {
    let salaryAmount = 0
    for (let salariesKey in salaries) {
        salaryAmount += +salaries[salariesKey];
    }
    return salaryAmount;
}

console.log(countSalary(salaries));
//end task

// task Multiply numeric properties by 2
function multiplyNumeric(object) {
    for (let objectKey in object) {
        if (typeof object[objectKey] === "number") {
            object[objectKey] *= 2;
        }
    }
}

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

multiplyNumeric(menu);

// after the call
console.log(menu.width);
console.log(menu.height);
console.log(menu.title);
//end task

//Object.assign(dest, [src1, src2, src3...]) to copy object


//this
user = {
    name: "John",
    age: 23,
    sayName() {
        console.log(this.name)
    }
};
user.sayName();

//task create a calculator read(), sum(), mul()
let calculator = {

    read() {
        this.firstValue = +prompt('firstValue?', 0);
        this.secondValue = +prompt('secondValue', 0);
    },
    sum() {
        if (this.firstValue && this.secondValue) {
            return this.firstValue + this.secondValue;
        }
        return 0;
    },
    mul() {
        if (this.firstValue && this.secondValue) {
            return this.firstValue * this.secondValue;
        }
        return 0;
    }
}
calculator.read();
console.log(`Calculator ${calculator.sum()}`);
//end task

//task chaining ladder ladder.up().up().down().showStep();

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this
    },
    down() {
        this.step--;
        return this
    },
    showStep: function () { // shows the current step
        console.log(this.step);
        return this
    }
};
ladder.up().up().down().showStep();
//end task


//Constructor, operator "new"
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let man = new User("Mark");
console.log(man.name);

/*
function User() {
  console.log(new.target);
}
//without "new":
User(); // undefined

// with "new":
new User(); // function User { ... }
*/

//methods in constructor
function UserWithFunction(name) {
    this.name = name;
    this.isAdmin = false;
    this.sayName = function () {
        console.log(this.name);
    }
}

user2 = new UserWithFunction("Mark");
user2.sayName();

//task Accumulator
function Accumulator(initialValue) {
    this.value = initialValue;
    this.read = function () {
        this.value += +prompt("Enter size", 0);
    }
}

//end task

//The optional chaining ?. stops
//the evaluation and returns undefined
// if the part before ?. is undefined or null.
user = {}; // user has no address
console.log(user?.address?.street); // undefined

//Short-circuiting
user = null;
let x = 0;
user?.sayHi(x++); // nothing happens
console.log(x); // 0, value not incremented

//Also works with ?.(), ?.[]
//user1.admin?.();
//user1?.[key]


//Symbols
// A “symbol” represents a unique identifier.
let id = Symbol("id");
//If we want to use a symbol in an object literal {...}, we need square brackets around it.
/*
{
    [id]: 123;
}
 */
//Symbols are skipped by for…in

// In order to read (create if absent) a symbol from the registry, use Symbol.for(key).
// id = Symbol.for("id");
newId = Symbol.for("id");
console.log(newId === id);

//Symbol.toPrimitive
user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint === "string" ? `{name: "${this.name}"}` : this.money;
    }
};
console.log(user);
console.log(+user);
console.log(user + 100);

/*
here are 3 types (hints) of it:

"string" (for alert and other operations that need a string)
"number" (for maths)
"default" (few operators)

Call obj[Symbol.toPrimitive](hint) if the method exists,
Otherwise if hint is "string"
try obj.toString() and obj.valueOf(), whatever exists.
Otherwise if hint is "number" or "default"
try obj.valueOf() and obj.toString(), whatever exists.
*/