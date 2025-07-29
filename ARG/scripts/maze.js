document.addEventListener('DOMContentLoaded', () => {
    const forward_btn = document.getElementById('forward-btn');
    const backward_btn = document.getElementById('backward-btn');
    const left_btn = document.getElementById('left-btn');
    const right_btn = document.getElementById('right-btn');
    const flowers = document.getElementById('room-details-flowers');
    const flock = document.getElementById('room-details-flock');
    const alert_box = document.getElementById('room-details-alert');

    const valid_path = [{'flower_color': 'White', 'flock_count': 3}, {'flower_color': 'Red', 'flock_count': 3}, {'flower_color': 'White', 'flock_count': 4}, {'flower_color': 'Blue', 'flock_count': 1}, {'flower_color': 'Red', 'flock_count': 4}, {'flower_color': 'Red', 'flock_count': 3}, {'flower_color': 'White', 'flock_count': 2}, {'flower_color': 'Red', 'flock_count': 2}, {'flower_color': 'Blue', 'flock_count': 2}];
    var room = valid_path[0]

    const display_room = () => {
        flowers.innerHTML = room.flower_color + " Flowers";
        flock.innerHTML = room.flock_count.toString() + " Birds";
    };
    display_room();

    // 0-Forward; 1-Backward; 2-Left; 3-Right;
    // ['left', 'right', 'forward', 'right', 'forward', 'back', 'left', 'right', 'forward']
    const exit = [2, 3, 0, 3, 0, 1, 2, 3, 0];
    var on_track = true;
    var step = 0;
    var back_cnt = 0;
    var exit_reached = false;

    const move = (direction) => {
        // console.log([step, exit_reached, on_track])
        if (!exit_reached) {
            let cont = true;
            if (direction == 1) {
                back_cnt++;
                if (back_cnt == 3) {
                    back_cnt = 0;
                    on_track = true;
                    step = 0;
                    room = valid_path[0];
                    cont = false;
                    // alert the user that they restarted the maze
                    alert_box.innerHTML = "You arrive back to the beginning...";
                }
            } else {
                back_cnt = 0;
            }
            if (cont) {
                if (step >= 9) {
                    // wrong way
                    let rng = Math.floor(Math.random() * 3);
                    let clr = ''
                    if (rng == 1) {clr = "White"}
                    else if (rng == 2) {clr = "Blue"}
                    else if (rng == 3) {clr = "Red"}
                    room = {
                        flower_color: clr,
                        flock_count: Math.floor(Math.random() * 5),
                    };
                    // WARN them about heading back
                    alert_box.innerHTML = "A soft voice advices you to turn back...";
                } else {
                    alert_box.innerHTML = "";
                    if ((on_track && direction != exit[step]) || !on_track) {
                        on_track = false;
                        step++;
                        // generate random room
                        let rng = Math.floor(Math.random() * 3);
                        let clr = ''
                        if (rng == 1) {clr = "White"}
                        else if (rng == 2) {clr = "Blue"}
                        else if (rng == 3) {clr = "Red"}
                        room = {
                            flower_color: clr,
                            flock_count: Math.floor(Math.random() * 5),
                        };
                    } else {
                        // generate next valid room
                        step++;
                        if (step < 9) {
                            room = valid_path[step];
                        } else {
                            exit_reached = true;
                            alert_box.innerHTML = "You made it to the exit! Flag: &ltFLAG_8355294751&gt";
                        }
                    }
                }
            }
            display_room();
        }
    };
        
    forward_btn.addEventListener('click', () => {move(0)});
    backward_btn.addEventListener('click', () => {move(1)});
    left_btn.addEventListener('click', () => {move(2)});
    right_btn.addEventListener('click', () => {move(3)});
});