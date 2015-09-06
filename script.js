$(document).ready(function(){
    var breakTime = 5
    var workTime = 25;
    var counter;
    var sec = 59;
    var audioDone = new Audio('hallelujah.mp3')
    var audioStart = new Audio('workIt.mp3')
    $('#start').html(workTime);
     
    var isWorking = true;
    var isBreaking = false;
    function workTimer(){

        //sec becomes string "0X" when seconds go below 10
        //this stops the timer at 0
        if(workTime === 1 && sec == 0){
            clearInterval(counter);
            audioDone.play();
            //set timer to break time
            workTime = breakTime;
            $('#start').html(workTime  + ":" + sec);
            $('<br><span id="breakSpan">Breaktime!</span>').appendTo('h1');
            $('#breakSpan').fadeOut(4000);
            //set to false because function call will change it to true and start clock
            isCounting = false;
            //isWorking is false and isBreaking is true -- see line 114
            isWorking = !isWorking;
            isBreaking = !isBreaking;
            breakCount();
            sec = 59;
        } else if (workTime > 0){
            //worktime is always +1 of whats on clock
            $('#start').html(workTime - 1 + ":" + sec);
              sec--
        } else {
            //so when clock hit 0, it won't show -1
            $('#start').html(workTime  + ":" + sec);
              sec--
        }
        //makes the second print in double digits
        if(sec < 10 && sec > -1){
            sec = "0" + sec;
          
        }
        //resets seconds to 59, subtracts 1 from workTime
        if(sec < 0){
            sec = 59
            workTime--
        }

    }
    
     function breakTimer(){
        //sec becomes string "0X" when seconds go below 10
        //this stops the timer at 0
        if(breakTime === 1 && sec == 0){
            clearInterval(counter);
            breakTime = workTime;
            audioStart.play();
            $('#start').html(breakTime  + ":" + sec);
            $('<br><span id="workSpan">Back To Work!</span>').appendTo('h1');
            $('#workSpan').fadeOut(4000);
            isCounting = false;
            isWorking = !isWorking;
            isBreaking = !isBreaking;
            workCount();
            sec = 59;
        } else if (breakTime > 0){
            $('#start').html(breakTime - 1 + ":" + sec);
              sec--
        } else {
            $('#start').html(breakTime  + ":" + sec);
              sec--
        }
        //makes the second print in double digits
        if(sec < 10 && sec > -1){
            sec = "0" + sec;
          
        }
        //resets seconds to 59, subtracts 1 from breakTime
        if(sec < 0){
            sec = 59
            breakTime--
        }
        
        
    }
    
    //This changes the value of isCounting every click, which starts or stops the clock
    var isCounting = false;
    function workCount(){
        if (!isCounting) {
            counter = setInterval(workTimer, 1000);
            
        }
        else {
            clearInterval(counter);
        }
        isCounting = !isCounting;
    }
    
    function breakCount(){
        if (!isCounting) {
            counter = setInterval(breakTimer, 1000);
        }
        else {
            clearInterval(counter);
        }
        isCounting = !isCounting;
    }
    
    
   //allows you to start and stop work AND break time by calling seperate functions
    $('#start').on('click', function(){
        if(isWorking){
            workCount();
        } else if(isBreaking){
            breakCount();
        }
    });
    
    
    //Add or subtract time buttons
    $('#plusBreak').click(function(){
        if(breakTime === 1){
            breakTime+=4;
        } else if(breakTime > 59) {
            breakTime = 60;
        } else { 
        breakTime+=5;
        }
        $('#stop').html(breakTime);
    });
    
    $('#minusBreak').click(function(){
        breakTime-=5
        if (breakTime < 1) {
            breakTime = 1;
        }
        $('#stop').html(breakTime);
    })
    
     $('#plusWork').click(function(){
         if(workTime === 1){
            workTime+=4;
        } else if(workTime > 59) {
            workTime = 60;
        } else { 
            workTime+=5;
        }
        $('#sess').html(workTime);
        $('#start').html(workTime);
    });
    
    $('#minusWork').click(function(){
        workTime-=5
        if (workTime < 1) {
            workTime = 1;
        }
        $('#sess').html(workTime);
        $('#start').html(workTime);
    })
   
   
   
   
    
});