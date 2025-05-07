import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello to the app")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});