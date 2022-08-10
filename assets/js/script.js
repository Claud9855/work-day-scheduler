$(document).ready(function(){
    displayCurrentTime();
    setupTimeBackground();
    setInterval(setupTimeBackground, 30000);
    $('.container-fluid').on('click', 'button', saveEvent);
    var loadContent = function(){
      var indexes = $('button');

      for(var i = 0; i < indexes.length; i++){
        var index = indexes.eq(i).attr('data-index');
        if(localStorage.getItem('events-' + index) !== null){
          $('.form-control').eq(index).val(localStorage.getItem('events-' + index));
        }
      }
      
    };
    loadContent();
  });

/** This function uses moment.js to display the current day **/
function displayCurrentTime(){
  var timeDisplay = $('#currentDay');
  var currentDay = moment().format('dddd, MMMM Do');
  timeDisplay.text(currentDay);
}

/** function uses moment.js to setup the background of each time block **/
function setupTimeBackground(){
  var timeBlocks = $('div.input-group-prepend').children('span.time-block');
    
  var currentHour = moment().format('ha');
  for(var i = 0; i < timeBlocks.length; i++){
    var time = timeBlocks.eq(i).attr('data-time');
    if(time.localeCompare(currentHour) === 0){
      $('.form-control').eq(i).switchClass('future','present');
      break;
    }
    else{
      $('.form-control').eq(i).switchClass('future' ,'past');
    }

  }

}

/** event handler to be invoked when a button element is clicked on and
 *  save the event to a localstorage object 
 **/
function saveEvent(event){
  event.preventDefault();
  $(".container").toggleClass('d-block');
  var fade = setInterval(function(){
    $(".container").toggleClass('d-block');
    clearInterval(fade);
  }, 3000);
  var index = $(event.target).attr('data-index');
  var text = $('.form-control').eq(index).val();
  if(index === null && text === null){
    return;
  }
  localStorage.setItem('events-' + index, text);
}