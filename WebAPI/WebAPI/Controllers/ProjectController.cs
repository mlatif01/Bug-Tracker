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
    public class ProjectController : ControllerBase
    {
        private readonly AuthenticationContext _db;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProjectController(AuthenticationContext db, UserManager<ApplicationUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        // GET: api/bug
        [HttpGet("api/project")]
        public IEnumerable<Project> GetProjects()
        {
            return _db.Projects.Where(project => project.ApplicationUserId == User.GetUserId());
        }

        // PUT: api/project/1
        [HttpPut("api/project/{id}")]
        public async Task<IActionResult> PutProject(int id, [FromBody] Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            string userId = User.GetUserId();

            project.ApplicationUserId = userId;
            _db.Update(project);
            await _db.SaveChangesAsync();

            return Ok();

        }

        // DELETE: api/project/1
        [HttpDelete("api/project/{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var project = await _db.Projects.FindAsync(id);
            var bugs = _db.Bugs.Where(bug => bug.ProjectId == id);

            if (project == null)
            {
                return NotFound();
            }

            foreach(Bug bug in bugs)
            {
                _db.Bugs.Remove(bug);
            }

            _db.Projects.Remove(project);
            await _db.SaveChangesAsync();

            return Ok(project);
        }

        // POST: api/project
        [HttpPost("api/project")]
        public async Task<IActionResult> AddBug([FromBody] Project model)
        {
            string userId = User.GetUserId();

            var user = await _userManager.FindByIdAsync(userId);

            _db.Projects.Add(new Project
            {
                ApplicationUserId = userId,
                Description = model.Description,
                Title = model.Title,
            });

            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
