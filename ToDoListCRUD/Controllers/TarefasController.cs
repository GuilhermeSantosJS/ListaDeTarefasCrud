using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ToDoListCRUD.Models;

namespace ToDoListCRUD.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
       private readonly Contexto _contexto;

       public TarefasController(Contexto contexto)
       {
          _contexto = contexto;
       }

       [HttpGet]
       public async Task<ActionResult<IEnumerable<Tarefa>>> PegarTodosAsync() 
       {
          return await _contexto.Tarefas.ToListAsync();
       }
       
       [HttpGet("{tarefaId}")]
       public async Task<ActionResult<Tarefa>> PegarTarefaPeloIdAsync(int TarefaId) 
       {
          Tarefa tarefa = await _contexto.Tarefas.FindAsync(TarefaId);

          if(tarefa == null)
              return NotFound();
        
          return tarefa;
       }

       [HttpPost]
       public async Task<ActionResult<Tarefa>> SalvarTarefaAsync(Tarefa tarefa)
       {
          await _contexto.Tarefas.AddAsync(tarefa);
          await _contexto.SaveChangesAsync();

          return Ok(); 
       }

       [HttpPut]
       public async Task<ActionResult> AtualizarTarefaAsync(Tarefa tarefa) 
       {
          _contexto.Tarefas.Update(tarefa);
          await _contexto.SaveChangesAsync();

          return Ok();
       }

       
       [HttpPut("{tarefaId}")]
       public async Task<ActionResult> AtualizarStatusAsync(int TarefaId)
       {
          Tarefa tarefa = await _contexto.Tarefas.FindAsync(TarefaId);
          tarefa.Status = true;
          _contexto.Tarefas.Update(tarefa);
          await _contexto.SaveChangesAsync();

          return Ok();
       }

       [HttpDelete("{tarefaId}")]
       public async Task<ActionResult> ExcluirTarefaAsync(int TarefaId)
       {
         Tarefa tarefa = await _contexto.Tarefas.FindAsync(TarefaId);
         if(tarefa == null)
           return NotFound();
         _contexto.Remove(tarefa);
         await _contexto.SaveChangesAsync();
         return Ok();
       }

    }
}