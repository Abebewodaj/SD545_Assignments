import { useState, useRef, ChangeEvent } from "react";
import dayjs from "dayjs";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import avatar from "./images/bozai.png";
import classNames from "classnames";
// Comment List data
const defaultList = [
  {
    // comment id
    rpid: 3,
    // user info
    user: {
      uid: "13258165",
      avatar: "",
      uname: "Jay Zhou",
    },
    // comment content
    content: "Nice, well done",
    // created datetime
    ctime: "10-18 08:15",
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar: "",
      uname: "Song Xu",
    },
    content: "I search for you thousands of times, from dawn till dusk.",
    ctime: "11-13 11:29",
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "John",
    },
    content:
      "I told my computer I needed a break... now it will not stop sending me vacation ads.",
    ctime: "10-19 09:00",
    like: 66,
  },
  {
    rpid: 4,
    user: {
      uid: "30009257",
      avatar,
      uname: "John",
    },
    content: "Follow Me",
    ctime: "10-18 09:00",
    like: 77,
  },
];
// current logged in user info
const user = {
  // userid
  uid: "30009257",
  // profile
  avatar,
  // username
  uname: "John",
};
type CommentType = {
  rpid: number | string;
  user: {
    uid: string;
    avatar: string;
    uname: string;
  };
  content: string;
  ctime: string;
  like: number;
};
// Nav Tab
const tabs = [
  { type: "hot", text: "Top" },
  { type: "newest", text: "Newest" },
  { type: "oldest", text: "Oldest" },
];

const App = () => {
  const [commentList, setCommentList] = useState<CommentType[]>(
    _.orderBy(defaultList, "like", "desc")
  );
  const [commentContent, setcommentContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeType, setaActiveType] = useState("hot");

  const deleteComment = (rpid: number | string) => {
    setCommentList(commentList.filter((item) => item.rpid !== rpid)); //exclude this comment id(rpid: number) from commnet list if user own the comment
  };
  const changeactiveType = (activeType: string) => {
    setaActiveType(activeType);
    if (activeType === "hot") {
      setCommentList(_.orderBy(commentList, "like", "desc"));
    } else {
      setCommentList(_.orderBy(commentList, "ctime", "desc"));
    }
  };
  const makePost = () => {
    const newComment = {
      rpid: commentList.length,
      user,
      content: textareaRef.current!.value,
      ctime: dayjs(Date.now()).format("MM-DD HH:mm"),
      like: 0,
    };

    setCommentList([...commentList, newComment]);
    textareaRef.current!.value = "";
    //textareaRef.current!.focus();
  };
  // do another version: controlled component

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setcommentContent(event.target.value);
    //console.log(event.target.value);
  };
  const makePostControlled = () => {
    const newComment: CommentType = {
      rpid: uuidv4(),
      user,
      content: commentContent,
      ctime: dayjs(Date.now()).format("MM-DD HH:mm"),
      like: 0,
    };

    setCommentList([...commentList, newComment]);
    setcommentContent(""); // Clear the input after posting
    textareaRef.current!.focus();
  };
  return (
    <div className="app">
      {/* to display active type while tab is clicked   {activeType}  */}
      {activeType}
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Like */}
            <span className="total-reply">{commentList.length}</span>      
          </li>
          <li className="nav-sort">
            {/* highlight class name： active */}
            {tabs.map((tab) => (
              <span
                key={tab.type}
                // className={classNames("nav-item", {
                //   active: tab.type === activeType,
                className={`nav-item ${tab.type === activeType && "active"}`}
                // onClick={() => setaActiveType(tab.type)}  both method will works
                onClick={() => changeactiveType(tab.type)}
              >
                {/* tab.type ==> will display all tabs.type since it is inside loop(map)  */}
                {tab.text}
              </span>
            ))}

            {/* <span className="nav-item">Newest</span> */}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          {/* current logged in user profile */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* comment */}
            <textarea
              className="reply-box-textarea"
              ref={textareaRef} // use ref to get DOM textarea element value
              placeholder="tell something..."
              value={commentContent}
              onChange={handleTextareaChange}
            />
            {/* post button */}
            <div className="reply-box-send" onClick={makePostControlled}>
              <div className="send-text">post</div>
            </div>
          </div>
        </div>
        {/* comment list */}
        {/* ------------------------------------------------------------------------ */}
        <div className="reply-list">
          {/* comment item */}
          {commentList.map((item) => (
            <Item_ChildComponent
              item={item}
              deleteCommentFunction={deleteComment}
              loggedInUser={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
type ItemPropsType = {
  item: CommentType;
  deleteCommentFunction: (rpid: number | string) => void;
  loggedInUser: { uid: string };
};
// {item,deleteCommentFunction,loggedInUser}:
function Item_ChildComponent(props:ItemPropsType) {
  const { item,deleteCommentFunction } = props;
  
  return (
    <div className="reply-item" key={item.rpid}>
      {/* profile */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" />
        </div>
      </div>

      <div className="content-wrap">
        {/* username */}
        <div className="user-info">
          <h4>This is Item Component!</h4>
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* comment content */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* comment created time */}
            <span className="reply-time">{item.ctime}</span>
            {/* total likes */}
            <span className="reply-time">Like:{item.like}</span>

            {item.user.uid === user.uid && ( // if this does not match(item.user.uid === user.uid) delete button won't dispalyed or will be hided
              <span
                className="delete-btn"
                onClick={() => deleteCommentFunction(item.rpid)}
              >
                Delete
              </span>
            )}
            {/* {item.user.uid === user.uid?(
                         <span
                          className="delete-btn"                          // or
                          onClick={() => deleteComment(item.rpid)}
                        >
                          Delete
                        </span>
                      ):''} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
