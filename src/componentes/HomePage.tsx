import { VoteSectionType } from "../types/propsTypes/typesProps"


const HomePage: React.FC<VoteSectionType> = ({voteSection, setVoteSection}) => {
  console.log(setVoteSection)
  return (
    <div>
      {voteSection && voteSection.map((item)=>(
        <div key={item.id} className=" text-white">
          <h1>{item.user_name}</h1>
          <p>{item.title}</p>
          <p>{item.created_at}</p>
        </div>
      ))}
    </div>
  )
}

export default HomePage