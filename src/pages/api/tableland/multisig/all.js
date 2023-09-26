
import { MultisigOwnersTable, MultisigTable } from "@/constants/tableland";

//TODO: implement this
export default async (req, res) => {    
        
      let where = "";
      
      if(req.query.where){
        where = req.query.where;
      }
        console.log(req.query)
        
        const result = await new Promise(async (resolve, reject) => {
        const url = 'https://testnets.tableland.network/api/v1/query';
        const params = new URLSearchParams({
          statement: `
          SELECT json_object( 'name', ${MultisigTable}.name, 'multisigAddress',  ${MultisigTable}.multisigAddress, 'description',  ${MultisigTable}.description, 'confirmationTable',  ${MultisigTable}.confirmationTable, 'proposalTable',  ${MultisigTable}.proposalTable, 'numberOfConfirmations',  ${MultisigTable}.numberOfConfirmations, 
          'members', json_group_array( json_object( 'ownerAddress',  ${MultisigOwnersTable}.ownerAddress ) ) ) 
          FROM  ${MultisigTable} 
          JOIN  ${MultisigOwnersTable} ON  ${MultisigTable}.multisigAddress =  ${MultisigOwnersTable}.multisigAddress 
          ${where}
          GROUP BY ${MultisigTable}.multisigAddress
          
         `
         ,
          format: "objects", unwrap: false, extract: true
        });
    
        try {
          const response = await fetch(`${url}?${params.toString()}`, { headers: {Accept: 'application/json',}});
          const data = await response.json();
          resolve(data);
        } catch (error) { reject(error);}
      });
      
      console.log(result)
      
      if(result.length == 0) { res.status(200).json({result: "No results found"});}
      res.status(200).json({result: result});
  }
  