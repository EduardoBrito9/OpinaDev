const VoteOptionsElement = () => {

  const addingVoteOption = ()=>{
    
  }
  return (
    <form onSubmit={addingVoteOption}>
      <label htmlFor="vOption"></label>
      <input type="text" id="vOption" name="vOption"/>
    </form>
  )
}

export default VoteOptionsElement