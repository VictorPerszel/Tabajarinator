using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<JogadorDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Usuario)) return BadRequest("Usuário já existe");

            using var hmac = new HMACSHA512();

            var jogador = new Jogador
            {
                Usuario = registerDto.Usuario.ToLower(),
                HashSenha = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Senha)),
                SalSenha = hmac.Key
            };

            _context.Jogadores.Add(jogador);
            await _context.SaveChangesAsync();

            return new JogadorDto
            {
                Usuario = jogador.Usuario,
                Token = _tokenService.CreateToken(jogador)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<JogadorDto>> Login(LoginDto loginDto)
        {
            var user = await  _context.Jogadores.SingleOrDefaultAsync(x => x.Usuario == loginDto.Usuario);

            if (user == null) return Unauthorized();
            
            using var hmac = new HMACSHA512(user.SalSenha);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Senha));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.HashSenha[i]) return Unauthorized("Senha incorreta");
            }

            return new JogadorDto
            {
                Usuario = user.Usuario,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string usuario)
        {
            return await _context.Jogadores.AnyAsync(x => x.Usuario == usuario.ToLower());
        }
    }
}