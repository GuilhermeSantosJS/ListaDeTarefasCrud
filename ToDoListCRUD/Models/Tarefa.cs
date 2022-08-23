using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListCRUD.Models
{
    public class Tarefa
    {
        public int TarefaId { get; set; }
        public string? Titulo  { get; set; }
        public string? Descricao { get; set; }
        public bool Status { get; set;}
    }
}