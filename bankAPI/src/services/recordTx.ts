import TxRecord from "../model/txRecordSchema"


export const recordTx = async(senderId: string, receiverId:string, amount: number)=>{
const record = await TxRecord.create({
  senderId,
  receiverId,
  amount
})
return record
}

export const txRecords =async () => {
  return await TxRecord.find().exec()
}