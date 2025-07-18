import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { bookRoutes } from "./modules/Book/book.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./routes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api', router);
app.use(notFound)
app.use(globalErrorHandler);

export default app;
