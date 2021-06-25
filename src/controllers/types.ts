interface Details {
  type: string;
  message: string;
}

export class CustomError {
  details: Details[];
  constructor(type: any, message: string = "error") {
    this.details = [
      {
        type,
        message,
      },
    ];
  }
}
