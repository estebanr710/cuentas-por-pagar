import { Request, Response, Router } from "express";

const ROUTER = Router();

ROUTER.get("/", (req: Request, res: Response) => {
    res.status(200).send("SOMETHING_HERE...");
});

export { ROUTER };