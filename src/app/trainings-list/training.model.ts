export class Training {
  public date: string;
  public duration: number;
  public type: string;

  constructor(date: string, duration: number, type: string)
  {
    this.date = date;
    this.duration = duration;
    this.type = type;
  }
}
