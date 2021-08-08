import { ApiUrl } from "api/authUser";
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import "./index.css";
import { BsHeart, BsClockHistory } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import userAPi from "api/userApi";

export default function CardPaymentInfo({ course }) {
  const token = useSelector((state) => state.user.token);

  const handleAddToFavorite = async () => {
    if (!token) {
      return toast.info("Please login to use this feature!");
    }
    const { success, msg } = await userAPi.addCoursesToFavorite({ courseId: course._id });
    success && toast.success("Successfully add to favorite");
    msg && toast.error("This course has been added !");
  };

  const handleBuy = async () => {
    if (!token) {
      return toast.info("Please login to use this feature!");
    }
  };

  return (
    <Card>
      <Card.Body>
        <img src={`${ApiUrl}resources/image/${course.avatar}`} alt="img" className="w-100" height={250} style={{ borderRadius: "5px" }} />
        <div className="info-card">
          <div className="price">
            <div className="d-flex align-items-center">
              <div className="origin mr-3">${course.originPrice}</div>
              <del style={{ fontSize: "1.1rem", color: "#77838F" }}>$900</del>
            </div>

            <h5 className="discount">
              <Badge style={{ fontWeight: "400", padding: " 10px 13px", backgroundColor: "#B8B2FD" }}>40$ Off</Badge>
            </h5>
          </div>
          <div className="register-action">
            <Button variant="primary" size="lg" className="buy-button" onClick={handleBuy}>
              Buy this course
            </Button>
          </div>
          <ul className="list-info">
            <li className="list-item">
              <div className="head d-flex align-items-center">
                <BsClockHistory color="#949DA6" size={15} />
                <div className="head__label ml-3">Duration</div>
              </div>
              <div className="tail">10</div>
            </li>
            <li className="list-item">
              <div className="head d-flex align-items-center">
                <BsClockHistory color="#949DA6" size={15} />
                <div className="head__label ml-3">Lessons</div>
              </div>
              <div className="tail">10</div>
            </li>
            <li className="list-item">
              <div className="head d-flex align-items-center">
                <BsClockHistory color="#949DA6" size={15} />
                <div className="head__label ml-3">Enrolled</div>
              </div>
              <div className="tail">10</div>
            </li>
            <li className="list-item">
              <div className="head d-flex align-items-center">
                <BsClockHistory color="#949DA6" size={15} />
                <div className="head__label ml-3">Last Update</div>
              </div>
              <div className="tail">10</div>
            </li>
          </ul>
          <div className="d-flex justify-content-center">
            <Button variant="outline-warning" onClick={() => handleAddToFavorite()}>
              <BsHeart /> Add To Favorite
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

//             <div style={{ margin: "30px 0 150px 0" }}>
//               <Button variant="primary" size="lg" style={{ marginRight: "30px" }} onClick={handleAddToFavorite}>
//                 Add to your wishlist
//               </Button>
//               <Button variant="primary" size="lg">
//                 Assign
//               </Button>
//             </div>
