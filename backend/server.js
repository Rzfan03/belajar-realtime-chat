
const express = require('express')
const cors = require('cors')
const supabase = require('@supabase/supabase-js')
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000
const SUPABASE_URL = "https://qlmbvfjcpbnxarofnpry.supabase.co"
const SUPABASE_KEY = "sb_secret_vyxpcdE6-vQ0RkduVI-9Wg_wAaNG6l3"


const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
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


