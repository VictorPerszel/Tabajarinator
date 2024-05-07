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
    public async Task<ActionResult<IEnumerable<JogadorDto>>> GetJogadores()
    {
        var jogadores = await _jogadorRepository.GetJogadoresDtoAsync();

        return Ok(jogadores);
    }

    [HttpGet("{usuario}")]
    public async Task<ActionResult<JogadorDto>> GetJogador(string usuario)
    {
        var jogador = await _jogadorRepository.GetJogadorDtoAsync(usuario);
        
        return Ok(jogador);
    }
}

