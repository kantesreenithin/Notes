import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosinstance";

function AddEditNotes({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  //Add New Note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/notes/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  //Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(
        "/api/notes/edit-note/" + noteId,
        {
          title,
          content,
          tags,
        }
      );

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200 bg-slate-100 sm:hover:bg-slate-300"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-500 cursor-pointer" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="w-full text-xl sm:text-2xl text-slate-950 outline-none bg-slate-50 p-3 rounded mt-2"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="w-full text-sm sm:text-base text-slate-950 outline-none bg-slate-50 p-3 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="w-full sm:w-auto bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition mt-5 cursor-pointer"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

export default AddEditNotes;
