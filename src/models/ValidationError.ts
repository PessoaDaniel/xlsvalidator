export class ValidationError {
  message: string;
  type: string;
  field?: string;

  constructor(message:string) {
    this.type = 'warning';
    this.message = message;
  }
}

