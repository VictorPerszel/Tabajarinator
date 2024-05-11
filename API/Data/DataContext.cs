using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Jogador> Jogadores { get; set; }
    public DbSet<Avaliacao> Avaliacoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Avaliacao>().HasKey(k => new {k.OlheiroId, k.AvaliadoId});

        modelBuilder.Entity<Avaliacao>().HasOne(o => o.Olheiro).WithMany(a => a.AvalFeitas).HasForeignKey(o => o.OlheiroId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<Avaliacao>().HasOne(o => o.Avaliado).WithMany(a => a.AvalRecebidas).HasForeignKey(o => o.AvaliadoId).OnDelete(DeleteBehavior.Cascade);
    }
}
