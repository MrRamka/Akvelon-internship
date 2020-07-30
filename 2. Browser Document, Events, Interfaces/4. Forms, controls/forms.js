// get the form
let form = document.forms.my; // <form name="my"> element

// get the element
let elem = form.elements.one; // <input name="one"> element

console.log(elem.value); // 1

form = document.forms[1];

let ageElems = form.elements.age;

console.log(ageElems[0].value); // [object HTMLInputElement]

form = document.getElementById("form");
console.log(form.elements.login); // <input name="login">

let fieldset = form.elements.userFields;
console.log(fieldset); // HTMLFieldSetElement

// we can get the input by name both from the form and from the fieldset
console.log(fieldset.elements.login === form.elements.login);

//child -> form
console.log(fieldset.form);

//value and checked

//select adn option
select.options[2].selected = true;
select.selectedIndex = 2;
select.value = 'banana';

// get all selected values from multi-select
let selected = Array.from(select1.options)
    .filter(option => option.selected)
    .map(option => option.value);

console.log(selected); // blues,rock

//new Option
// option = new Option(text, value, defaultSelected, selected);
let option = new Option("Text", "value");


//Events focus/blur
input.onblur = function() {
    if (!input.value.includes('@')) { // not email
        input.classList.add('invalid');
        error.innerHTML = 'Please enter a correct email.'
    }
};

input.onfocus = function() {
    if (this.classList.contains('invalid')) {
        // remove the "error" indication, because the user wants to re-enter something
        this.classList.remove('invalid');
        error.innerHTML = "";
    }
};

//Allow focusing on any element: tabindex
/*
tabindex="0" puts an element among those without tabindex. T
hat is, when we switch elements, elements with tabindex=0 go after elements with tabindex ≥ 1.

Usually it’s used to make an element focusable, but keep the default
switching order. To make an element a part of the form on par with <input>.

tabindex="-1" allows only programmatic focusing on an element.
The Tab key ignores such elements, but method elem.focus() works.
 */


//focusin/focusout - focusin and focusout events – exactly the same as focus/blur, but they bubble

//Summary

/*
Events focus and blur trigger on focusing/losing focus on the element.

Their specials are:

They do not bubble. Can use capturing state instead or focusin/focusout.
Most elements do not support focus by default. Use tabindex to make anything focusable.
The current focused element is available as document.activeElement
 */


//Events
// The change event triggers when the element has finished changing.
select.onchange = () => console.log(select.options[select.selectedIndex].value);

//The input event triggers every time after a value is modified by the user
input1.oninput = function() {
    result.innerHTML = input1.value;
};
//These events occur on cutting/copying/pasting a value.
input.oncut = input.oncopy = input.onpaste = function(event) {
    console.log(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
};
//Summary

/*
change	        A value was changed.            	For text inputs triggers on focus loss.
input	        For text inputs on every change.	Triggers immediately unlike change.
cut/copy/paste	Cut/copy/paste actions.	            The action can be prevented. The event.clipboardData property
                                                    gives read/write access to the clipboard.
 */

//submit
form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// the form must be in the document to submit it
document.body.append(form);

form.submit();

/*
There are two main ways to submit a form:

The first – to click <input type="submit"> or <input type="image">.
The second – press Enter on an input field.
 */
