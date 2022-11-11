import EventsModel from '../models/Event.js';

export const eventsByDay = async (req, res) => {
  try {

    if (!req.body.date) {
      return res.status(400).json({
        message: 'Неккоректные данные',
        events: null
      });
    }

    const eventsByDeparments = await EventsModel
      .find({
        eventType: "event",
        date: req.body.date,
        $or: [
          { departments: { $size: 0 } },
          { departments: req.body.department || "" }
        ]
      }, { createdAt: 0, updatedAt: 0 })
      .sort({ time: 1 })

    const eventsByUser = await EventsModel.find({
      eventType: "event",
      date: req.body.date,
      userId: req.userId
    }, { createdAt: 0, updatedAt: 0 })
      .sort({ time: 1 });

    const events = [...eventsByDeparments, ...eventsByUser];

    if (events.length === 0) {
      return res.json({
        message: "Событий нет",
        events: null
      });
    }

    res.json({
      message: "ok",
      events
    });

  } catch (error) {
    console.log("Events error: ", error);
    res.status(500).json({
      message: "Не удалось выполнить запрос"
    });
  }
}

export const notifications = async (req, res) => {
  try {

    const notifications = await EventsModel.find({
      eventType: "notification",
      userId: req.userId
    }, { createdAt: 0, updatedAt: 0, eventType: 0, userId: 0 })
      .sort({ date: -1 }).limit(3);

    if (notifications.length === 0) {
      return res.json({
        message: "Уведомлений нет",
        events: null
      });
    }

    res.json({
      message: "ok",
      notifications
    });

  } catch (error) {
    console.log("Events error: ", error);
    res.status(500).json({
      message: "Не удалось выполнить запрос"
    });
  }
}

