import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../common/Sidebar";
import { useAuth } from "../utils/Auth";
import Toast from "../common/Toast";
import LoadingBar from "react-top-loading-bar";
export default function Dash() {
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [err, setErr] = useState("");
  const [errState, setErrState] = useState();
  const [progress, setProgress] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [commentContents, setCommentContents] = useState({});
  function storeComment(e, id) {
    e.preventDefault();

    setProgress(50);

    if (!commentContents[id]) {
      setErr("Enter Comment");
      setErrState(true);

      setTimeout(() => {
        setErr("");
        setErrState(false);
      }, 3000);
    } else {
      axios
        .post(`http://${auth.ip}:8000/api/storeComment`, {
          user_id: auth.user.id,
          feedback_id: id,
          content: commentContents[id],
        })
        .then((response) => {
          if (response.data.status === 200) {
            setErr(response.data.message);
            setErrState(false);
            fetchFeedbacks();
            setProgress(100);

            setCommentContents({
              ...commentContents,
              [id]: "",
            });
          } else {
            setErr(response.data.message);
            setErrState(true);
            setTimeout(() => {
              setErr("");
              setErrState(false);
            }, 3000);
            setProgress(100);
          }
        });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(50);
    if (!title) {
      setErr("Enter Title");
      setErrState(true);

      setTimeout(() => {
        setErr("");
        setErrState(false);
      }, 3000);
    } else if (!category) {
      setErr("chose category");
      setErrState(true);

      setTimeout(() => {
        setErr("");
        setErrState(false);
      }, 3000);
    } else if (!description) {
      setErr("Enter description");
      setErrState(true);

      setTimeout(() => {
        setErr("");
        setErrState(false);
      }, 3000);
    } else {
      axios
        .post(`http://${auth.ip}:8000/api/storeFeedback`, {
          user_id: auth.user.id,
          title: title,
          category: category,
          description: description,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setErr(response.data.message);
            setErrState(false);
            fetchFeedbacks();
            setProgress(100);

            setTitle("");
            setDescription("");
            setCategory("");
          } else {
            setErr(response.data.message);
            setErrState(true);
            setTimeout(() => {
              setErr("");
              setErrState(false);
            }, 3000);
            setProgress(100);
          }
        });
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(
        `http://${auth.ip}:8000/api/getAllFeedbackWithComments`
      );
      setFeedbacks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <>
      <LoadingBar
        color="#C39601"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Sidebar />
      <Toast err={err} errState={errState} />
      <div className="container mx-auto max-w-screen-xl flex flex-col md:flex-row gap-x-10  justify-center items-start my-5 px-5">
        <div className="flex flex-col md:w-full mx-auto w-11/12 ">
          <div className="space-y-5">
            <h1 className="text-lg text-white ">Recent Feedbacks</h1>

            <div>
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex flex-col rounded-2xl shadow w-full mb-4"
                  style={{ backgroundColor: "#2f2f2f" }}
                >
                  <div
                    className="flex flex-col rounded-2xl shadow items-start gap-y-1 px-10 py-5 justify-between"
                    style={{ backgroundColor: "#111111" }}
                  >
                    <div className="flex flex-row  w-full justify-between ">
                      <h5
                        className="text-2xl font-medium"
                        style={{ color: "#C39601" }}
                      >
                        {feedback.title}
                      </h5>
                      <p
                        className="font-light text-base"
                        style={{ color: "#FAFAFA" }}
                      >
                        ~ {feedback.user_name}
                      </p>
                    </div>
                    <p
                      className="font-thin text-base"
                      style={{ color: "#FAFAFA" }}
                    >
                      {feedback.category}
                    </p>
                    <p
                      className="font-light text-base text-justify"
                      style={{ color: "#FAFAFA" }}
                    >
                      {feedback.description}
                    </p>
                  </div>

                  <div className="flex flex-col px-10 py-5 text-justify">
                    {feedback.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col  w-full justify-between mb-2"
                      >
                        <div className="space-y-2 mb-2">
                          <div>
                            <div className="flex flex-row  w-full justify-between ">
                              <h5
                                className="text-xl font-normal"
                                style={{ color: "#FAFAFA" }}
                              >
                                {comment.user_name}
                              </h5>
                              <p
                                className="font-light text-base"
                                style={{ color: "#FAFAFA" }}
                              >
                                {comment.formatted_date}
                              </p>
                            </div>
                            <p
                              className="font-extralight text-base italic "
                              style={{ color: "#FAFAFA" }}
                            >
                              {comment.content}
                            </p>
                          </div>
                          <hr className="opacity-20" />
                        </div>
                      </div>
                    ))}

                    <div className="w-full">
                      <form>
                        <div className="flex items-center">
                          <textarea
                            id={`chat_${feedback.id}`}
                            rows="1"
                            className="block mr-4 p-2.5 w-full text-sm rounded-lg"
                            placeholder="Leave a Comment"
                            style={{
                              backgroundColor: "#111111",
                              color: "#F6F6F6",
                            }}
                            value={commentContents[feedback.id]}
                            onChange={(e) =>
                              setCommentContents({
                                ...commentContents,
                                [feedback.id]: e.target.value,
                              })
                            }
                          ></textarea>
                          <button
                            onClick={(e) => storeComment(e, feedback.id)}
                            style={{ color: "#C39601" }}
                            type="submit"
                            className="inline-flex justify-center p-2  rounded-full cursor-pointer hover:bg-yellow-100-100"
                          >
                            <svg
                              className="w-5 h-5 rotate-90 rtl:-rotate-90"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 18 20"
                            >
                              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className=" space-y-4 rounded-2xl p-5 w-3/6 sticky top-20 mt-12"
          style={{ backgroundColor: "#2F2F2F" }}
        >
          <h1
            className="text-xl leading-tight tracking-tight  md:text-lg "
            style={{ color: "#C39601" }}
          >
            Leave Your Feedback
          </h1>
          <form className="space-y-4 md:space-y-2" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="EventTitle"
                className="block mb-2 text-sm font-medium mt-2"
                style={{ color: "#F6F6F6" }}
              >
                Title
              </label>
              <input
                type="text"
                name="EventTitle"
                id="EventTitle"
                className="sm:text-sm rounded-xl w-full px-4 py-2"
                style={{ backgroundColor: "#111111", color: "#F6F6F6" }}
                placeholder="Feedback Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium mt-2"
                style={{ color: "#F6F6F6" }}
              >
                Category
              </label>
              <select
                id="categories"
                className="sm:text-sm rounded-xl w-full px-4 py-2"
                style={{ backgroundColor: "#111111", color: "#F6F6F6" }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Choose a category
                </option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Improvement">Improvement</option>
              </select>

              <label
                htmlFor="comments"
                className="block mb-2 text-sm font-medium mt-2"
                style={{ color: "#F6F6F6" }}
              >
                Description
              </label>
              <textarea
                name="comments"
                id="comments"
                className="sm:text-sm rounded-lg block w-full p-2.5 resize-none h-28"
                style={{ backgroundColor: "#111111", color: "#F6F6F6" }}
                placeholder="Please describe your problem."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="py-1 rounded-2xl w-full mt-2"
                style={{
                  color: "#C39601",
                  transition: "1ms",
                  border: "2px solid #C39601",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#C39601";
                  e.target.style.color = "#111111";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "initial";
                  e.target.style.color = "#C39601";
                }}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
