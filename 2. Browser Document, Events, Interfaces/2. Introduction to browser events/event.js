/*
Mouse events:
click – when the mouse clicks on an element (touchscreen devices generate it on a tap).
contextmenu – when the mouse right-clicks on an element.
mouseover / mouseout – when the mouse cursor comes over / leaves an element.
mousedown / mouseup – when the mouse button is pressed / released over an element.
mousemove – when the mouse is moved.

Keyboard events:
keydown and keyup – when a keyboard key is pressed and released.

Form element events:
submit – when the visitor submits a <form>.
focus – when the visitor focuses on an element, e.g. on an <input>.

Document events:
DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built.

CSS events:
transitionend – when a CSS-animation finishes.
 */

/*
There are 3 ways to assign event handlers:

HTML attribute: onclick="...".
DOM property: elem.onclick = function.
Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.
 */

//Bubbling and capturing
// The most deeply nested element that caused the event
// is called a target element, accessible as event.target


//Stopping bubbling
//event.stopPropagation()
//event.stopImmediatePropagation() stop all propagation


/*
Each handler can access event object properties:
event.target – the deepest element that originated the event.
event.currentTarget (=this) – the current element that handles the event (the one that has the handler on it)
event.eventPhase – the current phase (capturing=1, target=2, bubbling=3).
*/

class Menu {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
        console.log('save');
    }

    load() {
        console.log('download');
    }

    search() {
        console.log('find');
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

new Menu(menu);


/*
There are two ways to tell the browser we don’t want it to act:

The main way is to use the event object. There’s a method event.preventDefault().
If the handler is assigned using on<event> (not by addEventListener),
then returning false also works the same.
 */

/*
Many people like to use “right click” – “open in a new window”.
If we use <button> or <span>, that doesn’t work.
Search engines follow <a href="..."> links while indexin
 */

/*
mousedown – starts the selection (move the mouse to select).
click on <input type="checkbox"> – checks/unchecks the input.
submit – clicking an <input type="submit"> or hitting Enter inside a
form field causes this event to happen, and the browser submits the form after it.
keydown – pressing a key may lead to adding a character into a field, or other actions.
contextmenu – the event happens on a right-click, the action is to show the browser context menu.
 */

// catch on document...
document.addEventListener("hello", function(event) { // (1)
    console.log("Hello from " + event.target.tagName); // Hello from H1
});

// ...dispatch on elem!
let event = new Event("hello", {bubbles: true}); // (2)
elem.dispatchEvent(event);

// the handler on document will activate and display the message.

/*
UIEvent
FocusEvent
MouseEvent
WheelEvent
KeyboardEvent
 */
event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    clientX: 100,
    clientY: 100
});

console.log(event.clientX);

//new CustomEvent
// additional details come with the event to the handler
elem.addEventListener("hello", function(event) {
    console.log(event.detail.name);
});

elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "John" }
}));

/*
The generic Event(name, options) constructor accepts an
arbitrary event name and the options object with two properties:

bubbles: true if the event should bubble.
cancelable: true if the event.preventDefault() should work.
 */

