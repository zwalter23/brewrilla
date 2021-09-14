using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Brewrilla.Models
{
    public class DBeer
    {
        [Key]
        public int id { get; set; }
        public string beerName { get; set; }
        public string tagline { get; set; }

        public string description { get; set; }
        public string imageUrl { get; set; }
        public string firstBrewed { get; set; }

        public float abv { get; set; }

        public int ibu { get; set; }

        public string[] ingredients { get; set; }
        public string[] foodPairings { get; set; }

        public int targetOG { get; set; }
        public int targetFG { get; set; }

        public int ebc { get; set; }
        public int srm { get; set; }
        public float ph { get; set; }
        public string brewersTip { get; set; }

    }
}
