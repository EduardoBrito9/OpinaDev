import { useState } from "react";
import VoteOptionsCreate from "./VoteOptionsCreate";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [votes, setVotes] = useState([]);

  const postVerification = () => {
    console.log("teste");
  };
  return (
    <form
      className=" flex  flex-col gap-5 text-white"
      onSubmit={postVerification}
    >
      <label htmlFor="Title">Title</label>
      <input
        className="bg-black border border-white"
        onChange={({ target }) => {
          setTitle(target.value);
        }}
        value={title}
        type="text"
        id="Title"
        name="Title"
      />
      <label htmlFor="Description">Description</label>
      <input
        className="bg-black border border-white"
        onChange={({ target }) => {
          setDescription(target.value);
        }}
        value={description}
        type="text"
        id="Description"
        name="Description"
      />
      <VoteOptionsCreate setVotes={setVotes} votes={votes} />
      <label htmlFor="">End Date</label>
      <input
        className="bg-black border border-white"
        type="date"
        name=""
        id=""
      />
    </form>
  );
};

export default CreatePost;
