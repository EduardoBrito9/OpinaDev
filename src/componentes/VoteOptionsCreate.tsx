import { VoteStateType } from "../types/propsTypes/typesProps"


const VoteOptionsElement: React.FC<VoteStateType> = ({votes, setVotes}) => {

  const addingVoteOption = ()=>{
    console.log(votes, setVotes)
  }
  return (
    <form onSubmit={addingVoteOption}>
      <label htmlFor="vOption"></label>
      <input  className=" bg-black border border-white"  type="text" id="vOption" name="vOption"/>
    </form>
  )
}

export default VoteOptionsElement