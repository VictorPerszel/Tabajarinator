using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class JogadorDto
    {        
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Alcunha { get; set; }
        public DateTime Criado { get; set; }
        public DateTime AtivoEm { get; set; }
        public string Recado { get; set; }
        public string FotoUrl { get; set; }
    }
}