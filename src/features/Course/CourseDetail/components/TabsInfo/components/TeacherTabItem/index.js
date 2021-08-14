import CourseCard from "components/Common/CourseCard";
import React from "react";
import { BsGem, BsStar, BsChatDots, BsDisplay } from "react-icons/bs";

export default function TeacherTabItem({ teacher, courses }) {
  const totalReviews = () => {
    let total = 0;

    for (let course of courses) {
      total += course.feedbacks.length;
    }

    return total;
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="teacher-avatar">
            <div className="teacher__avatar">
              <img className="rounded-full w-100" src={`https://i.pravatar.cc/350?u=${teacher.userName}`} alt="lecturer" />
            </div>
          </div>
          <div className="teacher-name mr-5 ml-3 " style={{ width: "100px" }}>
            <h6 className="text-capitalize">
              {teacher.firstName} {teacher.lastName}
            </h6>
            <span>Teacher</span>
          </div>
        </div>

        <div className="teacher-intro">Hi everyone. I’m a teacher come from subject "Phát triển ứng dụng Web nâng cao"</div>
      </div>

      <div className="extra-info">
        <div className="extra-item">
          <BsStar size={18} />
          <span className="ml-2">{totalReviews()} Ratings</span>
        </div>

        <div className="extra-item">
          <BsChatDots size={18} />
          <span className="ml-2">{totalReviews()} Reviews</span>
        </div>

        <div className="extra-item">
          <BsGem size={18} />
          <span className="ml-2">Top Teacher</span>
        </div>

        <div className="extra-item">
          <BsDisplay size={18} />
          <span className="ml-2">{courses.length} Courses</span>
        </div>
      </div>
      <div>
        <div className="row">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course._id} course={course} isOpenNewTab={true} column={6} />
          ))}
        </div>
      </div>
    </div>
  );
}
