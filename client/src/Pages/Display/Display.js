import axios from "../../Constant/axios";
import "./Display.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

function Display({ data, question_id, user_id, answer_view}) {
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("/users/id", {
        id: user_id,
      });
      // console.log(request);
      setName(request.data.data.user_name);
      return request;
    }
    fetchData();
  }, []);

  const openAnswersPage = (id) => {
    navigate({
      pathname: "/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };
  return (
    <div className="display" onClick={()=>openAnswersPage(question_id)}>
      <div className="display__container">
        <div className="avatar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="user"
          />
          <h4>{name}</h4>
        </div>
        <div className="question">
          {!answer_view ? <h3>{data}</h3> : <p>{data}</p>}
          
        </div>
      </div>
      {!answer_view ? <button className="right__arrow" ><ArrowForwardIosIcon  /></button> : ""}
      
    </div>
  );
}

export default Display;
