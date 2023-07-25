import { Component } from '@angular/core';
import { Order } from 'src/app/shared/order';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css'],
})
export class SectionOrdersComponent {
  orders: Order[] = [
    {
      id: 1,
      customer: {
        id: 2,
        name: 'Cobra Corp.',
        email: 'cobra@teste.com',
        state: 'BA',
      },
      total: 1337,
      placed: new Date(2023, 7, 1),
      fullfilled: new Date(2023, 7, 25),
      status: 'Completed',
    },

    {
      id: 2,
      customer: {
        id: 2,
        name: 'Wandao S/A',
        email: 'wandao@teste.com',
        state: 'SP',
      },
      total: 2500,
      placed: new Date(2023, 6, 3),
      fullfilled: new Date(2023, 7, 25),
      status: 'Completed',
    },

    {
      id: 3,
      customer: {
        id: 3,
        name: 'Papinho Slimes',
        email: 'papinho@teste.com',
        state: 'RJ',
      },
      total: 5000,
      placed: new Date(2023, 4, 21),
      fullfilled: new Date(2023, 7, 25),
      status: 'Completed',
    },

    {
      id: 4,
      customer: {
        id: 4,
        name: 'Don Pollo',
        email: 'donpollo@teste.com',
        state: 'AC',
      },
      total: 6471,
      placed: new Date(2023, 2, 15),
      fullfilled: new Date(2023, 7, 25),
      status: 'Completed',
    },

    {
      id: 5,
      customer: {
        id: 5,
        name: 'Alfaya',
        email: 'alfaya@teste.com',
        state: 'BA',
      },
      total: 4200,
      placed: new Date(2023, 5, 13),
      fullfilled: new Date(2023, 7, 25),
      status: 'Completed',
    },
  ];
}
