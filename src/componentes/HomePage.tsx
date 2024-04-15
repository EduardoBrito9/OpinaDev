import { formatarData } from "../lib/helper/dataConversion/funcData";
import { VoteSectionType } from "../types/propsTypes/typesProps";

const HomePage: React.FC<VoteSectionType> = ({
  voteSection,
  setVoteSection,
}) => {
   console.log(setVoteSection);

  return (
    <section className="space-y-10 text-green-500 ">
      <h1 className="font-bold text-3xl">Votos Ativos 📣</h1>
      <div className=" grid grid-cols-3 gap-16">
        {voteSection &&
          voteSection.map((item) => (
            <div
              key={item.id}
              className=" border border-stone-600 text-white p-4 w-[350px] space-y-3 rounded-md bg-modalColor"
            >
              <h1 className=" flex items-center gap-2 text-stone-200">
                {" "}
                <button className=" rounded-full border-2 border-indigo-600 h-11 w-11 overflow-hidden">
                  <img src={item.url} alt="" />
                </button>
                {item.user_name}
              </h1>
              <p className="text-2xl font-medium line-clamp-2">{item.title}</p>
              <p className=" text-gray-400">{formatarData(item.endDate)}</p>
            </div>
          ))}
      </div>
    </section>
  );
};

export default HomePage;
