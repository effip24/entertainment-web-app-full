import "./Modal.css";

import close from "../../images/close.svg";

const Modal = ({ card, trailer, isModalOpen, onClose }) => {
  return (
    <div className={`modal ${isModalOpen ? "modal_open" : ""}`}>
      <div className="modal__container">
        <img
          className="modal__close"
          src={close}
          alt="close"
          onClick={onClose}
        ></img>

        <div className="modal__trailer-wrap">
          <iframe
            className="modal__trailer"
            width="100"
            height="100"
            src={`https://www.youtube-nocookie.com/embed/${trailer}`}
          ></iframe>
        </div>

        <div className="modal__info-container">
          <div className="modal__inner-wrap">
            <p className="modal__title">{card.title}</p>

            <div className="modal__time-rating-wrap">
              <div className="modal__time-wrap">
                <i className="modal__time-icon modal__time-icon_type_time"></i>
                <p className="modal__text">{`${
                  card.episode_run_time || card.runtime
                } minutes`}</p>
              </div>

              <div className="modal__time-wrap">
                <i className="modal__time-icon modal__time-icon_type_rating"></i>
                <p className="modal__text">{card.vote_average}</p>
              </div>
            </div>
          </div>

          <div className="modal__inner-wrap">
            <p className="modal__title">Release date</p>
            <p className="modal__text">
              {card.release_date || card.first_air_date}
            </p>
          </div>

          <div className="modal__inner-wrap">
            <p className="modal__title">Synopsis</p>
            <p className="modal__text">{card.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
