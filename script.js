$(function () {
  //* setting a few global variables to be referenced later.
  let currentDateDisplay = $("#currentDay");
  let currentDate = dayjs().format("dddd, MMMM D, YYYY");
  let currentTime = dayjs().format("h:mm:ssA");

  //* this event listener first sets variables to define the key, which is the id of the parent div element, as well as the text, which is the value of the textarea, or the 2nd sibling of the clicked save button. it then sends the text to local storage, using the key as , well, the key. the use of currentTarget ensures that the action is completed as intended regardless of if the button or the nested icon is clicked.
  $(".saveBtn").click(function (e) {
    e.stopPropagation();
    let key = $(e.currentTarget).parent().attr("id");
    let text = $(e.currentTarget).siblings().eq(1).val();
    if (text == "" || undefined) {
      return;
    } else {
      localStorage.setItem(key, JSON.stringify(text));
    }
  });

  //* this event listener operates similar to the save button action. it locates the id of the parent element, which is the same id that was used to store the data. it calls to local storate to remove the data, and sets the text area back to a blank slate.
  $(".deleteBtn").click(function (e) {
    key = $(e.currentTarget).parent().attr("id");
    localStorage.removeItem(key);
    $(e.currentTarget).siblings().eq(1).val("");
  });

  //* this function allows the user to clear all saved content in local storage and reload the page to refresh and show all fields empty. This button is linked to a button in the implemented modal, as it it prettier than using a confirm pop up.
  $(".clearAllBtn").click(function () {
    localStorage.clear();
    location.reload();
  });

  //* this code searches for each div element with a class of .time-block and for each of these divs it pulls their id, splits the id on the hyphen, and takes the second value made by the split ([1] is second value due to a 0 index). Because of the way the ids are created, this second value will always be the number of the hour. it then uses day.js to grab the current hour on a 24 hour scale, and uses an if/else statement to run through each and assign classes of past, present, or future.
  $("div.time-block").each(function () {
    let timeBlock = $(this).attr("id").split("-")[1];
    let hourNow = dayjs().$H;

    if (timeBlock < hourNow) {
      $(this).addClass("past");
    } else if (timeBlock == hourNow) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  //* this code loads any saved content to the page on load. for each element with a class of .description, which is all of the text areas, it will again pull the id of the parent element, which is the key that each item was saved under in local storage. It then parses the string saved in local storage and renders is as the value of the associated textarea.
  $(".description").each(function () {
    let retrieveKey = $(this).parent().attr("id");
    if (retrieveKey == "" || undefined || null) {
      return;
    } else {
      $(this).val(JSON.parse(localStorage.getItem(retrieveKey)));
    }
  });

  //* this code sets the current date display to display the current date pulled from dayjs, as defined at the top of the script. Used jQuery to create a new p element, display the current time pulled from dayjs, and append it after the 3rd child of the header, i.e. right after the current date display.
  currentDateDisplay.text(currentDate);
  let currentTimeDisplay = $("<p>");
  currentTimeDisplay.text(currentTime);
  $("header").children().eq(2).append(currentTimeDisplay);

  //* this function simply sets current time display to current time, but then the function is called every second with the following setInterval so that the time continuously updates.
  function updateCurrentTime() {
    currentTimeDisplay.text(dayjs().format("h:mm:ssA"));
  }
  setInterval(updateCurrentTime, 1000);
});
