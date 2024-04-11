namespace API.Entities;

public class Jogador
{
    public int Id { get; set; }
    public string Usuario { get; set; }
    public byte[] HashSenha { get; set; }
    public byte[] SalSenha { get; set; }
}
