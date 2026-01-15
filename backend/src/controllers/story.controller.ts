import { Request, Response, NextFunction } from "express";
import { StoryService } from "../services/story.service.js";
import { processString } from "../helper/processString.js";
import { Filter } from "../types/story.types.js";
import {
  changeCategoryString,
  changeStatusString,
} from "../helper/convertEnum.js";
export class StoryController {
  private storiesService: StoryService;

  constructor() {
    this.storiesService = new StoryService();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);

    const start = (page - 1) * limit;
    const end = page * limit - 1;

    const filters: Filter = {
      category: changeCategoryString((req.query.category as string) || ""),
      status: changeStatusString((req.query.status as string) || ""),
      search: (req.query.search as string) || "",
      page: page,
      limit: limit,
      start: start,
      end: end,
    };

    try {
      const data = await this.storiesService.findAll(filters);
      res
        .status(200)
        .json({ success: true, data, paging: { page, limit, start, end } });
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
      const data = await this.storiesService.findById(processString(id));
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
    // console.log(req);
    try {
      const data = await this.storiesService.createStoryChapter(
        req.body,
        req.file
      );
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
      console.log(req);
      const data = await this.storiesService.updateStoryChapter(
        processString(id),
        req.body,
        req.file
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
      console.log(processString(id));
      await this.storiesService.delete(processString(id));
      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}
