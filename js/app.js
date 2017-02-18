// thanks to http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
// and http://jsfiddle.net/df773p9m/4/
// set inital counts for the start of pomodoro
// update the counter in break and in minutes
// update the pomodoro clock using the counter and minute values
// create start and stop function for pomodoro clock


$(document).ready(function () {
    // starting values
    var sessionTime = 1500,
        breakTime = 300,
        seconds = sessionTime,
        isStarted = false,
        isBreak = false,
        interval;
    //setInitialValues();
    function setInitialValues () {
        // sessionTime = 1500;
        // breakTime = 300;
        seconds = sessionTime;
        isStarted = false;
        isBreak = false;
        // clearInterval(interval);
        $('#sessTime').html(sessionTime/60);
        $('#brkTime').html(breakTime/60);
        $('.display').html('');
    }
    // converting the session time
    function convertingTime (seconds) {
        var hh = Math.floor(seconds / 3600),
            mm = Math.floor(seconds % 3600 / 60),
            ss = Math.floor(seconds % 3600 % 60);
        hh = hh < 1 ? hh = "" : hh < 10 ? hh = "0" + hh + ":" : hh + ":";
        mm = mm < 10 ? "0" + mm + ":" : mm + ":";
        ss = ss < 10 ? "0" + ss : ss;
        console.log(hh + mm + ss);
        return hh + mm + ss;
    }
    // countdown the seconds
    function countdownTimer () {
        if (seconds > 0) {
        seconds -= 1;
            if (seconds == -1) {
                console.log('session ended');
            }
        } else {
            if (isBreak === false) {
                seconds = breakTime;
                isBreak = true;
                $('.work').html('TAKE A BREAK');
            } else {
                seconds = sessionTime;
                isBreak = false;
            }
        }
        $('.display').html(convertingTime(seconds));
        updateBackground ();
    }
    function updateBackground () {
        var timer = isBreak ? breakTime : sessionTime;
        var color;
        if (isStarted) {
            color = isBreak ? 'orange' : 'rgba(18, 46, 229, 0.5)';//'#122ee5';
        }
        var progress = (timer - seconds)*100/timer;
        $('.start').css('background', 'linear-gradient(to top, '+color+' 0%,'+color+' '+progress+'%,#14c99c '+progress+'%,#14c99c 100%)');
}
    // starting an interval countdown
    $('.start').click(function (e) { 
        if (isStarted === false) {
            $('.work').html('SESSION STARTED');
            interval = setInterval(function(){countdownTimer();updateBackground();}, 1000);
            isStarted = true;
            $('.btn').prop('disabled', true);
            $('.start').css('border', 'outset rgba(18, 46, 229, 0.5)');
        } else {
            $('.work').html('SESSION PAUSED');
            clearInterval(interval);
            isStarted = false;
            $('.btn').prop('disabled', false);
            $('.start').css('border', 'solid 2px grey');
        }
        updateBackground ();
        e.preventDefault();
    });
    // add or subtract minutes
    $('.btn').click(function (e) {
        var button = e.target.getAttribute('data-method');
        switch (button) {
            case "addBrk":
                breakTime += 60;
                break;
            case "subBrk":
                breakTime = breakTime > 1 ? breakTime -= 60 : breakTime = 0;
                break;
            case "addSess":
                sessionTime += 60;
                break;
            case "subSess":
                sessionTime = sessionTime > 1 ? sessionTime -= 60 : sessionTime = 0;
                break;
            default:
            break;
        }
        console.log(seconds, breakTime);
        $('#sessTime').html(sessionTime/60);
        $('#brkTime').html(breakTime/60);
        resetAndUpdate();
        e.preventDefault();
    });
    // reset all and update the information
    function resetAndUpdate () {
        clearInterval(interval);
        setInitialValues ();
        $('.btn').prop('disabled', false);
        updateBackground ();
    }
});