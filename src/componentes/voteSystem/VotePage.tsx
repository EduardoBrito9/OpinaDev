import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/helper/supabaseClient";
import {
  validateDataPostType,
  validateDataVoteTableType,
} from "../../validateFunctions/validateDataType";
import { VoteTypeStructure } from "../../types/propsTypes/typesProps";
import useMyContext from "../../context/functionContext";

const VotePage = () => {
  // const [voteQuant, setVoteQuant] = useState<number[]>([]);
  const { user } = useMyContext();
  const { id } = useParams();
  const [votePost, setVotePost] = useState<VoteTypeStructure>(
    {} as VoteTypeStructure,
  );
  const [voteTable, setVoteTable] = useState<string[]>([""]);

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

  const getVoteTable = useCallback(async () => {
    const { data } = await supabase
      .from("votesTable")
      .select("*")
      .eq("post_id", id);
    if (data && validateDataVoteTableType(data[0])) {
      setVoteTable(data[0].users_already_voted);
    }
  }, [id]);

  useEffect(() => {
    getVoteTable();
  }, [getVoteTable]);

  const voteCount = async () => {
    // const columnName = "option" + index;
    // console.log(columnName);
    if (!voteTable.includes(user.id)) {
      console.log(voteTable);
      voteTable.push(user.id);
      await supabase
        .from("votesTable")
        .update({
          option1: 5,
          users_already_voted: voteTable,
        })
        .eq("post_id", id);
    } else {
      console.log("you already");
    }
  };

  return (
    <div className=" space-y-20">
      <h1 className="text-3xl font-medium line-clamp-2">{votePost.title}</h1>
      <div>
        {Array.isArray(votePost.voteOptions) &&
          votePost.voteOptions.map((item) => (
            <div
              onClick={() => {
                voteCount();
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
