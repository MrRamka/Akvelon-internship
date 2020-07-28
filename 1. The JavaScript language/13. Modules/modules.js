/*
A module is a file. To make import/export work, browsers need <script type="module">
Modules have their own, local top-level scope and interchange functionality via import/export
Modules always use strict
Module code is executed only once. Exports are created once and shared between importers
 */


// Export and Import
// Export before declarations
export let days = [1, 2, 3];
export const MATH_PI = 3.1415;

export class User {
    constructor(name) {
        this.name = name;
    }
}

// Export apart from declarations
let number = 1;
export {number};

//import * as <obj>

/*
Named export	            Default export
export class User {...}	    export default class User {...}
import {User} from ...	    import User from ...
 */

function sayHi(user) {
    alert(`Hello, ${user}!`);
}

// same as if we added "export default" before the function
export {sayHi as default};
//Here’s how to import the default export along with a named one:
//import {default as User, sayHello} from './user.js'

//A word against default exports

/*
import User from './user.js'; // works
import MyUser from './user.js'; // works too
// could be import Anything... and it'll still work
can use any name
 */

//Re export
/*
export {sayHi} from './say.js'; // re-export sayHi
export {default as User} from './user.js'; // re-export default
 */

//Summary
/*
Export:
Before declaration of a class/function/…:
    export [default] class/function/variable ...
Standalone export:
    export {x [as y], ...}.
Re-export:
    export {x [as y], ...} from "module"
    export * from "module" (doesn’t re-export default).
    export {default [as y]} from "module" (re-export default).

Import:
Named exports from module:
    import {x [as y], ...} from "module"
Default export:
    import x from "module"
    import {default as x} from "module"
Everything:
    import * as obj from "module"
Import the module (its code runs), but do not assign it to a variable:
    import "module"
 */

//Dynamic imports

/*
import(modulePath)
  .then(obj => <module object>)
  .catch(err => <loading error, e.g. if no such module>)

let module = await import(modulePath)


The import(module) expression loads the module and returns a
promise that resolves into a module object that contains all its exports
 */
