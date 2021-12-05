//getting all required elements

const addBtn = document.querySelector(".addBtn");
const eventName = document.querySelector(".inputField .eventName");
const eventLocation = document.querySelector(".inputField .eventLocation");
const eventStart = document.querySelector(".inputField .eventStart");
const eventEnd = document.querySelector(".inputField .eventEnd");
const eventBanner = document.querySelector(".inputField .eventBanner");

addBtn.onclick = () => {
  console.log("test");
  const userData = new UserData(
    eventName.value,
    eventLocation.value,
    eventStart.value,
    eventEnd.value,
    eventBanner.value
  );

  console.log(userData);
};

function showEvents() {
  fetch("http://localhost:3000/api/events")
    .then(function (response) {
      // The API call was successful!
      console.log("success!", response);
      let newLiTag = "";
      const list = response.map((e) => {
        return;
      });
    })
    .catch(function (err) {
      // There was an error
      console.warn("Something went wrong.", err);
    });
}

export class UserData {
  eventName;
  eventLocation;
  eventStart;
  eventEnd;
  eventBanner;

  constructor(eventName, eventLocation, eventStart, eventEnd, eventBanner) {
    this.eventName = eventName;
    this.eventLocation = eventLocation;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.eventBanner = eventBanner;
  }
}

export class Event {
  id;
  eventName;
  eventLocation;
  eventStart;
  eventEnd;
  eventBanner;

  constructor(id, eventName, eventLocation, eventStart, eventEnd, eventBanner) {
    this.id = id;
    this.eventName = eventName;
    this.eventLocation = eventLocation;
    this.eventStart = eventStart;
    this.eventEnd = eventEnd;
    this.eventBanner = eventBanner;
  }
}
