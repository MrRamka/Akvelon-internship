let currentDroppable = null;

ball.onmousedown = function(event) {

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        ball.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        ball.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable !== droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                enterDroppable(currentDroppable);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };

};

function enterDroppable(elem) {
    elem.style.background = 'pink';
}

function leaveDroppable(elem) {
    elem.style.background = '';
}

ball.ondragstart = function() {
    return false;
};


/*
The key components:

Events flow: ball.mousedown → document.mousemove → ball.mouseup
(don’t forget to cancel native ondragstart).
At the drag start – remember the initial shift of the pointer relative
to the element: shiftX/shiftY and keep it during the dragging.
Detect droppable elements under the pointer using document.elementFromPoint.
 */


document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        console.log('Undo!!')
    }
});

/*
Keyboard events:

keydown – on pressing the key (auto-repeats if the key is pressed for long),
keyup – on releasing the key.
Main keyboard event properties:

code – the “key code” ("KeyA", "ArrowLeft" and so on),
 specific to the physical location of the key on keyboard.
key – the character ("A", "a" and so on), for non-character keys,
 such as Esc, usually has the same value as code.
 */


window.addEventListener('scroll', function() {
    document.getElementById('showScroll').innerHTML = pageYOffset + 'px';
});


/*
We can’t prevent scrolling by using event.preventDefault()
 in onscroll listener, because it triggers after the scroll has already happened.

But we can prevent scrolling by event.preventDefault()
 on an event that causes the scroll, for instance keydown event for pageUp and pageDown.
 */