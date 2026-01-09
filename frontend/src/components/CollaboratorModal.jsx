import { useState } from "react";
import API from "../services/api";

export default function CollaboratorModal({ documentId, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const addCollaborator = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    setLoading(true);
    try {
      await API.post(`/documents/${documentId}/collaborators`, { email });
      alert("Collaborator added successfully!");
      setEmail("");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add collaborator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Add Collaborator</h2>
        
        <input
          className="input w-full"
          placeholder="Enter collaborator email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button
            className="btn bg-blue-600 text-white flex-1"
            onClick={addCollaborator}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
          <button
            className="btn bg-gray-300 flex-1"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}