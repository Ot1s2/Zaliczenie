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
    public partial class Form1 : Form
    {
        BindingList<Pojazd> listaPojazdow = new BindingList<Pojazd>();


        public Form1()
        {
            InitializeComponent();
            dgvPojazdy.DataSource = listaPojazdow;
        }

        private void btnDodaj_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtNrRej.Text))
            {
                MessageBox.Show("Uzupełnij numer rejestracyjny!");
                return;
            }

            listaPojazdow.Add(new Pojazd
            {
                NrRejestracyjny = txtNrRej.Text,
                Marka = txtMarka.Text,
                Model = txtModel.Text,
                RokProdukcji = (int)numRok.Value,
                DataPrzegladu = dtpData.Value,
                Wlasciciel = txtWlascicel.Text
            });

            txtNrRej.Text = "";

        }
    }
 }
