using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UsersController : BaseApiController
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Jogador>>> GetUsers()
    {
        return await _context.Jogadores.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Jogador>> GetUser(int id)
    {
        return await _context.Jogadores.FindAsync(id);
    }
}

