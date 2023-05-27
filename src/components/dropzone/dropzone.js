import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./dropzone.css";

export default function DropZone({ setFiles, setChangeFiles }) {
  const onDropAccepted = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    setChangeFiles(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    onDropAccepted
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}
