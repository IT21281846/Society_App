import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 🟢 Get all events
router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// 🟢 Create a new event
router.post("/", async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Basic validation
    if (!title || !date) {
      return res.status(400).json({ error: "Title and date are required" });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    res.status(201).json(event);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// 🟢 Update an event
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    const updatedEvent = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        date: new Date(date),
      },
    });

    res.json(updatedEvent);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// 🟢 Delete an event
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: { id: Number(id) },
    });

    res.json({ success: true, message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

export default router;
