using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ToDoListCRUD.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Tarefa> Tarefas {get; set;}

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {

        }
    }
}