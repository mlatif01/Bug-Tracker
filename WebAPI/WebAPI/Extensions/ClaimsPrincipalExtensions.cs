using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebAPI.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            return user.Claims.First(c => c.Type == "UserID").Value;
        }

        public static string GetProjectId(this ClaimsPrincipal project)
        {
            return project.Claims.First(c => c.Type == "ProjectId").Value;
        }
    }
}
