using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brewrilla.Models
{
    public class BeerDbContext:DbContext
    {
        public BeerDbContext(DbContextOptions<BeerDbContext> options):base(options)
        {
                
        }

        public DbSet<DBeer> DBeers { get; set; }
    }
}
