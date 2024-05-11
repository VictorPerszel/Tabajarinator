namespace API.Entities;

public class Jogador
{
    public int Id { get; set; }
    public string Usuario { get; set; }
    public byte[] HashSenha { get; set; }
    public byte[] SalSenha { get; set; }
    public string Alcunha { get; set; }
    public DateTime Criado { get; set; } = DateTime.UtcNow;
    public DateTime AtivoEm { get; set; } = DateTime.UtcNow;
    public string Recado { get; set; }
    public string FotoUrl { get; set; }

    public List<Avaliacao> AvalFeitas { get; set; }
    public List<Avaliacao> AvalRecebidas { get; set; }
}
