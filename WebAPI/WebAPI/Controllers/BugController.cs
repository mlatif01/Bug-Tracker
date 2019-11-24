using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebAPI.Extensions;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class BugController : ControllerBase
    {
        private readonly AuthenticationContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public BugController(AuthenticationContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        [HttpPost("api/bug")]
        public async Task<IActionResult> AddBug()
        {
            string userId = User.GetUserId();

            var user = await _userManager.FindByIdAsync(userId);

            _db.Bugs.Add(new Bug
            {
                ApplicationUserId = userId,
                Description = $"{user.FullName} bug description",
                Title = $"{user.FullName} bug title"
            });

            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
