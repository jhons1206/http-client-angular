import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Post } from '../post';
import { Observable, forkJoin } from 'rxjs';

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
      .put<Post>('https://jsonplaceholder.typicode.com/posts/1', {
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

  peti_paral() {
    const observable = forkJoin(
      this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/4'),
      this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/5')
    );

    observable.subscribe((data) => {
      this.resultadoPeticion = data;
    });
  }

  // post_progresEvents() {
  //   const request = new HttpRequest(
  //     'POST',
  //     'https://jsonplaceholder.typicode.com/posts',
  //     {
  //       title: 'Crítica de la película',
  //       body: 'Me ha gustado mucho',
  //       userId: 1,
  //     },
  //     { reportProgress: true }
  //   );
  //   this.http.request(request).subscribe((event) => {
  //     if (event.type === HttpEventType.UploadProgress) {
  //       if (event?.loaded && event?.total) {
  //         const percentDone = Math.round((100 * event.loaded) / event.total);
  //         console.log(`Fichero transferido en un ${percentDone}%`);
  //       }
  //     } else if (event.type === HttpEventType.Response) {
  //       this.resultadoPeticion = event.body;
  //     }
  //   });
  // }

  // peti_secuencia() {
  //   this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1')
  //   .switchMap((data) => {
  //       data.title = '(MODIFICADO) ' + data.title;
  //       return;
  //       this.http.put<Post>(
  //         'https://jsonplaceholder.typicode.com/posts/1',
  //         data
  //       );
  //     })
  //     .subscribe((data) => {
  //       this.resultadoPeticion = data;
  //     });
  // }
}
