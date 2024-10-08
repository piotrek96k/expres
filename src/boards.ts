import express, { Router, Request, Response } from "express";
import { Board, createBoard, findAllBoards, findBoard, updateBoard } from "./controllers/boards";
import { Model } from "sequelize";

const boardsRouter:Router = express.Router();

boardsRouter.get('/getAll', async (_: Request, res: Response) => {
    const boards: Model<Board, Board>[] = await findAllBoards();
    res.status(200).json(boards);
});

boardsRouter.post('/', async (req: Request<Partial<Board>>, res: Response) => {
    const { title } = req.body; 
    const board: Model<Board, Board> = await createBoard(title);
    res.status(201).json(board.dataValues);
});

boardsRouter.put('/:id', async (req: Request<Partial<Board>>, res: Response) => {
    const { id } = req.params;
    const { stage } = req.body;

    if([...Array(3)].some((_: undefined, index) => Number(stage) === index + 1 )) {
        // My method
        await updateBoard(id!, { stage });
        const board = await findBoard(id!);
        // Your method
        // const board = (await findBoard(id!))!;
        // This doesn't work, value in db is not updated
        // board.dataValues.stage = stage;
        // await board.save();
        // This works
        // await board.update({ stage });

        res.status(200).json(board?.dataValues);
    } else {
        res.status(404).send();
    }
});

export default boardsRouter;