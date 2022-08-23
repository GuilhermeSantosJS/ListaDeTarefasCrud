import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Tarefa } from 'src/app/Tarefa';
import { TarefasService } from 'src/app/tarefas.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  formulario: any;
  tituloFormulario?: string;
  tarefas: Tarefa[] = [];
  tituloTarefa!: string;
  tarefaId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  
  modalRef!: BsModalRef;

  constructor(private tarefasService: TarefasService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.tarefasService.PegarTodos().subscribe(resultado => {
      this.tarefas = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Tarefa';

    this.formulario = new FormGroup({
      titulo: new FormControl(null),
      descricao: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(tarefaId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.tarefasService.PegarPeloId(tarefaId).subscribe(resultado => {
      this.tituloFormulario = `Atualizar ${resultado.titulo} ${resultado.descricao}`;

      this.formulario = new FormGroup({
        tarefaId: new FormControl(resultado.tarefaId),
        titulo: new FormControl(resultado.titulo),
        descricao: new FormControl(resultado.descricao)
      });
    });
  }

  EnviarFormulario(): void {
    const tarefa : Tarefa = this.formulario.value;

    if(tarefa.tarefaId > 0){
       this.tarefasService.AtualizarTarefa(tarefa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      alert('Tarefa atualizada com sucesso');
      this.tarefasService.PegarTodos().subscribe(registrados => {
        this.tarefas = registrados;
          });
       });
   } else {
    this.tarefasService.SalvarTarefa(tarefa).subscribe(resultado => {
      this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      alert('Tarefa inserida com sucesso');
      this.tarefasService.PegarTodos().subscribe(registrados => {
        this.tarefas = registrados;
        })
     });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(tarefaId: number, tituloTarefa: string, conteudoModal: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(conteudoModal);
      this.tarefaId = tarefaId;
      this.tituloTarefa = tituloTarefa;
  }

  ExcluirTarefa(tarefaId: number){
    this.tarefasService.ExcluirTarefa(tarefaId).subscribe(resultado => {
       this.modalRef.hide();
       alert('Tarefa excluida com sucesso');
       this.tarefasService.PegarTodos().subscribe(registros => {
         this.tarefas = registros;
       });
    });
  }

  AtualizarStatusConcluido(tarefaId: number){
    this.tarefasService.AtualizarStatus(tarefaId).subscribe(resultado => {
    alert('Tarefa concluida com sucesso');
    this.tarefasService.PegarTodos().subscribe(registrados => {
      this.tarefas = registrados;
        });
     });
  }
  

}
