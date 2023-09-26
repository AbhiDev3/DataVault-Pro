import DataNotFound from "@/components/application/elements/message/DataNotFound";
import { useEffect, useState } from "react";
import ProposalItem from "../proposals/ProposalItem";

export default function GroupProposals({address, proposalTable, confirmationTable, numberOfConfirmations}) {
  const [proposals, setProposals] = useState([])
  
    
    useEffect(() => {
      //proposalTable, confirmationTable
      const getData = async() => {
        const res = await fetch(`/api/tableland/multisig/proposal?proposalTable=${proposalTable}&confirmationTable=${confirmationTable}&executed='false'`)
        const result = await res.json()
        console.log(result)
        if(result){
          setProposals(result.result)
        }
        
      }    
      
      
      if(proposalTable, confirmationTable == undefined) return;
      getData()
      
      
    }, [address, proposalTable, confirmationTable])
  return (
    <div className="flex flex-col gap-2">
        {proposals.length > 0 ? proposals.map((proposal, key) => (
          <ProposalItem key={key} proposal={proposal} numberOfConfirmations={numberOfConfirmations} multiSigAddress={address}/>
        )): <DataNotFound message="No proposals found"/>
        }
    </div>
    

    

  )
}
