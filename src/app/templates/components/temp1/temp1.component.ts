import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-temp1',
  templateUrl: './temp1.component.html',
  styleUrls: ['./temp1.component.scss']
})
export class Temp1Component implements OnInit, AfterViewInit, OnDestroy {
  isMenuOpen = false;
  activeLink = '#couple';
  music = new Audio('assets/music/motnha.mp3');
  isPlaying = false;
  showFull = false;
  hoverSide: string = '';
  menuItems = [
    { label: 'Cặp đôi', link: '#couple' },
    { label: 'Chuyện tình yêu', link: '#love-story' },
    { label: 'Album hình cưới', link: '#album' },
    { label: 'Sự kiện cưới', link: '#event' },
    { label: 'Sổ lưu bút', link: '#guestbook' },
    { label: 'Mừng cưới', link: '#gift' },
  ];

  couple = {
    groom: {
      groom: true,
      img: '../../../../assets/daure/Thăng.jpg',
      name: 'Nguyễn Thăng',
      des: 'Là một người hiền lành và ít nói. Luôn coi trọng tình cảm và yêu thương gia đình. Với anh: “Gia đình là điểm tựa vững chắc nhất và là bến đỗ bình yên không đâu sánh bằng đối với mỗi con người. Đó luôn là nơi tràn ngập tình yêu thương để ta trở về.”',
      yourSon: 'Nguyễn Văn Long',
      yourChild: 'Nguyễn Thị Nga'
    },
    bride: {
      bride: true,
      name: 'Phạm Hoa',
      img: '../../../../assets/daure/Hoa.jpg',
      des: 'Là một người hiền lành và ít nói. Luôn coi trọng tình cảm và yêu thương gia đình. Với anh: “Gia đình là điểm tựa vững chắc nhất và là bến đỗ bình yên không đâu sánh bằng đối với mỗi con người. Đó luôn là nơi tràn ngập tình yêu thương để ta trở về.”',
      yourSon: 'Nguyễn Văn Long',
      yourChild: 'Nguyễn Thị Nga'
    },
    des: 'Sau 7 năm yêu xa — vượt qua mọi khoảng cách, múi giờ và... cả cơn buồn ngủ khi phải call mỗi đêm — cuối cùng Duy Phi & Yến Nhi cũng chính thức “về một đội”! Chúng mình thật sự rất vui "xúc động lắm luôn! " khi thấy bạn có mặt trong ngày đặc biệt này.Cảm ơn bạn đã cùng chúng mình chia sẻ niềm hạnh phúc mà hai đứa đã nuôi dưỡng suốt những năm tháng yêu xa.Tình yêu này có thể bay qua hàng ngàn cây số, nhưng chính sự chúc phúc và tình cảm của mọi người mới là đôi cánh thật sự giúp chúng mình bay tới hôm nay.Một lần nữa, cảm ơn vì đã đến, đã vui, và đã yêu thương nhiều đến vậy!— Khủng long con ham ăn & Tiểu Heo Bông 💍✨'
  }
  dataDialog: any = null
  currentIndex = 0;
  private intervalId?: any;
  imagesBanner = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80'

  ];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private supabaseService: SupabaseService) { }
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
    setTimeout(() => {
      this.currentIndex = 0;
    });
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000);
  }

  handleOpenDialog(type: string) {
    if (type === 'groom') {
      this.dataDialog = this.couple.groom
    } else {
      this.dataDialog = this.couple.bride
    }
    this.showFull = true
  }

  handleApi() {
    this.supabaseService.getTemplate(1).subscribe(
      res => {
        console.log(res)
        const i = {
          groom: {
            name: "Nguyễn Thăng",
            dad: 'Nguyễn Văn Long',
            mom: 'Nguyễn Thị Nga',
            des: 'Là một người hiền lành và ít nói. Luôn coi trọng tình cảm và yêu thương gia đình. Với anh: “Gia đình là điểm tựa vững chắc nhất và là bến đỗ bình yên không đâu sánh bằng đối với mỗi con người. Đó luôn là nơi tràn ngập tình yêu thương để ta trở về.',
            img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
          },
          bride: {
            name: "Phạm Hoa",
            dad: 'Phạm Ngọc Văn',
            mom: 'Phạm Thị Nhạn',
            des: 'Cô gái đến từ xứ sở sương mù An Thanh. Là một người hay cười nhưng lại sống nội tâm, thích đọc sách, trồng cây và yêu thiên nhiên',
            img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
          },
          descriptions: 'Sau 4 năm yêu xa — vượt qua mọi khoảng cách, múi giờ và... cả cơn buồn ngủ khi phải call mỗi đêm — cuối cùng Duy Phi & Yến Nhi cũng chính thức “về một đội”! 🥰'
        }
      }

    )
  }
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.imagesBanner.length;
  }

  ngAfterViewInit() {
    const navLinks = this.el.nativeElement.querySelectorAll('.navbar ul li a');
    const underline = this.el.nativeElement.querySelector('.underline');
    const navbar = this.el.nativeElement.querySelector('.navbar');
    const menuIcon = this.el.nativeElement.querySelector('#menu-icon');
    this.currentIndex = 0;
    this.cdr.detectChanges();
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
  closeMenu() {
    this.isMenuOpen = false;
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

  send() {

  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

}