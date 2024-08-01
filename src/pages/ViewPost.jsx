import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewPost({ note, onClose }) {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    setValue("title", note.title);
    setValue("content", note.content);
    setValue("favorate", note.favorate);
  }, [note, setValue]);
  const updateNote = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8070/Note/update/${note.id}`,
        {
          title: data.title,
          content: data.content,

          user_id: note.user.id, // Assuming the note object has a user property with an id
        }
      );

      navigate("/");

      console.log(response.data); // This will log "Note updated successfully"
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response?.data || error.message
      );
      // Handle error (e.g., show an error message to the user)
    }
  };

  const deleteNote = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8070/Note/delete/${note.id}`
      );

      navigate("/");

      console.log(response.data);
      onDelete(note.id); // Call the onDelete prop to update the parent component
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 relative">
        <IoMdClose
          className="absolute right-10 top-6 font-extrabold text-2xl cursor-pointer"
          onClick={onClose}
        />
        <form onSubmit={handleSubmit(updateNote)}>
          <Input
            label="Title"
            placeholder="enter the title"
            labelStyle="font-semibold mt-3 text-lg font-primary"
            className="my-3 shadow-none"
            {...register("title", { required: true })}
          />
          <label
            htmlFor="content"
            className="my-2 inline-block font-semibold font-primary"
          >
            Description
          </label>
          <textarea
            id="content"
            className="w-full border-2 rounded-md p-3 font-primary text-lg"
            rows={12}
            placeholder="enter your content here"
            {...register("content", { required: true })}
          ></textarea>

          <div className="flex mt-4 items-center justify-between">
            <button
              type="submit"
              className=" font-primary bg-green-700 text-white py-2 px-4 rounded"
              onClick={updateNote}
            >
              Save Changes
            </button>
            <button
              className=" font-primary bg-red text-white py-2 px-4 rounded font-semibold"
              onClick={deleteNote}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewPost;
