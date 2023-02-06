import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      buyValue: this.req.body.buyValue,
      status: this.req.body.status,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.create(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const allCars = await this.service.getAll();
      const allCarsWithId = allCars
        .map((car) => {
          const newCar = new Car(car);
          return newCar;
        });
      return this.res.status(200).json(allCarsWithId);
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
      const foundCar = await this.service.getById(id);
      
      if (!foundCar) {
        return this.res
          .status(404)
          .json({ message: 'Car not found' });
      }
      console.log({ ...foundCar });
      const { model, color, year, status, buyValue, doorsQty, seatsQty } = foundCar;
      return this.res.status(200).json({
        id: foundCar._id, model, color, year, status, buyValue, doorsQty, seatsQty,
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

    try {
      const updatedCar = await this.service.updateById(id);
      return this.res
        .status(200)
        .json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;
