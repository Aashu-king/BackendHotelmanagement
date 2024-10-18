import express from 'express';
import sequelize from './database/models';
import router from './routes/allapiroutes';
import cors from 'cors'
import path from 'path'

const app = express()

app.use(express.json())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1',router)



sequelize.authenticate().then(async () => {

    await sequelize.sync()
    app.listen(3000,() => {
        console.log("app is running on 3000");
    })
}).catch((error) => {
console.log("🚀 ~ sequelize.authenticate ~ error:", error)
})
