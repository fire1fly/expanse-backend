import CourseModel from '../models/Course.js';

// const course = new CourseModel({
//   title: "Корпоративная этика, как основа успеха в коллективе",
//   description: " Успех и процветание фирмы определяет много факторов, в том числе и соблюдение корпоративной этики. Это первый курс, который мы рекомендуем пройти каждому сотруднику"
// });
// const course = new CourseModel({
//   title: "Курс 5",
//   description: "Успех и процветание фирмы определяет много факторов, в том числе и соблюдение корпоративной этики. Это первый курс, который мы рекомендуем пройти каждому сотруднику"
// });

// const doc = course.save()

export const courses = async (req, res) => {
  try {

    const courses = await CourseModel.find({
      $or: [
        { departments: req.body.department },
        { departments: [] }
      ]
    }, { createdAt: 0, updatedAt: 0 });

    if (courses.length === 0) {
      return res.json({
        message: "Нет доступных курсов",
        events: null
      });
    }

    res.json({
      message: "ok",
      courses
    });

  } catch (error) {
    console.log("Events error: ", error);
    res.status(500).json({
      message: "Не удалось выполнить запрос"
    });
  }
}

