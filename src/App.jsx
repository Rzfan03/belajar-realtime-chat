import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";


const App = () => {
  const [listData, setDataList] = useState([]);
  const [chatValue, setChat] = useState("");
  
  
  const handleSend = async () => {
    
    if(!chatValue) return alert("input tak boleh kosong!")
    
    const Api = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({chat: chatValue})
    });
    
    await getData();
    
    setChat("")
  }
  
  const getData = async () => {
    const Api = await fetch("http://localhost:3000/");
    const datas = await Api.json();
    console.log(datas.getData.data)
    setDataList(datas.getData.data)
  }
  useEffect(() => {
  
    getData();
  
  const timerFetch = setInterval(() => {
    getData();
  }, 3500)
  
  return () => clearInterval(timerFetch)
  
  
}, [])
  
  
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="min-h-screen gap-2 flex flex-col justify-center">
        <div className="overflow-scroll mt-8 flex flex-col gap-2">
          {listData.map((data) => (
            <div className="w-fit overflow-scroll  flex flex-col items-start px-4 py-2 rounded-r-lg rounded-b-lg text-white text-md text-md bg-blue-500 inset-shadow-sm inset-shadow-blue-300" key={data.id}>
              <h1 className="max-md:text-sm">{data.chat}</h1>
              <span className="text-sm">{new Date(data.post_at).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center sticky bottom-4 justify-center gap-2 mt-8">
          <input value={chatValue} onChange={(e) => {setChat(e.target.value)}} placeholder="Text Something..." className="border border-gray-300 bg-white p-2 w-90 rounded-lg" />
          <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-lg inset-shadow-sm inset-shadow-blue-300 cursor-pointer"><FiSend fontSize={25}/></button>
        </div>
    </div>
    </div>
  )
}


export default App;