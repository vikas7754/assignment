import "./Card.scss";
function Card({ data, hideStatus, hideImg }) {
  return (
    <div className="card">
      <div className="card_header">
        <div className="card_id">{data.id}</div>
        {!hideImg && (
          <div className="img">
            <img src={data.user?.image || "dp.avif"} alt={data.user.name} />
            <span className={data.user.available ? "online" : "offline"}></span>
          </div>
        )}
      </div>
      <div className="card_title">
        {!hideStatus && (
          <div>
            {data.status === "Backlog" && (
              <i className="fa-solid fa-circle-dot blue"></i>
            )}
            {data.status === "Todo" && <i className="fa-regular fa-circle"></i>}
            {data.status === "In progress" && (
              <i className="fa-solid fa-circle-half-stroke yellow"></i>
            )}
            {data.status === "Done" && (
              <i className="fa-solid fa-circle-check green"></i>
            )}
            {data.status === "Cancelled" && (
              <i className="fa-solid fa-circle-xmark red"></i>
            )}
          </div>
        )}
        <h4>{data.title}</h4>
      </div>
      <div className="tags">
        <div className="icon">
          {data.priority === 0 && <i className="fa-solid fa-ellipsis"></i>}
          {data.priority === 1 && (
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
          )}
          {data.priority === 2 && (
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
          )}
          {data.priority === 3 && <i className="fa-solid fa-signal"></i>}
          {data.priority === 4 && (
            <i className="fa-solid fa-circle-exclamation red"></i>
          )}
        </div>
        <div>
          {data.tag.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
