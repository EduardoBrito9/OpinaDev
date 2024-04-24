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
import CommentsComponent from "../comments/CommentsComponent";

const VotePage = () => {
  const { user } = useMyContext();
  const { id } = useParams();
  const [votePost, setVotePost] = useState<VoteTypeStructure>(
    {} as VoteTypeStructure,
  );
  const [voteTable, setVoteTable] = useState<string[]>([""]);
  const [tableNumber, setTableNumber] = useState({});
  const optionValues = Object.keys(tableNumber)
    .filter((key) => key.startsWith("option"))
    .map((key) => tableNumber[key as keyof typeof tableNumber]);
  const maxOption = Math.max(...optionValues);

  const getVotePost = useCallback(async () => {
    const { data } = await supabase.from("OpinaDev").select().eq("id", `${id}`);
    if (validateDataPostType(data)) {
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
      voteTable.includes(user.id)
    ) {
      voteTable.push(user.id);
      const updateObj: UpdateData = {};
      updateObj[columnName] = tableNumber[columnName] += 5;
      updateObj["users_already_voted"] = voteTable;
      await supabase.from("votesTable").update(updateObj).eq("post_id", id);
      getVoteTable();
    } else {
      console.log("you already");
    }
  };

  return (
    <div className=" space-y-32 flex justify-between">
      <div className="flex items-center">
        {/* <h1 className="text-3xl font-medium line-clamp-2">{votePost.title}</h1> */}
        <div className=" flex flex-col gap-10 border-r border-r-zinc-300">
          {Array.isArray(votePost.voteOptions) &&
            votePost.voteOptions.map((item, index) => (
              <div
                onClick={() => {
                  voteCount(index + 1);
                }}
                className=" text-xl hover: cursor-pointer flex py-5"
                key={item}
              >
                <div className=" w-[250px]">{item}</div>
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-10">
          {Array.isArray(votePost.voteOptions) &&
            votePost.voteOptions.map(
              (item, index) =>
                validateVoteOptionUser(tableNumber, "option" + (index + 1)) && (
                  <div
                    key={index}
                    className={`text-white flex items-center gap-3`}
                  >
                    <div
                      className={`${
                        tableNumber["option" + (index + 1)] === maxOption
                          ? "bg-yellow-500"
                          : ""
                      } border border-modalColor py-8 pr-5 rounded-tr-md rounded-br-md`}
                      style={{
                        width: `${
                          tableNumber["option" + (index + 1)] * 0.2
                        }rem`,
                      }}
                    ></div>
                    <span>{tableNumber["option" + (index + 1)]}</span>
                  </div>
                ),
            )}
        </div>
      </div>
      <CommentsComponent />
    </div>
  );
};

export default VotePage;
