import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import API from "../services/api";
import socket from "../services/socket";
import CollaboratorModal from "../components/CollaboratorModal";

export default function EditorPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("Loading...");
  const [showCollabModal, setShowCollabModal] = useState(false);
const [isOwner, setIsOwner] = useState(false);
const [collaborators, setCollaborators] = useState([]);

  // Fetch document title
  useEffect(() => {
  API.get(`/documents/${id}`).then(res => {
    const doc = res.data.document || res.data;
    setTitle(doc.title || "Untitled Document");
    setCollaborators(doc.collaborators || []);
    
    const userId = localStorage.getItem("userId");
    setIsOwner(doc.owner._id === userId || doc.owner === userId);
  });
}, [id]);
const refreshCollaborators = () => {
  API.get(`/documents/${id}`).then(res => {
    const doc = res.data.document || res.data;
    setCollaborators(doc.collaborators || []);
  });
};

  // Leave socket room on exit
  useEffect(() => {
    return () => {
      socket.emit("leave-document", id);
    };
  }, [id]);

  // Save version
  const saveVersion = async () => {
    await API.post(`/documents/${id}/versions`);
    alert("Version saved successfully!");
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-between items-center px-10 py-4 border-b">
        <h1 className="text-xl font-bold">{title}</h1>

        <div className="flex gap-2">
  {isOwner && (
    <button
      onClick={() => setShowCollabModal(true)}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Add Collaborator
    </button>
  )}
  
  <button
    onClick={saveVersion}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Save Version
  </button>
</div>
{showCollabModal && (
  <CollaboratorModal
    documentId={id}
    onClose={() => setShowCollabModal(false)}
    onSuccess={refreshCollaborators}
  />
)}
      </div>

      <Editor documentId={id} />
    </>
  );
}
