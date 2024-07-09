import React, { useState, useEffect } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

function Modal({ initialNote, onClose }) {
  const [close, setClose] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (initialNote) {
      setValue("title", initialNote.title);
      setValue("content", initialNote.content);
      // Assuming 'favorate' is the correct field name based on your previous implementation
      setValue("favorate", initialNote.favorate);
    }
  }, [initialNote, setValue]);

  const createNew = (data) => {
    console.log({ ...data, user_id: localStorage.getItem("userId") });
    axios
      .post("http://localhost:8070/Note/save", {
        ...data,
        user_id: localStorage.getItem("userId"),
      })
      .then((res) => {
        console.log(res);
        alert("Note saved");
        setClose(true);
      })
      .catch((error) => {
        console.error("Error creating note:", error);
        // Handle error state or display error message to user
      });
  };

  const updateNote = (data) => {
    axios
      .put(`http://localhost:8070/Note/update/${initialNote.id}`, data)
      .then((res) => {
        console.log(res);
        alert("Note updated");
        setClose(true);
      })
      .catch((error) => {
        console.error("Error updating note:", error);
        // Handle error state or display error message to user
      });
  };

  const onSubmit = (data) => {
    if (initialNote) {
      updateNote(data); // Update existing note
    } else {
      createNew(data); // Create new note
    }
  };

  const handleClose = () => {
    setClose(!close);
  };

  const handleDelete = () => {
    // Implement delete functionality if needed
    alert("Delete functionality to be implemented.");
  };

  return close ? null : (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 relative">
        <IoMdClose
          className="absolute right-10 top-6 font-extrabold text-2xl cursor-pointer"
          onClick={handleClose}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            placeholder="Enter the title"
            labelStyle="font-semibold mt-3 text-lg font-primary"
            className="my-3 shadow-none"
            {...register("title", { required: true })}
          />
          <label
            htmlFor="body"
            className="my-2 inline-block font-semibold font-primary"
          >
            Description
          </label>
          <textarea
            id="body"
            className="w-full border-2 rounded-md p-3 font-primary text-lg"
            rows={12}
            placeholder="Enter your body here"
            {...register("content", { required: true })}
          ></textarea>
          <div className="flex mt-4">
            <button
              type="button" // Change to 'button' to make it functional
              className="bg-primary text-white py-2 px-4 rounded"
              onClick={handleDelete} // Implement delete functionality
            >
              Delete
            </button>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-12 rounded ml-4"
            >
              {initialNote ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
