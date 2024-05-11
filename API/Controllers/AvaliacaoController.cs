using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AvaliacaoController : BaseApiController
    {
        private readonly IJogadorRepository _jogadorRepository;
        private readonly IAvaliacaoRepository _avaliacaoRepository;

        public AvaliacaoController(IJogadorRepository jogadorRepository, IAvaliacaoRepository avaliacaoRepository)
        {
            _jogadorRepository = jogadorRepository;
            _avaliacaoRepository = avaliacaoRepository;
        }

        [HttpPost()]
        public async Task<ActionResult> AddAvaliacao(AvaliacaoDto parametros)
        {
            var olheiroId = User.GetUsuarioId();
            var olheiro = await _jogadorRepository.GetJogadorPorIdAsync(olheiroId);
            var avaliado = await _jogadorRepository.GetJogadorPorUsuarioAsync(parametros.UsuarioAvaliado);

            if (avaliado == olheiro) return BadRequest("Você não pode avaliar a si mesmo");

            var aval = new Avaliacao
            {
                OlheiroId = olheiroId,
                AvaliadoId = avaliado.Id,
                NotaVelocidade = parametros.NotaVelocidade,
                NotaMarcacao = parametros.NotaMarcacao,
                NotaRaca = parametros.NotaRaca,
                NotaHabilidade = parametros.NotaHabilidade,
                NotaGoleiro = parametros.NotaGoleiro,
                EhFan = parametros.EhFan,
                NotaGeral = parametros.NotaGeral ?? parametros.CalculaNotaGeral()
            };

            olheiro.AvalFeitas.Add(aval);

            if (await _jogadorRepository.SaveAllAsync()) return Ok();

            return BadRequest("Erro ao salvar a avaliação");
        }
    }
}