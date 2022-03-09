import userAPi from 'api/userApi';
import { generateURLGetImageResource, getFormatDate } from 'helpers';
import React, { useState } from 'react';
import { Badge, Button, Card, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsClockHistory, BsGift, BsHeart, BsCloudUpload, BsFilm, BsPersonPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserAttendedCourses, updateUserFavoriteCourses } from 'store/userSlice';
import './index.css';

export default function CardPaymentInfo({ course }) {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);
  const attendedCourses = useSelector((state) => state.user.userInfo?.attendedCourses);
  const favoriteCourses = useSelector((state) => state.user.userInfo?.favoriteCourses);

  const [showPayModal, setShowPayModal] = useState(false);

  const isExistInFavoriteList = favoriteCourses && favoriteCourses.includes(course._id);
  const isAttended = attendedCourses && attendedCourses.includes(course._id);

  const handleAddToFavorite = async () => {
    if (!token) {
      return toast.info('Please login to use this feature!');
    }
    if (isExistInFavoriteList) {
      return toast.info('This course is in your favorite courses!');
    }
    const { success, msg, updatedFavoriteCourses } = await userAPi.addCoursesToFavorite({ courseId: course._id });
    if (success) {
      toast.success('Successfully add to favorite');
      dispatch(updateUserFavoriteCourses(updatedFavoriteCourses));
    }
    msg && toast.error(msg);
  };

  const handleBuy = async () => {
    if (!token) {
      return toast.info('Please login to use this feature!');
    }
    if (isAttended) {
      return toast.info('You already buy this course. Let learn in tab Curriculum!');
    }
    setShowPayModal(true);
  };

  const handleAgreePayment = async () => {
    const { success, updatedAttendedCourses } = await userAPi.attendCourse({ courseId: course._id });
    if (success) {
      setShowPayModal(false);
      toast.success('Congratulations, you have successfully registered for the course 🎉🎉🎉');
      dispatch(updateUserAttendedCourses(updatedAttendedCourses));
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <img
            src={generateURLGetImageResource(course.avatar)}
            alt="img"
            className="w-100"
            height={250}
            style={{ borderRadius: '5px' }}
          />
          <div className="info-card">
            <div className="price">
              <div className="d-flex align-items-center">
                <div className="origin mr-3">${course.totalPrice}</div>
                <del style={{ fontSize: '1.1rem', color: '#77838F' }}>${course.originPrice}</del>
              </div>

              <h5 className="discount">
                <Badge style={{ fontWeight: '400', padding: ' 10px 13px', backgroundColor: '#B8B2FD' }}>
                  {course.promotion.discount * 100}% Off
                </Badge>
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
                  <BsFilm color="#949DA6" size={15} />
                  <div className="head__label ml-3">Lessons</div>
                </div>
                <div className="tail">{course.sections.reduce((sum, section) => section.lectures.length + sum, 0)}</div>
              </li>
              <li className="list-item">
                <div className="head d-flex align-items-center">
                  <BsPersonPlus color="#949DA6" size={15} />
                  <div className="head__label ml-3">Enrolled</div>
                </div>
                <div className="tail">{course.students.length}</div>
              </li>
              <li className="list-item">
                <div className="head d-flex align-items-center">
                  <BsGift color="#949DA6" size={15} />
                  <div className="head__label ml-3">Promotion</div>
                </div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 300 }}
                  overlay={<Tooltip id="button-tooltip">{course.promotion.title}</Tooltip>}
                >
                  <div className="tail">- {course.promotion.discount * 100}%</div>
                </OverlayTrigger>
              </li>
              <li className="list-item">
                <div className="head d-flex align-items-center">
                  <BsClockHistory color="#949DA6" size={15} />
                  <div className="head__label ml-3">Last Update</div>
                </div>
                <div className="tail">{getFormatDate(course.updatedAt)}</div>
              </li>
              <li className="list-item">
                <div className="head d-flex align-items-center">
                  <BsCloudUpload color="#949DA6" size={15} />
                  <div className="head__label ml-3">Full Lectures</div>
                </div>
                <div className="tail">{course.isComplete ? 'Yes' : 'No'}</div>
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
      <Modal centered show={showPayModal} onHide={() => setShowPayModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do your want to by this course with price ${course.totalPrice}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPayModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAgreePayment}>
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
