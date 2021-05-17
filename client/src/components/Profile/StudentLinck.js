import React from "react";

function StudentLinck({ student }) {
  return (
    <div className="student-linck">
      {!student.socialGitHab && (
        <a href="#">
          <img
            className="student-linck"
            src={`${process.env.REACT_APP_URL}/github.png`}
            alt="github"
          />
        </a>
      )}
      {student.socialGitHab && (
        <a href={student.socialGitHab}>
          <img
            className="student-linck"
            src={`${process.env.REACT_APP_URL}/github.png`}
            alt="github"
          />
        </a>
      )}
      {!student.socialTelegramm &&
      <a href="#">
        <img
          className="student-linck"
          src={`${process.env.REACT_APP_URL}/telegram.png`}
          alt=""
        />
      </a>
      }
      {student.socialTelegramm &&
      <a href={student.socialTelegramm}>
        <img
          className="student-linck"
          src={`${process.env.REACT_APP_URL}/telegram.png`}
          alt=""
        />
      </a>
      }
      {!student.phone &&
      <a href="#">
        <img
          className="student-linck"
          src={`${process.env.REACT_APP_URL}/watapp.png`}
          alt=""
        />
      </a>
      }
       {student.phone &&
      <a href={`https://wa.me/${student.phone}`}>
        <img
          className="student-linck"
          src={`${process.env.REACT_APP_URL}/watapp.png`}
          alt=""
        />
      </a>
      }

      {!student.instagramm &&      
      <a href="#">
        <img
          className="student-linck"
          src={`${process.env.REACT_APP_URL}/insta.png`}
          alt=""
        />
      </a>
      }
      {student.instagramm &&      
      <a href={student.instagramm}>
        <img
          className="student-linck"
          src={`${process.env.REACT_APP_URL}/insta.png`}
          alt=""
        />
      </a>
      }
    </div>
  );
}

export default StudentLinck;
