import { Model } from "sequelize";
import Boards from "../db/boards";

export interface Board {
    id: number;
    stage: number;
    title: string;
}

const findAllBoards = (): Promise<Model<Board, Board>[]> => Boards.findAll();

const findBoard = (id: number): Promise<Model<Board, Board> | null> => Boards.findByPk(id);

const createBoard = (title: string): Promise<Model<Board, Board>> =>
     Boards.create({ title, stage: 1 });

const updateBoard = (id: number, board: Partial<Board>) => Boards.update(board, { where: { id } });

export { findAllBoards, findBoard, createBoard, updateBoard };