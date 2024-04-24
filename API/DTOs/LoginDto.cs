using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class LoginDto
    {
        public string Login { get; set; }
        public string Senha { get; set; }
    }
}