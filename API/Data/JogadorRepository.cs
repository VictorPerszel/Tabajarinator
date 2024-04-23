using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class JogadorRepository : IJogadorRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public JogadorRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<IEnumerable<Jogador>> GetJogadoresAsync()
        {
            return await _context.Jogadores.ToListAsync();
        }

        public async Task<Jogador> GetJogadorPorIdAsync(int id)
        {
            return await _context.Jogadores.FindAsync(id);
        }

        public async Task<Jogador> GetJogadorPorUsuarioAsync(string usuario)
        {
            return await _context.Jogadores.SingleOrDefaultAsync(x => x.Usuario == usuario);
        }

        public async Task<MembroDto> GetMembroAsync(string usuario)
        {
            return await _context.Jogadores
                .Where(x => x.Usuario == usuario)
                .ProjectTo<MembroDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MembroDto>> GetMembrosAsync()
        {
            return await _context.Jogadores
                .ProjectTo<MembroDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Jogador jogador)
        {
            _context.Entry(jogador).State = EntityState.Modified;
        }
    }
}