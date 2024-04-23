using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class JogadoresController : BaseApiController
{
    private readonly IJogadorRepository _jogadorRepository;
    private readonly IMapper _mapper;

    public JogadoresController(IJogadorRepository jogadorRepository, IMapper mapper)
    {
        _jogadorRepository = jogadorRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MembroDto>>> GetJogadores()
    {
        var jogadores = await _jogadorRepository.GetMembrosAsync();

        return Ok(jogadores);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<MembroDto>> GetJogador(string usuario)
    {
        var jogador = await _jogadorRepository.GetMembroAsync(usuario);
        
        return Ok(jogador);
    }
}

