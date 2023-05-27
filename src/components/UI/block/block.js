import "./block.css";

export default function Block({ element, onClick }) {
  return (
    <div className="row disable-padding">
      <div className="col">
        <img src={element.src} alt="" width={"300px"} height={"300px"} />
      </div>
      <div className="col">
        <button value={element.fileId} onClick={onClick}>
          Delete
        </button>
      </div>
    </div>
  );
}
