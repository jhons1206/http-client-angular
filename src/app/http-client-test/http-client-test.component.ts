import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Post } from '../post';

@Component({
  selector: 'app-http-client-test',
  templateUrl: './http-client-test.component.html',
  styleUrls: ['./http-client-test.component.css'],
})
export class HttpClientTestComponent implements OnInit {
  resultadoPeticion: Object = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get();

    // Método genérico: request()
    // this.http
    //   .request('GET', 'https://jsonplaceholder.typicode.com/posts')
    //   .subscribe((data) => {
    //     this.resultadoPeticion = data;
    //   });
  }

  get() {
    this.http
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        observe: 'response',
      })
      .subscribe((data) => {
        this.resultadoPeticion = data;
        console.log(data);
      });
  }

  get_param() {
    const headers = new HttpHeaders().set('Autorizacion', 'mi token');
    const params = new HttpParams().set('userId', 9);
    this.http
      .get('https://jsonplaceholder.typicode.com/posts', { headers, params })
      .subscribe((data) => {
        this.resultadoPeticion = data;
      });
  }

  post() {
    this.http
      .post<Post>('https://jsonplaceholder.typicode.com/posts', {
        title: 'Prevision Viernes',
        body: 'Parcialmente soleado',
        userId: 1,
      })
      .subscribe((data) => {
        this.resultadoPeticion = data;
        console.log('Id. de la nueva publicación: ' + data.id);
      });
  }

  put() {
    this.http
      .put<Post>('https://jsonplaceholder.typicode.com/posts/1000', {
        id: 1,
        title: 'Prevision Lunes',
        body: 'Lluvias',
        userId: 1,
      })
      .subscribe(
        (data) => {
          this.resultadoPeticion = data;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Error cliente o red: ', err.error.message);
          } else {
            console.log(
              `Error servidor remoto. ${err.status} # ${err.message}`
            );
          }
        }
      );
  }

  patch() {
    this.http
      .patch('https://jsonplaceholder.typicode.com/posts/1', {
        body: 'Soleado',
      })
      .subscribe((data) => {
        this.resultadoPeticion = data;
      });
  }

  delete() {
    this.http
      .delete('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((data) => {
        this.resultadoPeticion = data;
      });
  }
}
