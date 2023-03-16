// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let currentDateDisplay = $("#currentDay");
  let currentTime;
  let key;
  let text;
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  //* this event listener first sets variables to define the key, which is the id of the parent div element, as well as the text, which is the value of the textarea, or the 2nd sibling of the clicked save button. it then sends the text to local storage, using the key as , well, the key.
  $(".saveBtn").click(function (e) {
    let key = $(e.target).parent().attr("id");
    let text = $(e.target).siblings().eq(1).val();
    // console.log(key);
    // console.log(text);
    if (text == "" || undefined) {
      return;
    } else {
      localStorage.setItem(key, JSON.stringify(text));
    }
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  $("div.time-block").each(function () {
    let timeBlock = $(this).attr("id").split("-")[1];
    let hourNow = dayjs().$H;
    console.log(timeBlock);
    if (timeBlock < hourNow) {
      $(this).addClass("past");
    } else if (timeBlock == hourNow) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  $(".description").each(function () {
    let retrieveKey = $(this).parent().attr("id");
    if (retrieveKey == "" || undefined || null) {
      return;
    } else {
      $(this).val(JSON.parse(localStorage.getItem(retrieveKey)));
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  currentDateDisplay.text(dayjs().format("dddd, MMMM D, YYYY"));
  currentTime = $("<p>");
  currentTime.text(dayjs().format("h:mmA"));
  $("header").children().eq(2).append(currentTime);
});

console.log(typeof dayjs().$H);

//* This successfully links to the content area of each textbox
console.log($("div.time-block").find("textarea").val());

let timeBlock = $("div.time-block");
console.log($(timeBlock));

// localStorage.clear();
console.log(localStorage);

//! everything seems to work for now...need to figure out why button clicks say undefined sometimes and also look at adding a clear/remove button
