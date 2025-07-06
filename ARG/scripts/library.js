document.addEventListener('DOMContentLoaded', () => {
    const image = new Image();
    image.src = "images/night_sky_puzzle.png";

    const canvas = document.getElementById("telescope");
    const ctx = canvas.getContext("2d");

    var sx = 2200;               // Source X coordinate
    var sy = 100;               // Source Y coordinate
    const sWidth = 400;         // Source width to crop
    const sHeight = 400;        // Source height to crop
    
    const dx = 30;               // Destination X coordinate on canvas
    const dy = 30;               // Destination Y coordinate on canvas
    const dWidth = sWidth;      // Destination width on canvas
    const dHeight = sHeight;    // Destination height on canvas

    canvas.width = dWidth + 60;      // Set canvas dimensions to match cropped image
    canvas.height = dHeight + 60;

    var initialX = 0;
    var initialY = 0;
    var isDragging = false;

    function getCanvasRelativeMousePos(event) {
        var rect = canvas.getBoundingClientRect(); // Get the canvas's position and size
        return {
            x: event.clientX - rect.left, // Calculate x-coordinate relative to the canvas
            y: event.clientY - rect.top // Calculate y-coordinate relative to the canvas
        };
    }

    canvas.addEventListener('mousedown', (event) => {
        var pos = getCanvasRelativeMousePos(event);
        initialX = pos.x;   // Store the starting x-coordinate
        initialY = pos.y;   // Store the starting y-coordinate
        isDragging = true;  // Set drag flag to true
        // console.log(initialX);
        // console.log(initialY);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDragging) {
            var pos = getCanvasRelativeMousePos(event);
            var dragDistanceX = pos.x - initialX; // Calculate horizontal drag distance
            var dragDistanceY = pos.y - initialY; // Calculate vertical drag distance

            sx = Math.min(4100, Math.max(0, sx - dragDistanceX / 20));
            sy = Math.min(323, Math.max(0, sy - dragDistanceY / 20));

            ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        }
    });

    canvas.addEventListener("mouseup", function() {
        isDragging = false; // Set drag flag to false
    });
    
    image.onload = () => {
        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };
});

