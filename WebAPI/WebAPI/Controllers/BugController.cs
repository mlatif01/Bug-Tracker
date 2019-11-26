using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("api/bug")]
        public IEnumerable<Bug> GetBugs()
        {
            return _db.Bugs.Where(bug => bug.ApplicationUserId == User.GetUserId());
        }

        [HttpPost("api/bug")]
        public async Task<IActionResult> AddBug([FromBody] Bug model)
        {
            string userId = User.GetUserId();

            var user = await _userManager.FindByIdAsync(userId);

            _db.Bugs.Add(new Bug
            {
                ApplicationUserId = userId,
                Description = model.Description,
                Title = model.Title,
                Status = model.Status
            });

            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
