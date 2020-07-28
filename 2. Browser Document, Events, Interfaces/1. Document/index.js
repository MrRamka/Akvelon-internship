//window

/*
        window
DOM     BOM     JS
 */
console.log(window.innerHeight);

//Document Object Model, or DOM for short, represents all page
// content as objects that can be modified.

document.body.style.background = "#ddd";

//change color after 1 second
setTimeout(() => document.body.style.background = "#aaa", 1000);

//DOM is not only for browsers

//BOM (Browser Object Model)
console.log(navigator.userAgent);
console.log(navigator.platform);


// DOM tree
/*
document – the “entry point” into DOM.
element nodes – HTML-tags, the tree building blocks.
text nodes – contain text.
comments – sometimes we can put information there, it won’t be shown, but JS can read it from the DOM.
 */

/*
An HTML/XML document is represented inside the browser as the DOM tree.

Tags become element nodes and form the structure.
Text becomes text nodes.
…etc, everything in HTML has its place in DOM, even comments.
 */


// for (let i = 0; i < document.body.childNodes.length; i++) {
//     console.log( document.body.childNodes[i] );
// }
for (let node of document.body.childNodes) {
    console.log(node);
}

/*
For all nodes:
    parentNode,
    childNodes,
    firstChild,
    lastChild,
    previousSibling,
    nextSibling.

For element nodes only:
    parentElement,
    children,
    firstElementChild,
    lastElementChild,
    previousElementSibling,
    nextElementSibling.
 */
let elem = document.getElementById('elem');
elem.style.background = '#eee';

//querySelectorAll

let elements = document.querySelectorAll('#elem');
for (const element of elements) {
    console.log(element.innerHTML);
}

//querySelector - first element

// elem.matches(css)
for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
        console.log("The archive reference: " + elem.href);
    }
}

//closest
// The method elem.closest(css) looks the nearest ancestor that matches the CSS-selector

/*
<h1>Contents</h1>
<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>
 */

let chapter = document.querySelector('.chapter'); // LI

console.log(chapter.closest('.book')); // UL
console.log(chapter.closest('.contents')); // DIV

console.log(chapter.closest('h1')); // null (because h1 is not an ancestor)

/*
Live collections
All methods "getElementsBy*" return a live collection.
Such collections always reflect the current state
of the document and “auto-update” when it changes.
 */
/*

Method	                Searches by...	Can call on an element?	Live?
querySelector	        CSS-selector	 ✔	                    -
querySelectorAll	    CSS-selector	 ✔	                    -
getElementById	        id	             -	                    -
getElementsByName	    name 	         -	                    ✔
getElementsByTagName	tag or '*'	     ✔                  	✔
getElementsByClassName	class	         ✔                  	✔
 */

/*
nodeType
    We can use it to see if a node is a text or an element node.
    It has a numeric value: 1 for elements,
    3 for text nodes,
    and a few others for other node types. Read-only.
nodeName/tagName
    For elements, tag name (uppercased unless XML-mode).
    For non-element nodes nodeName describes what it is. Read-only.
innerHTML
    The HTML content of the element. Can be modified.
outerHTML
    The full HTML of the element. A write operation into elem.outerHTML
    does not touch elem itself. Instead it gets replaced with the
    new HTML in the outer context.
nodeValue/data
    The content of a non-element node (text, comment).
    These two are almost the same, usually we use data. Can be modified.
textContent
    The text inside the element: HTML minus all <tags>.
    Writing into it puts the text inside the element, with all special
    characters and tags treated exactly as text. Can safely insert user-generated
    text and protect from unwanted HTML insertions.
hidden
    When set to true, does the same as CSS display:none.
 */

//Attributes and properties
document.body.myData = {
    name: 'Caesar',
    title: 'Imperator'
};

console.log(document.body.myData.title);

/*
elem.hasAttribute(name) – checks for existence.
elem.getAttribute(name) – gets the value.
elem.setAttribute(name, value) – sets the value.
elem.removeAttribute(name) – removes the attribute.
 */

//Property-attribute synchronization
let input = document.querySelector('input');

// attribute => property
input.setAttribute('id', 'id');
console.log(input.id); // id (updated)

// property => attribute
input.id = 'newId';
console.log(input.getAttribute('id')); // newId (updated)

// attribute => property
input.setAttribute('value', 'text');
console.log(input.value); // text

// NOT property => attribute
input.value = 'newValue';
console.log(input.getAttribute('value')); // text (not updated!)


//All attributes starting with “data-” are reserved for programmers’ use.
// They are available in the dataset property.
console.log(input.dataset.inputName);


/*
Attributes – is what’s written in HTML.
Properties – is what’s in DOM objects.
A small comparison:

        Properties	                            Attributes
Type	Any value, standard properties have     A string
        types described in the spec
Name	Name is case-sensitive	                Name is not case-sensitive
 */