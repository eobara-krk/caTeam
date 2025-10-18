import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

// Typy dla linków i itemów
interface Link {
  name: string;
  url?: string;
  text?: string;
  protected?: boolean;
  show?: boolean;
  type?: string;
}

interface Meeting {
  date: string;
  show: boolean;
  links?: Link[];     // dla zwykłych sekcji
  meetings?: Meeting[]; // dla spotkań z podziałem na daty
}

interface Item {
  title: string;
  show: boolean;
  links?: Link[];
  meetings?: Meeting[];
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Item[] = [

    { 
      title: 'Laser Tag Wrocław VII-2025', 
      show: false,
      links: [
        { name: 'kwatera główna (strona)', url:'https://kwateraglowna.pl/kontakt/'},
        { name: 'Zdjęcie', url: 'https://drive.google.com/file/d/1-G72WfoWtTSEMAsyaDK6XouzIzKg5vFL/view?usp=sharing'},

      ]
    },

        { 
      title: 'Zagórze Śląskie X-2025', 
      show: false,
      links: [
        { name: 'tama Lubachów', url:'https://drive.google.com/file/d/1RtcC_1GQL-aOS7knwSkkxDcff2QK3_dX/view?usp=sharing'},
        { name: 'kolorowa kładka', url:'https://drive.google.com/file/d/1VxvJ4PgqJIQWeDnlF2wbm8DHAVFZ02zr/view?usp=sharing'},
        { name: 'przewodnik na zamku Grodno (1)', url:'https://drive.google.com/file/d/1JncLyCUpw4LkSxcPJ_7cHZr_t7M9-IOC/view?usp=sharing'},
        { name: 'przewodnik na zamku Grodno (2)', url:'https://drive.google.com/file/d/1ZiWmxNSRMvBeD6v0J4kKSi0KMyXL_kRg/view?usp=sharing'},
        { name: 'belgijka kroki', url:'https://www.youtube.com/watch?v=HaoeHXMoQFo'},
        { name: 'Zdjęcia', url: 'https://photos.app.goo.gl/nmXEc8hHGVMkh7Ue7'},
        { name: 'makao zasady', url: 'https://www.morele.net/wiadomosc/gra-karciana-makao-jak-grac-zasady-i-praktyczne-porady-gry-karcianej/18363/'}


      ]
    }
  ];

  currentDateTime: string = '';

 private readonly summaryPassword = 'syn';

 constructor() {
    // Uruchamiamy aktualizację daty/godziny przy starcie komponentu
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  // --- METODA DO AKTUALIZACJI DATY I GODZINY ---
  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString('pl-PL', {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // --- OTWIERANIE LINKÓW ---
  openLink(link: Link) {
    if (!link.url) return;

    // jeśli link kończy się na .m4a, otwórz w nowym oknie z odtwarzaczem
    if (link.url.endsWith('.m4a')) {
      const audioWindow = window.open('', '_blank');
      if (audioWindow) {
        audioWindow.document.write(`
          <html>
            <body style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;">
              <h3>${link.name}</h3>
              <audio controls autoplay style="width:90%;">
                <source src="${link.url}" type="audio/mp4">
              </audio>
            </body>
          </html>
        `);
        audioWindow.document.close();
      }
    } else {
      // zwykły link do filmu/albumu
      window.open(link.url, '_blank');
    }
  }

// --- ROZWIJANIE EVENTÓW ---
toggle(obj: { show: boolean }) {
  obj.show = !obj.show;
}


  // --- CHRONIONE TEKSTY ---
  toggleLink(link: Link) {
    if (link.protected) {
      if (!link.show) {
        const password = prompt('Podaj hasło, aby odczytać podsumowanie:');
        if (password === this.summaryPassword) {
          link.show = true;
        } else {
          alert('Błędne hasło!');
        }
      }
    } else {
      link.show = !link.show;
    }
  }

  trackByTitle(index: number, item: Item) {
    return item.title;
  }

  trackByName(index: number, link: Link) {
    return link.name;
  }

  closePage() {
    window.close();
  }
}