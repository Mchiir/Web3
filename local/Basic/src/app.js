import express from 'express'

const app = express()
app.use(express.json())

// Serve static files from the 'public' directory
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile("index.html")
})

app.listen(4000, ()=>{
    console.log('server running on http://localhost:4000')
})