import {
  Example,
  CreateExampleDto,
  UpdateExampleDto,
} from "../types/example.types.js";

export class ExampleService {
  private examples: Example[] = [];

  async findAll(): Promise<Example[]> {
    return this.examples;
  }

  async findById(id: string): Promise<Example | undefined> {
    return this.examples.find((example) => example.id === id);
  }

  async create(data: CreateExampleDto): Promise<Example> {
    const newExample: Example = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.examples.push(newExample);
    return newExample;
  }

  async update(
    id: string,
    data: UpdateExampleDto
  ): Promise<Example | undefined> {
    const index = this.examples.findIndex((example) => example.id === id);
    if (index === -1) {
      return undefined;
    }
    this.examples[index] = {
      ...this.examples[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.examples[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.examples.findIndex((example) => example.id === id);
    if (index === -1) {
      return false;
    }
    this.examples.splice(index, 1);
    return true;
  }
}
