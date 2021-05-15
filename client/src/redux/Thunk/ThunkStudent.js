import { addPhotoAC,updateUserProfileAC,addResumeUserAC } from "../actionCreators/actionCreatorUser";

export const ThunkAddResumeUser = (idUser, dats)=>{
  console.log("thunk ");
  return (dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/student/addresume/${idUser}`, {
      method: "POST",
      
      body: dats
      
    })
    .then(res=>res.json())
    // .then(data=>console.log(data))
    .then(data=>dispatch(addResumeUserAC(data)))
  }
}


export const ThunkAddPhotoUser = (idUser, dats) => {
 
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_URL}/student/addphoto/${idUser}`, {
      method: "POST",

      body: dats,
    })
      .then((res) => res.json())
      // .then(data=>console.log(data))
      .then((data) => dispatch(addPhotoAC(data.UserOne.photo)));
  };
};


export const ThunkUpdateProfile = (id,name,lastName,phone,email,year,group,city,stack,language,socialLinkedin,socialGitHab,placeWork) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_URL}/student/changetext`, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        id,
        name,
        lastName,
        phone,
        email,
        year,
        group,
        city,
        stack,
        language,
        socialLinkedin,
        socialGitHab,
        placeWork,
      }),
    })
      .then((res) => res.json())
      // .then(data=>console.log(data))
      .then((data) => dispatch(updateUserProfileAC(data.UserOne)));
  };
};
