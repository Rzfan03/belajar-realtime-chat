require('dotenv').config();
const express = require('express')
const cors = require('cors')
const supabase = require('@supabase/supabase-js')
const app = express()
app.use(express.json())
app.use(cors({
  origin: "https://chatting-simple.vercel.app/"
}))
const PORT = process.env.PORT || 3000
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


const db = supabase.createClient(supabaseUrl, supabaseKey)
app.get('/', async(req, res) => {
  const getData = await db.from('users').select()
  console.log(getData)
  
  res.json({getData})
})

app.post('/', async(req, res) => {
  const { chat } = req.body;
  const createChat = await db.from('users').insert({ chat })
  console.log(`add new chat : ${chat}`)
  
  res.json({createChat})
})

app.listen(PORT, () => {
  console.log("server berhasil jalan di port : ", PORT)
})

export default app;
