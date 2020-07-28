ol.before('before'); // insert string "before" before <ol>
ol.after('after'); // insert string "after" after <ol>

let liFirst = document.createElement('li');
liFirst.innerHTML = 'prepend';
ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

let liLast = document.createElement('li');
liLast.innerHTML = 'append';
ol.append(liLast); // insert liLast at the end of <ol>


// insertAdjacentHTML/Text/Element

/*
"beforebegin" – insert html immediately before elem,
"afterbegin" – insert html into elem, at the beginning,
"beforeend" – insert html into elem, at the end,
"afterend" – insert html immediately after elem.
 */

//remove
//node.remove()
// liFirst.remove();
setTimeout(() => liFirst.remove(), 2000);

//elem.cloneNode(boolean) true - deep clone

// Manage classes
/*
className – the string value, good to manage the whole set of classes.
classList – the object with methods add/remove/toggle/contains, good for individual classes
 */
/*
The style property is an object with camelCased styles
style.cssText - full css line
getComputedStyle(element, [pseudo]) read styles
 */

/*
offsetParent – is the nearest positioned ancestor or td, th, table, body.
offsetLeft/offsetTop – coordinates relative to the upper-left edge of offsetParent.
offsetWidth/offsetHeight – “outer” width/height of an element including borders.
clientLeft/clientTop – the distances from the upper-left outer corner
 to the upper-left inner (content + padding) corner. For left-to-right OS they
 are always the widths of left/top borders. For right-to-left OS the vertical scrollbar
  is on the left so clientLeft includes its width too.
clientWidth/clientHeight – the width/height of the content including paddings, but without the scrollbar.
scrollWidth/scrollHeight – the width/height of the content, just like
 clientWidth/clientHeight, but also include scrolled-out, invisible part of the element.
scrollLeft/scrollTop – width/height of the scrolled out upper part of the element, starting from its upper-left corner.
 */

/*
Width/height of the visible part of the document
(content area width/height): document.documentElement.clientWidth/Height
 */

/*
Change the current scroll:

window.scrollTo(pageX,pageY) – absolute coordinates,
window.scrollBy(x,y) – scroll relative the current place,
elem.scrollIntoView(top) – scroll to make elem visible (align with the top/bottom of the window).
 */

//Coordinates
/*
Relative to the window – similar to position:fixed, calculated from the window top/left edge.
    we’ll denote these coordinates as clientX/clientY, the reasoning for such name will become clear later,
    when we study event properties.
Relative to the document – similar to position:absolute in the document root,
    calculated from the document top/left edge.
    we’ll denote them pageX/pageY.
*/

let centerX = document.documentElement.clientWidth / 10;
let centerY = document.documentElement.clientHeight / 10;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
console.log(elem.tagName);


/*
Relative to the window – elem.getBoundingClientRect().
Relative to the document – elem.getBoundingClientRect() plus the current page scroll.
 */

function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function createMessageUnder(elem, html) {
    let message = document.createElement('div');
    message.style.cssText = "position:absolute; color: red";

    let coords = getCoords(elem);

    message.style.left = coords.left + "px";
    message.style.top = coords.bottom + "px";

    message.innerHTML = html;

    return message;
}

let mess = createMessageUnder(liLast, 'Hello');
document.body.append(mess);
setTimeout(() => mess.remove(), 5000);