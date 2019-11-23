﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class BugContext: DbContext
    {
        public BugContext(DbContextOptions<BugContext> options)
            : base (options)
        { }
        public DbSet<BugModel> Bugs { get; set; }

    }
}
