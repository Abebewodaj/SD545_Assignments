import User from "../../types/user.type";
import { axiosInstance } from "../axios";

//service function

const login = (user: User) => {
  return axiosInstance.post("/auth/login", user);
};
//export default login

const getSongs = (searchKeyword?: string) => {
  if (searchKeyword) {
    return axiosInstance.get(`/music?search=${searchKeyword}`);
  }else{
    return axiosInstance.get("/music");
  }
};
const getPlaylistHandler = () =>{
  return axiosInstance.get('/playlist')
}
const addToPlaylistHandler = (songId:string) =>{
  return axiosInstance.post("playlist/add", {songId });
}
const removeFromPlaylistHandler = (songId: string) => {
return axiosInstance.post('/playlist/remove', { songId });
}
export {
  //   use default export instead of export
  login,
  getSongs,
  addToPlaylistHandler,
  removeFromPlaylistHandler,
  getPlaylistHandler,
};
