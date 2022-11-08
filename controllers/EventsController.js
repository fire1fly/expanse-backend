import EventsModel from '../models/Events.js';

export const eventsByDay = async (req, res) => {
  try {

    if (!req.body.date) {
      return res.status(400).json({
        message: 'Неккоректные данные',
        events: null
      });
    }

    // const doc1 = new EventsModel({
    //   date: "08-11-2022",
    //   userId: req.userId,
    //   time: "9:00",
    //   text: "Данил, у вас встреча с трекером"
    // });
    // const doc1 = new EventsModel({
    //   date: "08-11-2022",
    //   userId: req.userId,
    //   time: "12:00",
    //   text: "Сергей, у вас с аналитиками"
    // });

    // await doc1.save();

    console.log(req.userId);
    console.log("DEPART: ", req.body.department);

    const eventsByDeparments = await EventsModel
      .find({
        date: req.body.date,
        $or: [
          { departments: { $size: 0 } },
          { departments: req.body.department || "" }
        ]
      }, { createdAt: 0, updatedAt: 0 })
      .sort({ time: 1 })

    const eventsByUser = await EventsModel.find({
      date: req.body.date,
      userId: req.userId
    }, { createdAt: 0, updatedAt: 0 })
      .sort({ time: 1 });

    const events = [...eventsByDeparments, ...eventsByUser];

    // console.log(events);

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
