import { Request, Response, NextFunction } from "express";
import { ExampleService } from "../services/example.service.js";
import { processString } from "../helper/processString.js";

export class ExampleController {
  private exampleService: ExampleService;

  constructor() {
    this.exampleService = new ExampleService();
  }

  getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.exampleService.findAll();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.exampleService.findById(processString(id));
      if (!data) {
        res.status(404).json({ success: false, message: "Not found" });
        return;
      }
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data = await this.exampleService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const data = await this.exampleService.update(
        processString(id),
        req.body
      );
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.exampleService.delete(processString(id));
      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
