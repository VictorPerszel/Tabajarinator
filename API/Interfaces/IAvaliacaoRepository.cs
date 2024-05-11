using API.Entities;

namespace API.Interfaces
{
    public interface IAvaliacaoRepository
    {
        Task<Avaliacao> GetAvaliacao(int olheiroId, int avaliadoId);
    }
}