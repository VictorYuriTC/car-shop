import ICar from '../Interfaces/ICar';

class Car {
  private id: string | undefined;
  private model: string;
  private year: number;
  private color: string;
  private status: boolean;
  private buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    {
      id,
      model,
      year,
      color,
      status,
      buyValue,
      seatsQty,
      doorsQty,
    }: ICar,
  ) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status || false;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  private setId(id: string) {
    this.id = id;
  }

  private getId() {
    return this.id;
  }

  private setModel(model: string) {
    this.model = model;
  }

  private getModel() {
    return this.model;
  }

  private setYear(year: number) {
    this.year = year;
  }

  private getYear() {
    return this.year;
  }

  private setColor(color: string) {
    this.color = color;
  }

  private getColor() {
    return this.color;
  }

  private setStatus(status: boolean) {
    this.status = status;
  }

  private getStatus() {
    return this.status;
  }

  private setBuyValue(buyValue: number) {
    this.buyValue = buyValue;
  }

  private getBuyValue() {
    return this.buyValue;
  }

  private setDoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }

  private getDoorsQty() {
    return this.doorsQty;
  }

  private setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }

  private getSeatsQty() {
    return this.seatsQty;
  }
}

export default Car;
