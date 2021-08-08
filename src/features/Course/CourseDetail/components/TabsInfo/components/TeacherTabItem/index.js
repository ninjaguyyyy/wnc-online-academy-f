import React from "react";
import { BsGem, BsStar, BsChatDots, BsDisplay } from "react-icons/bs";

export default function TeacherTabItem({ teacher }) {
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

        <div className="teacher-intro">
          Hi everyone. I’m Arash and I’m a UI/UX designer. In this course, I will help you learn and master Figma app comprehensively from
          scratch. Figma is an innovative and brilliant tool for User Interface design
        </div>
      </div>

      <div className="extra-info">
        <div className="extra-item">
          <BsStar size={18} />
          <span className="ml-2">500 Ratings</span>
        </div>

        <div className="extra-item">
          <BsChatDots size={18} />
          <span className="ml-2">500 Reviews</span>
        </div>

        <div className="extra-item">
          <BsGem size={18} />
          <span className="ml-2">Top Teacher</span>
        </div>

        <div className="extra-item">
          <BsDisplay size={18} />
          <span className="ml-2">500 Courses</span>
        </div>
      </div>
    </div>
  );
}
