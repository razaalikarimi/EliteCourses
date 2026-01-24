// import uploadOnCloudinary from "../configs/cloudinary.js";
// import Course from "../models/courseModel.js";
// import Lecture from "../models/lectureModel.js";
// import User from "../models/userModel.js";

// // <<<<<<< HEAD
// // =======
// // // create Courses
// // >>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
// export const createCourse = async (req, res) => {
//   try {
//     const { title, category } = req.body;
//     if (!title || !category) {
//       return res
//         .status(400)
//         .json({ message: "title and category is required" });
//     }
//     const course = await Course.create({
//       title,
//       category,
//       creator: req.userId,
//     });

//     return res.status(201).json(course);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to create course ${error}` });
//   }
// };

// export const getPublishedCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({ isPublished: true }).populate(
//       "lectures reviews"
//     );
//     if (!courses) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     return res.status(200).json(courses);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to get All  courses ${error}` });
//   }
// };

// export const getCreatorCourses = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const courses = await Course.find({ creator: userId });
//     if (!courses) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     return res.status(200).json(courses);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to get creator courses ${error}` });
//   }
// };

// export const editCourse = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const {
//       title,
//       subTitle,
//       description,
//       category,
//       level,
//       price,
//       isPublished,
//     } = req.body;
//     let thumbnail;
//     if (req.file) {
//       thumbnail = await uploadOnCloudinary(req.file.path);
//     }
//     let course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     const updateData = {
//       title,
//       subTitle,
//       description,
//       category,
//       level,
//       price,
//       isPublished,
//       thumbnail,
//     };

//     course = await Course.findByIdAndUpdate(courseId, updateData, {
//       new: true,
//     });
//     return res.status(201).json(course);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to update course ${error}` });
//   }
// };

// export const getCourseById = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     let course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     return res.status(200).json(course);
//   } catch (error) {
//     return res.status(500).json({ message: `Failed to get course ${error}` });
//   }
// };
// export const removeCourse = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const course = await Course.findById(courseId);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     await course.deleteOne();
//     return res.status(200).json({ message: "Course Removed Successfully" });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: `Failed to remove course ${error}` });
//   }
// };

// <<<<<<< HEAD
// =======
// //create lecture

// >>>>>>> 6a7a943fc54e9f14262178af4c8079e6c1d01555
// export const createLecture = async (req, res) => {
//   try {
//     const { lectureTitle } = req.body;
//     const { courseId } = req.params;

//     if (!lectureTitle || !courseId) {
//       return res.status(400).json({ message: "Lecture Title required" });
//     }
//     const lecture = await Lecture.create({ lectureTitle });
//     const course = await Course.findById(courseId);
//     if (course) {
//       course.lectures.push(lecture._id);
//     }
//     await course.populate("lectures");
//     await course.save();
//     return res.status(201).json({ lecture, course });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to Create Lecture ${error}` });
//   }
// };

// export const getCourseLecture = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }
//     await course.populate("lectures");
//     await course.save();
//     return res.status(200).json(course);
//   } catch (error) {
//     return res.status(500).json({ message: `Failed to get Lectures ${error}` });
//   }
// };

// export const editLecture = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     const { isPreviewFree, lectureTitle } = req.body;
//     const lecture = await Lecture.findById(lectureId);
//     if (!lecture) {
//       return res.status(404).json({ message: "Lecture not found" });
//     }
//     let videoUrl;
//     if (req.file) {
//       videoUrl = await uploadOnCloudinary(req.file.path);
//       lecture.videoUrl = videoUrl;
//     }
//     if (lectureTitle) {
//       lecture.lectureTitle = lectureTitle;
//     }
//     lecture.isPreviewFree = isPreviewFree;

//     await lecture.save();
//     return res.status(200).json(lecture);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to edit Lectures ${error}` });
//   }
// };

// export const removeLecture = async (req, res) => {
//   try {
//     const { lectureId } = req.params;
//     const lecture = await Lecture.findByIdAndDelete(lectureId);
//     if (!lecture) {
//       return res.status(404).json({ message: "Lecture not found" });
//     }
//     //remove the lecture from associated course

//     await Course.updateOne(
//       { lectures: lectureId },
//       { $pull: { lectures: lectureId } }
//     );
//     return res.status(200).json({ message: "Lecture Remove Successfully" });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: `Failed to remove Lectures ${error}` });
//   }
// };

// //get Creator data

// // controllers/userController.js

// export const getCreatorById = async (req, res) => {
//   try {
//     const { userId } = req.body;

//     const user = await User.findById(userId).select("-password"); // Exclude password

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching user by ID:", error);
//     res.status(500).json({ message: "get Creator error" });
//   }
// };



import uploadOnCloudinary from "../configs/cloudinary.js";
import Course from "../models/courseModel.js";
import Lecture from "../models/lectureModel.js";
import User from "../models/userModel.js";

// CREATE COURSE
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res
        .status(400)
        .json({ message: "title and category is required" });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create course ${error}` });
  }
};

// GET PUBLISHED COURSES
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "lectures reviews"
    );

    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get courses ${error}` });
  }
};

// GET CREATOR COURSES
export const getCreatorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.userId });
    return res.status(200).json(courses);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get creator courses ${error}` });
  }
};

// EDIT COURSE
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const data = req.body;

    if (req.file) {
      data.thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const course = await Course.findByIdAndUpdate(courseId, data, {
      new: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to update course ${error}` });
  }
};

// GET COURSE BY ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// REMOVE COURSE
export const removeCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await course.deleteOne();
    return res.status(200).json({ message: "Course removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// CREATE LECTURE
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle) {
      return res.status(400).json({ message: "Lecture title required" });
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);

    course.lectures.push(lecture._id);
    await course.save();
    await course.populate("lectures");

    return res.status(201).json({ lecture, course });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to create lecture ${error}` });
  }
};

// GET COURSE LECTURES
export const getCourseLecture = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "lectures"
    );
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// EDIT LECTURE
export const editLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    if (req.file) {
      lecture.videoUrl = await uploadOnCloudinary(req.file.path);
    }

    lecture.lectureTitle = req.body.lectureTitle || lecture.lectureTitle;
    lecture.isPreviewFree = req.body.isPreviewFree;

    await lecture.save();
    return res.status(200).json(lecture);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// REMOVE LECTURE
export const removeLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.lectureId);
    await Course.updateOne(
      { lectures: req.params.lectureId },
      { $pull: { lectures: req.params.lectureId } }
    );
    return res.status(200).json({ message: "Lecture removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET CREATOR BY ID
export const getCreatorById = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Get creator error" });
  }
};
