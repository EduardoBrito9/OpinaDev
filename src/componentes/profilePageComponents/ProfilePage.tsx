import React, { useCallback, useEffect, useRef, useState } from "react";
import { VoteSectionType } from "../../types/propsTypes/typesProps";
import { supabase } from "../../lib/helper/supabaseClient";
import {
  validateDataPostType,
  validateDataProfile,
} from "../../validateFunctions/validateDataType";
import { Link, useParams } from "react-router-dom";
import { formatarData } from "../../lib/helper/dataConversion/funcData";
import ModalProfile from "./ModalProfile";
import AlertPostSucess from "../loadingSystem/AlertPostSucess";

const ProfilePage: React.FC<VoteSectionType> = ({ votePastSection }) => {
  const [postsUser, setPostsUser] = useState<VoteSectionType[]>([]);
  const [modal, setModal] = useState(false);
  const [currentPostId, setCurrentPostId] = useState("");
  const openMenuButton = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();

  const getPostsUser = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("OpinaDev")
        .select("*")
        .eq("user_id", id);
      console.log(data);
      if (validateDataPostType(data)) {
        setPostsUser(data);
      }
    } catch (e) {
      console.log("error");
    }
  }, [id]);

  useEffect(() => {
    getPostsUser();
  }, [getPostsUser, modal]);

  return (
    <div className="w-full flex flex-col flex-1 gap-4">
      <div className=" rounded-md border border-modalColor">
        <div className=" w-full">
          <table className="w-full caption-bottom text-sm">
            <thead className="text-grayText">
              <tr className="border border-modalColor transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Title
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Created At
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  End At
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]"></th>
              </tr>
            </thead>
            {postsUser.length > 0 &&
              postsUser.map(
                (item) =>
                  validateDataProfile(item) && (
                    <tbody
                      key={item.id}
                      className="[&amp;_tr:last-child]:border-0 relative"
                    >
                      <tr className="border border-modalColor transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                          <Link to={`/vote/${item.id}`}>{item.title}</Link>
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                          <div
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-foreground transition ${
                              votePastSection?.includes(item)
                                ? "bg-red-600 hover:bg-red-400 cursor-grab"
                                : "bg-green-600 hover:bg-green-600 cursor-grab"
                            }`}
                          >
                            {votePastSection?.includes(item)
                              ? "Expired"
                              : "Active"}
                          </div>
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          {formatarData(item.created_at)}
                        </td>
                        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          {formatarData(item.endDate)}
                        </td>
                        <td className=" relative p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                          <button
                            onClick={() => {
                              if (item.id !== currentPostId) {
                                setModal(true);
                                setCurrentPostId(item.id);
                              } else setModal(!modal);
                            }}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:ro:"
                            data-state="closed"
                          >
                            <span className="sr-only">Open menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-more-horizontal h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="19" cy="12" r="1"></circle>
                              <circle cx="5" cy="12" r="1"></circle>
                            </svg>
                          </button>
                          {modal && currentPostId === item.id && (
                            <ModalProfile
                              modal={modal}
                              currentPostId={currentPostId}
                              setModal={setModal}
                              openMenuButton={openMenuButton}
                              setCopied={setCopied}
                            />
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ),
              )}
          </table>
        </div>
      </div>
      {!postsUser.length && (
        <div className=" flex items-center justify-center flex-col gap-5">
          <p>
            Voce nao esta publicando nada ultimamente... Clique aqui para mudar
            isso! 👇
          </p>
          <Link to="/criarPublicacao">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition bg-yellow-400 text-stone-800 hover:bg-yellow-500 h-10 px-4 py-2">
              Create
            </button>
          </Link>
        </div>
      )}
      {copied && (
        <div className=" border absolute top-10 right-2/4">
          <AlertPostSucess />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
