import "./control.css";

export default function GridControlPanel({
  rowSize,
  setRowSize,
  onClick,
  pirntParams,
  setPrintParams
}) {
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
          <input
            value={rowSize}
            type="number"
            onChange={handleChange}
            disabled={true}
          />
        </div>
        <div className="col">
          <button onClick={onClick}>Send</button>
          Поставить печать:
          <input
            type="checkbox"
            name="organizationSeal"
            defaultChecked={pirntParams.seal}
            onChange={() => {
              setPrintParams({ ...pirntParams, seal: !pirntParams.seal });
            }}
          />
          Поставить подписи:
          <input
            type="checkbox"
            name="signature"
            defaultChecked={pirntParams.signature}
            onChange={() => {
              setPrintParams({
                ...pirntParams,
                signature: !pirntParams.signature
              });
            }}
          />
          Версия для печати:
          <input
            type="checkbox"
            name="printOnly"
            defaultChecked={pirntParams.printOnly}
            onChange={() => {
              setPrintParams({
                ...pirntParams,
                printOnly: !pirntParams.printOnly
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
