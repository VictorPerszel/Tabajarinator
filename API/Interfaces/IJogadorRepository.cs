using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IJogadorRepository
    {
        void Update(Jogador jogador);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Jogador>> GetJogadoresAsync();
        Task<Jogador> GetJogadorPorIdAsync(int id);
        Task<Jogador> GetJogadorPorUsuarioAsync(string usuario);
        Task<IEnumerable<JogadorDto>> GetJogadoresDtoAsync();
        Task<JogadorDto> GetJogadorDtoAsync(string usuario);
    }
}