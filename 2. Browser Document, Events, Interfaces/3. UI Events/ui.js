//Mouse events

/*
Mouse event types
We’ve already seen some of these events:

mousedown/mouseup
Mouse button is clicked/released over an element.

mouseover/mouseout
Mouse pointer comes over/out from an element.

mousemove
Every mouse move over an element triggers that event.

click
Triggers after mousedown and then mouseup over the same element if the left mouse button was used.

dblclick
Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

contextmenu
Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g
. using a special keyboard key, it triggers in that case also, so it’s not exactly the mouse event.
 */

//Events order

//mousedown → mouseup → click

/*
event.which == 1 – left button,
event.which == 2 – middle button,
event.which == 3 – right button.
*/

//Modifiers: shift, alt, ctrl and meta
/*
shiftKey: Shift
altKey: Alt (or Opt for Mac)
ctrlKey: Ctrl
metaKey: Cmd for Mac
 */


button.onclick = function (event) {
    if (event.altKey && event.shiftKey) {
        console.log('Alt+Shift+Click');
    }
};

/*
Window-relative coordinates: clientX/clientY.

Document-relative coordinates: pageX/pageY.
 */

//Moving the mouse: mouseover/out, mouseenter/leave
/*
mouseover, mouseout, mousemove, mouseenter and mouseleave.

These things are good to note:

A fast mouse move may skip intermediate elements.
Events mouseover/out and mouseenter/leave have an additional property:
relatedTarget. That’s the element that we are coming from/to, complementary to target.

Events mouseover/out trigger even when we go from the parent element to a child element.
The browser assumes that the mouse can be only over one element at one time – the deepest one.

Events mouseenter/leave are different in that aspect: they only trigger when the mouse comes
 in and out the element as a whole. Also they do not bubble.
 */


