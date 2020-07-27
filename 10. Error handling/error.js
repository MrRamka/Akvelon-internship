// try catch

try {
    // code...
} catch (err) {
    // error handling
}

//Error object
/*
-name
-message
-stack
*/
try {
    lalala; // error, variable is not defined!
} catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
    console.log(err);
}

// throw errors
// throw <error object>

let referenceError = ReferenceError("no such ")

/*
try {
   ... try to execute the code ...
} catch(e) {
   ... handle errors ...
} finally {
   ... execute always ...
}
*/

//global errors

/*
window.onerror = function(message, url, line, col, error) {
  // ...
};
*/

//creating custom error
class ValidationError extends Error {
    constructor(message) {
        super(message); // (1)
        this.name = "ValidationError"; // (2)
    }
}