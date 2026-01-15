using Microsoft.Reporting.WinForms;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EwidencjaPojazdów
{
    public partial class FormRaport : Form
    {
        public FormRaport(List<Pojazd> dane)
        {
            InitializeComponent();

            // 1. Reset
            reportViewer1.LocalReport.DataSources.Clear();

            // 2. Ścieżka do pliku raportu
            // Wzór: NazwaProjektu.NazwaPliku.rdlc
            // Jeśli projekt nazywa się "EwidencjaPojazdów" (przez ó), to tu też musi być ó.
            reportViewer1.LocalReport.ReportEmbeddedResource = "EwidencjaPojazdów.RaportPrzeglady.rdlc";

            // 3. Źródło danych
            // "DataSetPojazdy" -> Ta nazwa musi być IDENTYCZNA jak ta, którą wpisałeś w pliku .rdlc
            reportViewer1.LocalReport.DataSources.Add(new ReportDataSource("DataSetPojazdy", dane));

            reportViewer1.RefreshReport();
        }

        private void FormRaport_Load(object sender, EventArgs e)
        {
            this.reportViewer1.RefreshReport();
        }
    }
}
