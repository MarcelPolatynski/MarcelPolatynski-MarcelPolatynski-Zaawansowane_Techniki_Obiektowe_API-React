using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Zaliczenie.DbServices;
using Zaliczenie.Models;


namespace Zaliczenie.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // POST: api/users/register
        [HttpPost("register")]
        public ActionResult<User> RegisterUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // POST: api/users/login
        [HttpPost("login")]
        public IActionResult LoginUser(User user)
        {
            var existingUser = _context.Users.SingleOrDefault(u => u.UserName == user.UserName && u.Password == user.Password);

            if (existingUser == null)
            {
                return NotFound();
            }

            return Ok(existingUser);
        }
    }
}
