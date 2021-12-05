export class EventRO {
  id;
  eventName;
  location;
  startDate;
  endDate;
  banner;

  constructor(id, eventName, location, startDate, endDate, banner) {
    this.id = id;
    this.eventName = eventName;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.banner = banner;
  }
}
