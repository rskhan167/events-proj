import pkg from "pg";
const { Client } = pkg;
import { EventRO } from "../models/event.ro.js";
import getPostData from "../utils.js";

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "0005",
  database: "events-proj",
});

async function getEvents(req, res) {
  try {
    await client.connect();

    const result = await client.query(`SELECT * from Event;`);
    const events = result.rows.map((e) => {
      return new EventRO(
        e.id,
        e.name,
        e.location,
        e.startDate,
        e.endDate,
        e.banner
      );
    });

    console.log(events);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(events));

    await client.end();
  } catch (error) {
    console.log(error);
  }
}

async function createEvent(req, res) {
  try {
    await client.connect();

    const body = await getPostData(req);
    const { name, location, startDate, endDate, banner } = JSON.parse(body);
    const date = new Date();

    if (!name || !location || !startDate || !endDate || !banner) {
      console.log("Bad Request");
      res.writeHead(400, {
        "Content-Type": "text",
      });
      res.end(`Bad Request. Invalid Request Body!`);
    }

    const newEvent = await client.query(
      `INSERT INTO event("name", "location", "startDate", "endDate", "banner", "created_on", "updated_on")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING name;`,
      [name, location, startDate, endDate, banner, date, date]
    );

    console.log(newEvent.rows[0]);

    res.writeHead(200, {
      "Content-Type": "text",
    });
    res.end(`New Event Created: ${newEvent.rows[0].name}`);

    await client.end();
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

async function editEvent(req, res, id) {
  try {
    await client.connect();

    const body = await getPostData(req);
    const { name, location, startDate, endDate, banner } = JSON.parse(body);
    const date = new Date();

    if (!name || !location || !startDate || !endDate || !banner) {
      console.log("Bad Request");
      res.writeHead(400, {
        "Content-Type": "text",
      });
      res.end(`Bad Request. Invalid Request Body!`);
    }

    await client.query(
      `UPDATE event
    SET "name" = $1,
        "location" = $2,
        "banner" = $3,
        "startDate" = $4,
        "endDate" = $5,
        "updated_on" = $6
    WHERE id = $7;`,
      [name, location, banner, startDate, endDate, date, id]
    );

    res.writeHead(200, {
      "Content-Type": "text",
    });
    res.end(`Event Updated!`);

    await client.end();
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

async function deleteEvents(req, res) {
  try {
    await client.connect();

    const body = await getPostData(req);
    const { eventIdList } = JSON.parse(body);

    if (eventIdList.length < 1) {
      console.log("Bad Request");
      res.writeHead(400, {
        "Content-Type": "text",
      });
      res.end(`Bad Request. Invalid Request Body!`);
    }

    await client.query(`DELETE FROM event WHERE id IN (${eventIdList})`);

    res.writeHead(200, {
      "Content-Type": "text",
    });
    res.end(`Event Deleted!`);

    await client.end();
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export { getEvents, createEvent, editEvent, deleteEvents };
