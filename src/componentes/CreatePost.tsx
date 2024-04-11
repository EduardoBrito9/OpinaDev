import VoteOptionsCreate from "./VoteOptionsCreate";

const CreatePost = () => {
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
        type="text"
        id="Title"
        name="Title"
      />
      <label htmlFor="Description">Description</label>
      <input
        className="bg-black border border-white"
        type="text"
        id="Description"
        name="Description"
      />
      <VoteOptionsCreate />
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
