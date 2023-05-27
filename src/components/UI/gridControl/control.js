import "./control.css";

export default function GridControlPanel({ rowSize, setRowSize, onClick }) {
  function handleChange(e) {
    let newRowSize = parseInt(e.target.value, 10);
    if (newRowSize === rowSize) {
      return;
    }
    setRowSize(newRowSize > 0 ? newRowSize : 2);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <label>Row size: </label>
          <input value={rowSize} type="number" onChange={handleChange} />
        </div>
        <div className="col">
          <button onClick={onClick}>Send</button>
          Поставить печать:
          <input
            type="checkbox"
            name="organizationSeal"
            defaultChecked={true}
          />
          Поставить подписи:
          <input type="checkbox" name="signature" defaultChecked={true} />
        </div>
      </div>
    </div>
  );
}
