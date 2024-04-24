using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        public string Usuario { get; set; }
        public string Senha { get; set; }
    }
}