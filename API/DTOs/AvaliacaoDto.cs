using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AvaliacaoDto
    {
        public string UsuarioAvaliado { get; set; }
        public int? NotaVelocidade { get; set; }
        public int? NotaMarcacao { get; set; }
        public int? NotaRaca { get; set; }
        public int? NotaHabilidade { get; set; }
        public int? NotaGoleiro { get; set; }
        public bool? EhFan { get; set; }
        public int? NotaGeral { get; set; }

        public int CalculaNotaGeral() {        
            int count = 0;
            int soma = 0;

            if (NotaVelocidade.HasValue) { count++; soma += NotaVelocidade.Value; }
            if (NotaMarcacao.HasValue) { count++; soma += NotaMarcacao.Value; }
            if (NotaRaca.HasValue) { count++; soma += NotaRaca.Value; }
            if (NotaHabilidade.HasValue) { count++; soma += NotaHabilidade.Value; }
            if (NotaGoleiro.HasValue) { count++; soma += NotaGoleiro.Value; }

            return soma / count;
         }
    }
}