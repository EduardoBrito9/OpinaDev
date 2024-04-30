import { Link } from "react-router-dom";
import { formatarData } from "../lib/helper/dataConversion/funcData";
import {
  VoteSectionType,
  VoteTypeStructure,
} from "../types/propsTypes/typesProps";
import { differenceInSeconds } from "date-fns";
import { useCallback, useEffect, useState } from "react";

const HomePage: React.FC<VoteSectionType> = ({ voteSection, loadingPost }) => {
  const numeroSorteado = () => {
    return Math.floor(Math.random() * 4) + 1;
  };
  const arrayEmoji = ["🔔", "🤖", "🎷", "📺", "🤔"];
  const arrayLoading = [1, 2, 3];
  const [votePastSection, setVotePastSection] = useState<VoteTypeStructure[]>(
    [],
  );

  const votosExpirados = useCallback(() => {
    const expiredVotes = voteSection.filter((item) => {
      const dateNOW = new Date();
      const end = new Date(item.endDate.substring(0, 10));
      const difference = differenceInSeconds(end, dateNOW);
      const dias = Math.floor(difference / (3600 * 24));
      const horas = Math.floor((difference % (3600 * 24)) / 3600);
      const minutos = Math.floor((difference % 3600) / 60);
      const segundos = difference % 60;
      return dias === 0 && horas === 0 && minutos === 0 && segundos === 0;
    });

    setVotePastSection(expiredVotes);
  }, [voteSection]);

  useEffect(() => {
    votosExpirados();
  }, [votosExpirados]);

  return (
    <section className="space-y-9 text-green-500 ">
      <h1 className="font-bold text-2xl">Votos Ativos 📣</h1>
      <div className=" grid grid-cols-3 gap-16 p-5">
        {loadingPost &&
          arrayLoading.map(() => {
            return (
              <div className="border border-modalColor rounded h-40 flex flex-col gap-5 p-4 animate-pulse">
                <div className="flex gap-2 items-center">
                  <button className="w-10 h-10 bg-neutral-800 rounded-full"></button>
                  <p className="h-2 w-28 bg-neutral-800 rounded-md"></p>
                </div>
                <div>
                  <p className="h-6 w-48 bg-neutral-800 rounded-full"></p>
                </div>
                <div>
                  <p className="h-5 w-20 bg-neutral-800 rounded-full"></p>
                </div>
              </div>
            );
          })}
        {voteSection &&
          voteSection.map((item) => {
            if (!votePastSection.includes(item)) {
              return (
                <Link
                  className="w-full md:w-96"
                  to={`/vote/${item.id}`}
                  key={item.id}
                >
                  <div className="relative group">
                    <div className=" border border-stone-600 text-white p-5 space-y-3 rounded-md bg-modalColor group-hover:translate-x-3 group-hover:translate-y-3 transition-all">
                      <h1 className=" flex items-center gap-2 text-stone-200">
                        {" "}
                        <button className=" rounded-full border-2 border-indigo-600 h-11 w-11 overflow-hidden">
                          <img src={item.url} alt="" />
                        </button>
                        {item.user_name}
                      </h1>
                      <p className="text-2xl font-medium line-clamp-2">
                        {item.title}
                      </p>
                      <p className=" text-gray-400 ">
                        {formatarData(item.endDate)}
                      </p>
                      <span className=" absolute -top-8 right-0 text-3xl">
                        {arrayEmoji[numeroSorteado()]}
                      </span>
                    </div>
                    <div className=" -z-10 absolute top-0 right-0 translate-x-3 translate-y-3 w-full h-full ring-1  rounded-md ring-green-500 bg-green-500 bg-opacity-10"></div>
                  </div>
                </Link>
              );
            } else {
              return null; // Se o item estiver no votePastSection, não renderize nada
            }
          })}
      </div>
      <h1 className="font-bold text-2xl text-red-400">Votos Expirados 🤖</h1>
      <div className=" grid grid-cols-3 gap-16 p-5">
        {votePastSection &&
          votePastSection.map((item) => {
            return (
              <Link
                className="w-full md:w-96"
                to={`/vote/${item.id}`}
                key={item.id}
              >
                <div className="relative group">
                  <div className=" border border-stone-600 text-white p-5 space-y-3 rounded-md bg-modalColor group-hover:translate-x-3 group-hover:translate-y-3 transition-all">
                    <h1 className=" flex items-center gap-2 text-stone-200">
                      {" "}
                      <button className=" rounded-full border-2 border-indigo-600 h-11 w-11 overflow-hidden">
                        <img src={item.url} alt="" />
                      </button>
                      {item.user_name}
                    </h1>
                    <p className="text-2xl font-medium line-clamp-2">
                      {item.title}
                    </p>
                    <p className=" text-neutral-900 text-xs px-2 py-[2px] font-bold rounded-full bg-yellow-500 w-fit ">
                      Expirado
                    </p>
                    <span className=" absolute -top-8 right-0 text-3xl">
                      {arrayEmoji[numeroSorteado()]}
                    </span>
                  </div>
                  <div className=" -z-10 absolute top-0 right-0 translate-x-3 translate-y-3 w-full h-full ring-1  rounded-md ring-green-500 bg-green-500 bg-opacity-10"></div>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default HomePage;
