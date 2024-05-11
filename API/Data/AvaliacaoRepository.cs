using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class AvaliacaoRepository : IAvaliacaoRepository
    {
        private readonly DataContext _context;

        public AvaliacaoRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Avaliacao> GetAvaliacao(int olheiroId, int avaliadoId)
        {
            return await _context.Avaliacoes.FindAsync(olheiroId, avaliadoId);
        }
    }
}