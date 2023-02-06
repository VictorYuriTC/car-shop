import sinon from 'sinon';
import { Model } from 'mongoose';
import { expect } from 'chai';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Test car service layer', function () {
  afterEach(sinon.restore);

  it('should create a new car when receiving expected data', async function () {
    const carInput: ICar = {
      model: 'Fiesta',
      year: 1997,
      color: 'Grey',
      status: false,
      buyValue: 3000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carResponse = {
      id: '63319d80feb9f483ee823ac5',
      model: 'Fiesta',
      year: 1997,
      color: 'Grey',
      status: false,
      buyValue: 3000,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput: Car = new Car(carResponse);

    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.create(carInput);
    expect(result).to.be.deep.equal(carOutput);
  });

  it('should update a car when receiving expected data', async function () {
    const carInput: ICar = {
      model: 'Fiesta',
      year: 1997,
      color: 'Grey',
      status: false,
      buyValue: 3500,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carResponse = {
      id: '63319d80feb9f483ee823ac5',
      model: 'Fiesta',
      year: 1997,
      color: 'Grey',
      status: false,
      buyValue: 3500,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput: Car = new Car(carResponse);

    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);

    const service = new CarService();
    const result = await service.updateById('63319d80feb9f483ee823ac5', carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
});