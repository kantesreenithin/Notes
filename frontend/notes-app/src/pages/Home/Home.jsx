import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import ToastMessage from "../../components/ToastMessage/ToastMessage";
import EmptyCard from "../../components/Cards/EmptyCard";
import addNoteImg from "../../assets/images/add-note.png";
import NotFoundImg from "../../assets/images/notfound.svg";
function Home() {
  const [openEditModal, setOpenEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
      type: "add",
    });
  };

  //get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/user/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("api/notes/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again");
    }
  };

  //delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(
        "/api/notes/delete-note/" + noteId
      );

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured. Please try again");
      }
    }
  };

  //search note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/api/notes/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //pin note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    const currentIsPinned = noteData.isPinned;
    try {
      const response = await axiosInstance.put(
        "/api/notes/update-note-pinned/" + noteId,
        {
          isPinned: !currentIsPinned,
        }
      );

      if (response.data && response.data.note) {
        currentIsPinned
          ? showToastMessage("Note Unpinned")
          : showToastMessage("Note Pinned");
        getAllNotes();
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
    setCurrentPage(1);
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 12;

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-4">
            {allNotes
              .slice(
                (currentPage - 1) * notesPerPage,
                currentPage * notesPerPage
              )
              .map((item, index) => (
                <NoteCard
                  key={item._id}
                  title={item.title}
                  date={item.createdOn}
                  content={item.content}
                  tags={item.tags}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updateIsPinned(item)}
                />
              ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NotFoundImg : addNoteImg}
            message={
              isSearch
                ? `Opps! No notes found matching your search.`
                : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and remainders, Let's get started! `
            }
          />
        )}
      </div>

      {/**pagination */}
      {allNotes.length > notesPerPage && (
        <div className="flex  flex-wrap justify-center mt-4 gap-2 px-4">
          {Array.from(
            {
              length: Math.ceil(allNotes.length / notesPerPage),
            },
            (_, i) => i + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`min-w-[40px] px-4 py-2 text-sm rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } cursor-pointer`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/*note add button plus*/}
      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 fixed right-4 bottom-4 sm:right-10 sm-bottom-10 z-50 cursor-pointer"
        onClick={() => {
          setOpenEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[90%]  sm:w-[70%] lg:w-[40%] max-h-[80vh]  bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto"
      >
        <AddEditNotes
          type={openEditModal.type}
          noteData={openEditModal.data}
          onClose={() => {
            setOpenEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <ToastMessage
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default Home;
