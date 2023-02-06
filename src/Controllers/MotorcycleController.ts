import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      status: this.req.body.status,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      console.log('here my newMotorcicle:', newMotorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const allMotorcycles = await this.service.getAll();
      const allMotorcyclesWithId = allMotorcycles
        .map((motorcycle) => {
          const newMotorcycle = new Motorcycle(motorcycle);
          return newMotorcycle;
        });
      return this.res.status(200).json(allMotorcyclesWithId);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;

    if (!(Types.ObjectId.isValid(id))) {
      return this.res
        .status(422)
        .json({ message: 'Invalid mongo id' });
    }

    try {
      const foundMotorcycle = await this.service.getById(id);
      
      if (!foundMotorcycle) {
        return this.res
          .status(404)
          .json({ message: 'Motorcycle not found' });
      }

      const { model, color, year, status, buyValue, category, engineCapacity } = foundMotorcycle;
      return this.res.status(200).json({
        id: foundMotorcycle._id, model, color, year, status, buyValue, category, engineCapacity,
      });
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    const { id } = this.req.params;

    if (!(Types.ObjectId.isValid(id))) {
      return this.res
        .status(422)
        .json({ message: 'Invalid mongo id' });
    }

    const doesMotorcycleExist = await this.service.getById(id);

    if (!doesMotorcycleExist) {
      return this.res
        .status(404)
        .json({ message: 'Motorcycle not found' });
    }

    try {
      const updatedMotorcycle = await this.service.updateById(id, this.req.body);
      if (!updatedMotorcycle) return;
      const { model, year, color, status, buyValue, category, engineCapacity } = updatedMotorcycle;
      return this.res
        .status(200)
        .json({
          id: updatedMotorcycle._id, model, year, color, status, buyValue, category, engineCapacity,
        });
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
