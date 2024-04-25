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
    <section>
      <div className="space-y-5">
        <h1 className="text-3xl font-medium line-clamp-2">{votePost.title}</h1>
        <div className="text-3xl text-gray-400 flex items-center gap-2 ">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49998 0.849976C7.22383 0.849976 6.99998 1.07383 6.99998 1.34998V3.52234C6.99998 3.79848 7.22383 4.02234 7.49998 4.02234C7.77612 4.02234 7.99998 3.79848 7.99998 3.52234V1.8718C10.8862 2.12488 13.15 4.54806 13.15 7.49998C13.15 10.6204 10.6204 13.15 7.49998 13.15C4.37957 13.15 1.84998 10.6204 1.84998 7.49998C1.84998 6.10612 2.35407 4.83128 3.19049 3.8459C3.36919 3.63538 3.34339 3.31985 3.13286 3.14115C2.92234 2.96245 2.60681 2.98825 2.42811 3.19877C1.44405 4.35808 0.849976 5.86029 0.849976 7.49998C0.849976 11.1727 3.82728 14.15 7.49998 14.15C11.1727 14.15 14.15 11.1727 14.15 7.49998C14.15 3.82728 11.1727 0.849976 7.49998 0.849976ZM6.74049 8.08072L4.22363 4.57237C4.15231 4.47295 4.16346 4.33652 4.24998 4.25C4.33649 4.16348 4.47293 4.15233 4.57234 4.22365L8.08069 6.74051C8.56227 7.08599 8.61906 7.78091 8.19998 8.2C7.78089 8.61909 7.08597 8.56229 6.74049 8.08072Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>0D:</span>
          <span>0H:</span>
          <span>0M:</span>
          <span>0S</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm mt-20">
        <span className="h-5 w-5 rounded-full bg-green-500 animate-pulse"></span>
        <h1 className="flex items-center gap-2">
          1{" "}
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>{" "}
          live on this vote channel
        </h1>
      </div>
      <div className=" flex justify-between gap-10 items-start mt-7">
        <div className="flex items-center">
          <div className=" flex flex-col gap-10 border-r border-r-zinc-300">
            {Array.isArray(votePost.voteOptions) &&
              votePost.voteOptions.map((item, index) => (
                <div
                  onClick={() => {
                    voteCount(index + 1);
                  }}
                  className=" text-xl hover: cursor-pointer flex py-6"
                  key={item}
                >
                  <div className=" w-40">{item}</div>
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-8">
            {Array.isArray(votePost.voteOptions) &&
              votePost.voteOptions.map(
                (item, index) =>
                  validateVoteOptionUser(
                    tableNumber,
                    "option" + (index + 1),
                  ) && (
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
    </section>
  );
};

export default VotePage;
