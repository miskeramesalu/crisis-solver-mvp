import React, { useState, useEffect } from "react";
import { fetchMedia, uploadMedia, viewMedia } from "../api";

const MediaTab = () => {
  const [media, setMedia] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploaderId, setUploaderId] = useState("");
  const [status, setStatus] = useState("");

  const loadMedia = async () => {
    setMedia(await fetchMedia());
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUpload = async () => {
    try {
      const res = await uploadMedia({
        file,
        title,
        description: desc,
        uploaderId,
      });
      setStatus(`Uploaded: ${res.id}`);
      loadMedia();
    } catch (err) {
      setStatus("Upload failed: " + err.message);
    }
  };

  const handleView = async (id) => {
    const viewerId = prompt("Enter your account ID:");
    if (!viewerId) return;
    try {
      await viewMedia({ mediaId: id, viewerAccountId: viewerId });
      setStatus("View recorded & token rewarded");
      loadMedia();
    } catch (err) {
      setStatus("View failed: " + err.message);
    }
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Upload Media</h3>
      <input
        placeholder="Uploader ID"
        value={uploaderId}
        onChange={(e) => setUploaderId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      <h4 className="mt-4 font-semibold">Media List</h4>
      {media.map((m) => (
        <div key={m._id} className="border p-2 my-2 rounded shadow-sm">
          <strong>{m.title}</strong>
          <p>{m.description}</p>
          <p>Views: {m.views || 0}</p>
          <button
            className="bg-green-600 text-white px-2 py-1 mt-1 rounded"
            onClick={() => handleView(m._id)}
          >
            View & Earn Token
          </button>
        </div>
      ))}
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default MediaTab;
