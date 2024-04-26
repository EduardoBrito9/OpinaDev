import { Link } from "react-router-dom";
import { formatarData } from "../lib/helper/dataConversion/funcData";
import { VoteSectionType } from "../types/propsTypes/typesProps";

const HomePage: React.FC<VoteSectionType> = ({ voteSection }) => {
  const numeroSorteado = () => {
    return Math.floor(Math.random() * 4) + 1;
  };
  const arrayEmoji = ["🔔", "🤖", "🎷", "📺", "🤔"];

  return (
    <section className="space-y-9 text-green-500 ">
      <h1 className="font-bold text-2xl">Votos Ativos 📣</h1>
      <div className=" grid grid-cols-3 gap-16 p-5">
        {voteSection &&
          voteSection.map((item) => (
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
                  <p className=" text-gray-400 flex flex-col">
                  <p>   {item.created_at}</p>
                    <p> {item.endDate}</p>
              
                    {formatarData(item.endDate)}
                  </p>
                  <span className=" absolute -top-8 right-0 text-3xl">
                    {arrayEmoji[numeroSorteado()]}
                  </span>
                </div>
                <div className=" -z-10 absolute top-0 right-0 translate-x-3 translate-y-3 w-full h-full ring-1  rounded-md ring-green-500 bg-green-500 bg-opacity-10"></div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default HomePage;
