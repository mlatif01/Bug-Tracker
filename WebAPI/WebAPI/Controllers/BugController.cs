﻿using Microsoft.AspNetCore.Authorization;
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

        // GET: api/bug
        [HttpGet("api/bug/{projectId}")]
        public IEnumerable<Bug> GetBugs(int projectId)
        {
            return _db.Bugs.Where(bug => bug.ProjectId == projectId);
        }

        // PUT: api/bug/1
        [HttpPut("api/bug/{id}")]
        public async Task<IActionResult> PutBug(int id, [FromBody] Bug bug)
        {
            if (id != bug.Id)
            {
                return BadRequest();
            }

            string userId = User.GetUserId();

            bug.ApplicationUserId = userId;
            _db.Update(bug);
            await _db.SaveChangesAsync();

            return Ok();

        }

        // DELETE: api/bug/1
        [HttpDelete("api/bug/{id}")]
        public async Task<IActionResult> DeleteBug(int id)
        {
            var bug = await _db.Bugs.FindAsync(id);

            if (bug == null)
            {
                return NotFound();
            }

            _db.Bugs.Remove(bug);
            await _db.SaveChangesAsync();

            return Ok(bug);
        }

        // POST: api/bug
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
                Status = model.Status,
                ProjectId = model.ProjectId
            });

            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
