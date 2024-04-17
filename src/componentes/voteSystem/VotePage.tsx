import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/helper/supabaseClient";
import { validateDataPostType } from "../../validateFunctions/validateDataType";
import { VoteTypeStructure } from "../../types/propsTypes/typesProps";

const VotePage = () => {
  // const [voteQuant, setVoteQuant] = useState<number[]>([]);
  const { id } = useParams();
  const [votePost, setVotePost] = useState<VoteTypeStructure>(
    {} as VoteTypeStructure,
  );

  const getVotePost = useCallback(async () => {
    const { data } = await supabase.from("OpinaDev").select().eq("id", `${id}`);
    if (validateDataPostType(data)) {
      console.log(data);
      setVotePost(data[0]);
    } else {
      console.log("error");
    }
  }, [id, setVotePost]);

  useEffect(() => {
    getVotePost();
  }, [getVotePost]);

  const voteCount = async (index: number) => {
    const columnName = "option" + index;
    console.log(columnName)
    const postOp = await supabase
      .from("votesTable")
      .update({ option1: 5 })
      .eq("post_id", id);
    console.log(postOp);
  };

  return (
    <div className=" space-y-20">
      <h1 className="text-3xl font-medium line-clamp-2">{votePost.title}</h1>
      <div>
        {Array.isArray(votePost.voteOptions) &&
          votePost.voteOptions.map((item, index) => (
            <div
              onClick={() => {
                voteCount(index);
              }}
              className=" text-2xl hover: cursor-pointer"
              key={item}
            >
              {item}
            </div>
          ))}
      </div>
    </div>
  );
};

export default VotePage;
