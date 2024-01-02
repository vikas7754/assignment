import { useEffect, useRef, useState } from "react";
import "./MainContent.css";
import Card from "../Card/Card";

const priorities = [
  {
    id: 0,
    title: "No priority",
  },
  { id: 4, title: "Urgent" },
  { id: 3, title: "High" },
  { id: 2, title: "Medium" },
  { id: 1, title: "Low" },
];
const status = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

function MainContent(props) {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [data, setData] = useState([]);
  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  const btnRef = useRef(null);
  const selectionRef = useRef(null);

  const sortData = (data, sorting) => {
    const newData = data.sort((a, b) => {
      if (sorting === "priority") {
        return a.priority - b.priority;
      } else if (sorting === "title") {
        if (a.title < b.title) return -1;
        else if (a.title > b.title) return 1;
        else return 0;
      }
    });
    return newData;
  };

  const groupData = (grouping, sorting) => {
    const { data } = props;
    const newData = [];
    if (grouping === "status") {
      status.forEach((stat) => {
        const temp = data.tickets.filter((item) => item.status === stat);
        const newTemp = temp.map((item) => {
          return {
            ...item,
            user: data.users.find((user) => user.id === item.userId),
          };
        });
        const sortedData = sortData(newTemp, sorting);
        newData.push(sortedData);
      });
    } else if (grouping === "user") {
      const users = data.users.map((user) => user.id);
      users.forEach((user) => {
        const temp = data.tickets.filter((item) => item.userId === user);
        const newTemp = temp.map((item) => {
          return {
            ...item,
            user: data.users.find((user) => user.id === item.userId),
          };
        });
        const sortedData = sortData(newTemp, sorting);
        newData.push(sortedData);
      });
    } else if (grouping === "priority") {
      priorities.forEach((p) => {
        const temp = data.tickets.filter((item) => item.priority === p.id);
        const newTemp = temp.map((item) => {
          return {
            ...item,
            user: data.users.find((user) => user.id === item.userId),
          };
        });
        const sortedData = sortData(newTemp, sorting);
        newData.push(sortedData);
      });
    }
    return newData;
  };

  useEffect(() => {
    const newData = groupData(grouping, ordering);
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grouping, ordering]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !btnRef?.current?.contains(e.target) &&
        !selectionRef?.current?.contains(e.target)
      )
        setToggleBtn(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header">
        <button ref={btnRef} onClick={() => setToggleBtn(!toggleBtn)}>
          <i className="fa-solid fa-sliders"></i>
          <span>Display</span>
          {toggleBtn ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
        <div ref={selectionRef} className={`selection ${toggleBtn && "show"}`}>
          <div>
            <label htmlFor="grouping">Grouping</label>
            <select
              name="grouping"
              id="grouping"
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label htmlFor="ordering">Ordering</label>
            <select
              name="ordering"
              id="ordering"
              onChange={(e) => setOrdering(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
      <main>
        {data?.map((item, i) => (
          <div key={i}>
            <div className="col-header">
              <div>
                {grouping === "status" && (
                  <>
                    {i === 0 && (
                      <>
                        <i className="fa-solid fa-circle-dot blue"></i>
                        <strong>Backlog</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <i className="fa-regular fa-circle"></i>
                        <strong>Todo</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <i className="fa-solid fa-circle-half-stroke yellow"></i>
                        <strong>In progress</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <i className="fa-solid fa-circle-check green"></i>
                        <strong>Done</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <i className="fa-solid fa-circle-xmark red"></i>
                        <strong>Cancelled</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                  </>
                )}
                {grouping === "user" && (
                  <>
                    <div className="img">
                      <img
                        src={item[0]?.user?.image || "dp.avif"}
                        alt={item[0]?.user?.name}
                        width={20}
                      />
                      <span
                        className={
                          item[0]?.user?.available ? "online" : "offline"
                        }
                      ></span>
                    </div>
                    <strong>{item[0]?.user?.name}</strong>
                    <span>({item.length})</span>
                  </>
                )}
                {grouping === "priority" && (
                  <>
                    {i === 0 && (
                      <>
                        <i className="fa-solid fa-ellipsis"></i>
                        <strong>No priority</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 1 && (
                      <>
                        <i className="fa-solid fa-circle-exclamation red"></i>
                        <strong>Urgent</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 2 && (
                      <>
                        <i className="fa-solid fa-signal"></i>
                        <strong>High</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <i>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="#2e3436">
                              <path d="m 1 10 c -0.554688 0 -1 0.445312 -1 1 v 3 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -3 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" />
                              <path
                                d="m 13 1 c -0.554688 0 -1 0.445312 -1 1 v 12 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -12 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 9 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -9 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 6 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -6 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0"
                                fillOpacity="0.54902"
                              />
                            </g>
                          </svg>
                        </i>
                        <strong>Medium</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <i>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g fill="#2e3436">
                              <path d="m 1 10 c -0.554688 0 -1 0.445312 -1 1 v 3 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -3 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" />
                              <path
                                d="m 13 1 c -0.554688 0 -1 0.445312 -1 1 v 12 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -12 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 9 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -9 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 6 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -6 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0"
                                fillOpacity="0.34902"
                              />
                            </g>
                          </svg>
                        </i>
                        <strong>Low</strong>
                        <span>({item.length})</span>
                      </>
                    )}
                  </>
                )}
              </div>
              <div>
                <button>
                  <i className="fa-solid fa-plus"></i>
                </button>
                <button>
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
            <div className="cards">
              {item?.map((ticket, i) => (
                <Card
                  key={i}
                  data={ticket}
                  hideStatus={grouping === "status"}
                  hideImg={grouping === "user"}
                />
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default MainContent;
