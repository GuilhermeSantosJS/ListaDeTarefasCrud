import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from './Tarefa';

const httpOptions = {
    headers: new HttpHeaders({
       'Content-Type' : 'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  url = "https://localhost:7174/api/tarefas";

  constructor(private http: HttpClient) { }

    PegarTodos():  Observable<Tarefa[]>{
      return this.http.get<Tarefa[]>(this.url);   
    }

    PegarPeloId(tarefaId: number): Observable<Tarefa>{
      const apiUrl = `${this.url}/${tarefaId}`;
      return this.http.get<Tarefa>(apiUrl);
    }

    SalvarTarefa(tarefa: Tarefa) : Observable<any>{
      return this.http.post<Tarefa>(this.url, tarefa, httpOptions);
    }

    AtualizarTarefa(tarefa: Tarefa) : Observable<any>{
      return this.http.put<Tarefa>(this.url, tarefa, httpOptions);
    }

    AtualizarStatus(tarefaId: number) : Observable<any>{
      const apiUrl = `${this.url}/${tarefaId}`;
      return this.http.put<number>(apiUrl, httpOptions);
    }

    ExcluirTarefa(tarefaId: number) : Observable<any>{
       const apiUrl = `${this.url}/${tarefaId}`;
       return this.http.delete<number>(apiUrl, httpOptions);
    }
}
