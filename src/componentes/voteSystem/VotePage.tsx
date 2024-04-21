import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/helper/supabaseClient";
import {
  validateDataPostType,
  validateDataVoteTableType,
  validateVoteOptionUser,
} from "../../validateFunctions/validateDataType";
import { VoteTypeStructure } from "../../types/propsTypes/typesProps";
import useMyContext from "../../context/functionContext";

const VotePage = () => {
  const { user } = useMyContext();
  const { id } = useParams();
  const [votePost, setVotePost] = useState<VoteTypeStructure>(
    {} as VoteTypeStructure,
  );
  const [voteTable, setVoteTable] = useState<string[]>([""]);
  const [tableNumber, setTableNumber] = useState({});

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
    if (data && data[0] && validateDataVoteTableType(data[0])) {
      setVoteTable(data[0].users_already_voted);
      setTableNumber(data[0]);
    }
  }, [id]);

  useEffect(() => {
    getVoteTable();
  }, [getVoteTable]);

  const voteCount = async (index: number) => {
    type UpdateData = {
      [key: string]: number | string[];
    };
    const columnName = "option" + index;
    if (
      validateVoteOptionUser(tableNumber, columnName) &&
      !voteTable.includes(user.id)
    ) {
      voteTable.push(user.id);
      const updateObj: UpdateData = {};
      updateObj[columnName] = tableNumber[columnName] += 1;
      updateObj["users_already_voted"] = voteTable;
      await supabase.from("votesTable").update(updateObj).eq("post_id", id);
      getVoteTable();
    } else {
      console.log("you already");
    }
  };
  return (
    <div className=" space-y-20">
      <h1 className="text-3xl font-medium line-clamp-2">{votePost.title}</h1>
      <div>
        {Array.isArray(votePost.voteOptions) &&
          votePost.voteOptions.map((item, index) => (
            <div
              onClick={() => {
                voteCount(index + 1);
              }}
              className=" text-2xl hover: cursor-pointer flex gap-10"
              key={item}
            >
              <div className=" w-[250px]">{item}</div>

              {validateVoteOptionUser(tableNumber, "option" + (index + 1)) && (
                <div className="text-white">
                  {tableNumber["option" + (index + 1)]}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default VotePage;
