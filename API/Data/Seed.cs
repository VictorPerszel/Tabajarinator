using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedarJogadores(DataContext context)
        {
            if (await context.Jogadores.AnyAsync()) return;

            var jogadorData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{ PropertyNameCaseInsensitive = true };

            var jogadores = JsonSerializer.Deserialize<List<Jogador>>(jogadorData, options);

            foreach(var jogador in jogadores)
            {
                using var hmac = new HMACSHA512();

                jogador.Usuario = jogador.Usuario.ToLower();
                jogador.HashSenha = hmac.ComputeHash(Encoding.UTF8.GetBytes("123"));
                jogador.SalSenha = hmac.Key;

                context.Jogadores.Add(jogador);
            }

            await context.SaveChangesAsync();
        }
    }
}