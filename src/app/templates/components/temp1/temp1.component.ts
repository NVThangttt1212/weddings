import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-temp1',
  templateUrl: './temp1.component.html',
  styleUrls: ['./temp1.component.scss']
})
export class Temp1Component implements OnInit,AfterViewInit {
  isMenuOpen = false;
  activeLink = '#couple';
  music = new Audio('assets/music/wedding-song.mp3');
  isPlaying = false;
  menuItems = [
    { label: 'Cặp đôi', link: '#couple' },
    { label: 'Chuyện tình yêu', link: '#love-story' },
    { label: 'Album hình cưới', link: '#album' },
    { label: 'Sự kiện cưới', link: '#event' },
    { label: 'Sổ lưu bút', link: '#guestbook' },
    { label: 'Mừng cưới', link: '#gift' },
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  snowflakes: { left: string, size: string, duration: string, delay: string }[] = [];

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.snowflakes.push({
        left: Math.random() * 100 + '%',
        size: (Math.random() * 10 + 10) + 'px',
        duration: (Math.random() * 10 + 5) + 's',
        delay: (Math.random() * 5) + 's'
      });
    }
  }

  ngAfterViewInit() {
    const navLinks = this.el.nativeElement.querySelectorAll('.navbar ul li a');
    const underline = this.el.nativeElement.querySelector('.underline');
    const navbar = this.el.nativeElement.querySelector('.navbar');
    const menuIcon = this.el.nativeElement.querySelector('#menu-icon');

    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => {
        navLinks.forEach((item: any) => item.classList.remove('active'));
        link.classList.add('active');
        const rect = link.getBoundingClientRect();
        const parentRect =
          link.parentElement!.parentElement!.getBoundingClientRect();
        const offsetLeft = rect.left - parentRect.left;

        this.renderer.setStyle(underline, 'width', `${rect.width}px`);
        this.renderer.setStyle(underline, 'transform', `translateX(${offsetLeft}px)`);

        if (window.innerWidth <= 1024) {
          navbar.classList.remove('active');
        }
      });
    });

    const firstLink = navLinks[0] as HTMLElement;
    this.setUnderlinePosition(firstLink, underline);

    window.addEventListener('resize', () => {
      const activeLink = this.el.nativeElement.querySelector('.navbar a.active');
      if (activeLink) this.setUnderlinePosition(activeLink, underline);
    });

    this.renderer.listen(menuIcon, 'click', () => {
      navbar.classList.toggle('active');
    });

    this.renderer.listen(document, 'click', (event) => {
      if (
        window.innerWidth <= 1024 &&
        !navbar.contains(event.target) &&
        !menuIcon.contains(event.target)
      ) {
        navbar.classList.remove('active');
      }
    });
  }

  private setUnderlinePosition(link: HTMLElement, underline: HTMLElement) {
    const rect = link.getBoundingClientRect();
    const parentRect = link.parentElement!.parentElement!.getBoundingClientRect();
    const offsetLeft = rect.left - parentRect.left;

    this.renderer.setStyle(underline, 'width', `${rect.width}px`);
    this.renderer.setStyle(underline, 'transform', `translateX(${offsetLeft}px)`);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      if (this.isMenuOpen) overlay.classList.add('active');
      else overlay.classList.remove('active');
    }
  }

  onSelectLink(link: string) {
    this.activeLink = link;
    this.toggleMenu(); // đóng menu sau khi chọn
  }

  toggleMusic() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.music.loop = true;
      this.music.play();
    } else {
      this.music.pause();
    }
  }

}