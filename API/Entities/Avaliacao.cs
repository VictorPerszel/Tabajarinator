using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Avaliacao
    {
        public Jogador Olheiro { get; set; }
        public int OlheiroId { get; set;}
        public Jogador Avaliado { get; set; }
        public int AvaliadoId {get; set;}

        public int? NotaVelocidade { get; set; }
        public int? NotaMarcacao { get; set; }
        public int? NotaRaca { get; set; }
        public int? NotaHabilidade { get; set; }
        public int? NotaGoleiro { get; set; }
        public bool? EhFan { get; set; }
        public int NotaGeral { get; set;}
        
    }
}