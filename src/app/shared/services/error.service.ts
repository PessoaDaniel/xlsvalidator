import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  async error(message: string) {
    await Swal.fire({
      title: 'Atenção!',
      text: message,
      icon: 'warning',
    })
  }
}
