import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import socket from "../services/socket";

export default function Editor({ documentId }) {
  const wrapperRef = useRef();
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    const editor = document.createElement("div");
    wrapperRef.current.append(editor);

    const q = new Quill(editor, { theme: "snow" });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  useEffect(() => {
    if (!quill) return;

   socket.once("document-loaded", document => {
  quill.setContents(document);
  quill.enable();
});
socket.emit("join-document", documentId);
  }, [quill, documentId]);

  useEffect(() => {
    if (!quill) return;

    const handler = (delta, old, source) => {
      if (source !== "user") return;
     socket.emit("edit-document", {
  docId: documentId,
  content: delta,
  userId: localStorage.getItem("userId") 
});
    };

    quill.on("text-change", handler);
    return () => quill.off("text-change", handler);
  }, [quill]);

useEffect(() => {
  if (!quill) return;

  const handler = (data) => {
    const currentUserId = localStorage.getItem("userId");
    
    if (data.updatedBy === currentUserId) return;
    
    quill.updateContents(data.content, "silent");
  };
  
  socket.on("document-updated", handler);
  return () => socket.off("document-updated", handler);
}, [quill]);

  return <div className="container mx-auto mt-5" ref={wrapperRef}></div>;
}
