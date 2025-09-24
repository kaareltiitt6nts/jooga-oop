import express from "express"
import ArticleController from "./controller/articleController.js"
import AuthorController from "./controller/authorController.js"
import session from "express-session"
import "dotenv/config"
import TimeUtils from "./utils/time.js"
import userRouter from "./routes/user.js"
import articleRouter from "./routes/article.js"
import authorRouter from "./routes/author.js"

const PORT = process.env.APP_PORT
const app = new express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: TimeUtils.getDays(7)
    }
}))

app.use("/", userRouter)
app.use("/", articleRouter)
app.use("/", authorRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})