using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EwidencjaPojazdów
{
    public class Pojazd
    {
        public string NrRejestracyjny { get; set; }
        public string Marka { get; set; }
        public string Model { get; set; }
        public int RokProdukcji { get; set; }
        public DateTime DataPrzegladu { get; set; }
        public string Wlasciciel { get; set; }

    }
}
