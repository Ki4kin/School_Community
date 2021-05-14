import {ADDPHOTO,APDATEUSER,ADDREZUME} from "../actionTypes/actionTypes";

export const addPhotoAC = (payload)=>{
  return {
    type: ADDPHOTO,
    payload
  }
}
export const apdateUserProfileAC = (payload)=>{
  return {
    type: APDATEUSER,
    payload
  }
}


export const addResumeUserAC = (payload)=>{
  return {
    type: ADDREZUME,
    payload
  }
}
