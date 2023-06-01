import { useState, useCallback, useRef } from "react";
import GridLayout from "react-grid-layout";
import DropZone from "../dropzone/dropzone";
import Block from "../UI/block/block";
import GridControlPanel from "../UI/gridControl/control";

const HeightControlBlock = 2;
const HeightMoveBlock = 3;

export default function Grid() {
  const [rowSize, setRowSize] = useState(2);
  const [files, setFiles] = useState([]);
  const [changeFiles, setChangeFiles] = useState(false);
  const [changeLayouts, setChangeLayouts] = useState(false);
  const [pirntParams, setPrintParams] = useState({
    seal: true,
    signature: true,
    printOnly: false
  });
  const gridRef = useRef(null);

  const makeLayouts = useCallback(() => {
    if (changeFiles) {
      setChangeFiles(false);
      setChangeLayouts(false);
    }
    if (changeLayouts) {
      return changeLayouts;
    }
    let layout = [
      { i: "0", x: 0, y: 0, w: rowSize, h: HeightControlBlock, static: true }
    ];
    for (let element = 0; element < files.length; element++) {
      layout.push({
        i: element + 1 + "",
        x: element % rowSize,
        y:
          (HeightControlBlock + Math.floor(element / rowSize) - 1) *
            HeightMoveBlock -
          1,
        w: 1,
        h: HeightMoveBlock,
        fileId: element,
        src: files[element].preview
      });
    }
    return layout;
  }, [rowSize, changeFiles, changeLayouts]);

  let layouts = makeLayouts();

  const gridItems = layouts.slice(1).map((element) => (
    <div key={element.i} className="container">
      <Block element={element} onClick={handleDelete} />
    </div>
  ));

  function handleClick(e) {
    let newFiles = new Array(layouts.length - 1);
    let copyFiles = [...files];
    for (let index = 1; index < files.length + 1; index++) {
      let idx =
        ((layouts[index].y + 1 + HeightMoveBlock * (1 - HeightControlBlock)) /
          HeightMoveBlock) *
        rowSize;
      newFiles[Math.floor(idx) + layouts[index].x] =
        copyFiles[parseInt(layouts[index].i, 10) - 1];
    }
    console.log(newFiles.filter(Boolean));
    console.log(pirntParams);
  }

  function handleDelete(e) {
    setFiles(files.filter((file) => file !== files[e.target.value]));
    let gridLayout = [...gridRef.current.state.layout];
    for (let i = 1; i < layouts.length; i++) {
      layouts[i].x = gridLayout[i].x;
      layouts[i].y = gridLayout[i].y;
    }
    setChangeLayouts(
      layouts.filter(
        (lay) => parseInt(lay.i, 10) !== parseInt(e.target.value, 10) + 1
      )
    );
  }

  function onLayoutChange(newLayouts) {
    for (let i = 1; i < layouts.length; i++) {
      layouts[i].x = newLayouts[i].x;
      layouts[i].y = newLayouts[i].y;
    }
    setChangeLayouts(layouts);
  }

  return (
    <GridLayout
      className="layout"
      layout={layouts}
      cols={rowSize}
      compactType="vertical"
      isResizable={false}
      onLayoutChange={onLayoutChange}
      rowHeight={110}
      width={1140}
      ref={gridRef}
    >
      <div key="0">
        <DropZone setFiles={setFiles} setChangeFiles={setChangeFiles} />
        <GridControlPanel
          rowSize={rowSize}
          setRowSize={setRowSize}
          onClick={handleClick}
          pirntParams={pirntParams}
          setPrintParams={setPrintParams}
        />
      </div>
      {gridItems}
    </GridLayout>
  );
}
