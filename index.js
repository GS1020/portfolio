

// body 구름 -------------------------------------------
particlesJS("particles-js", {
  particles: {
    number: { value: 15, density: { enable: true, value_area: 2000 } },
    color: { value: ["#4d94ff", "#ffd166", "#ff9aa2"] }, 
    shape: {
  type: "image",
  image: {
    src: "img/16d3d7cec387628fe8acf91a02f52e6c.png", 
    width: 300,
    height: 300
  }
},
    opacity: {
      value: 0.8,
      random: true,
      anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false }
    },
    size: { value: 300, random: true },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      random: true,
      out_mode: "out"
    }
  },
  interactivity: { events: { resize: true } },
  retina_detect: true
});


// 프로필 슬라이더

// The Slideshow class.
class Slideshow {
    constructor(el) {
        
        this.DOM = {el: el};
      
        this.config = {
          slideshow: {
            delay: 3000,
            pagination: {
              duration: 3,
            }
          }
        };
        
        // Set the slideshow
        this.init();
      
    }
    init() {
      
      var self = this;
      
      // Charmed title
      this.DOM.slideTitle = this.DOM.el.querySelectorAll('.slide-title');
      this.DOM.slideTitle.forEach((slideTitle) => {
        charming(slideTitle);
      });
      
      // Set the slider
      this.slideshow = new Swiper (this.DOM.el, {
          
          loop: true,
          autoplay: {
            delay: this.config.slideshow.delay,
            disableOnInteraction: false,
          },
          speed: 500,
          preloadImages: true,
          updateOnImagesReady: true,
          
          // lazy: true,
          // preloadImages: false,

          pagination: {
            el: '.slideshow-pagination',
            clickable: true,
            bulletClass: 'slideshow-pagination-item',
            bulletActiveClass: 'active',
            clickableClass: 'slideshow-pagination-clickable',
            modifierClass: 'slideshow-pagination-',
            renderBullet: function (index, className) {
              
              var slideIndex = index,
                  number = (index <= 8) ? '0' + (slideIndex + 1) : (slideIndex + 1);
              
              var paginationItem = '<span class="slideshow-pagination-item">';
              paginationItem += '<span class="pagination-number">' + number + '</span>';
              paginationItem = (index <= 8) ? paginationItem + '<span class="pagination-separator"><span class="pagination-separator-loader"></span></span>' : paginationItem;
              paginationItem += '</span>';
            
              return paginationItem;
              
            },
          },

          // Navigation arrows
          navigation: {
            nextEl: '.slideshow-navigation-button.next',
            prevEl: '.slideshow-navigation-button.prev',
          },

          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        
          on: {
            init: function() {
              self.animate('next');
            },
          }
        
        });
      
        // Init/Bind events.
        this.initEvents();
        
    }
    initEvents() {
        
        this.slideshow.on('paginationUpdate', (swiper, paginationEl) => this.animatePagination(swiper, paginationEl));
        //this.slideshow.on('paginationRender', (swiper, paginationEl) => this.animatePagination());

        this.slideshow.on('slideNextTransitionStart', () => this.animate('next'));
        
        this.slideshow.on('slidePrevTransitionStart', () => this.animate('prev'));
            
    }
    animate(direction = 'next') {
      
        // Get the active slide
        this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
        this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
        this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-title'),
        this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');
      
        // Reverse if prev  
        this.DOM.activeSlideTitleLetters = direction === "next" ? this.DOM.activeSlideTitleLetters : [].slice.call(this.DOM.activeSlideTitleLetters).reverse();
      
        // Get old slide
        this.DOM.oldSlide = direction === "next" ? this.DOM.el.querySelector('.swiper-slide-prev') : this.DOM.el.querySelector('.swiper-slide-next');
        if (this.DOM.oldSlide) {
          // Get parts
          this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-title'),
          this.DOM.oldSlideTitleLetters = this.DOM.oldSlideTitle.querySelectorAll('span'); 
          // Animate
          this.DOM.oldSlideTitleLetters.forEach((letter,pos) => {
            TweenMax.to(letter, .3, {
              ease: Quart.easeIn,
              delay: (this.DOM.oldSlideTitleLetters.length-pos-1)*.04,
              y: '50%',
              opacity: 0
            });
          });
        }
      
        // Animate title
        this.DOM.activeSlideTitleLetters.forEach((letter,pos) => {
					TweenMax.to(letter, .6, {
						ease: Back.easeOut,
						delay: pos*.05,
						startAt: {y: '50%', opacity: 0},
						y: '0%',
						opacity: 1
					});
				});
      
        // Animate background
        TweenMax.to(this.DOM.activeSlideImg, 1.5, {
            ease: Expo.easeOut,
            startAt: {x: direction === 'next' ? 200 : -200},
            x: 0,
        });
      
        //this.animatePagination()
    
    }
    animatePagination(swiper, paginationEl) {
            
      // Animate pagination
      this.DOM.paginationItemsLoader = paginationEl.querySelectorAll('.pagination-separator-loader');
      this.DOM.activePaginationItem = paginationEl.querySelector('.slideshow-pagination-item.active');
      this.DOM.activePaginationItemLoader = this.DOM.activePaginationItem.querySelector('.pagination-separator-loader');
      
      console.log(swiper.pagination);
      // console.log(swiper.activeIndex);
      
      // Reset and animate
        TweenMax.set(this.DOM.paginationItemsLoader, {scaleX: 0});
        TweenMax.to(this.DOM.activePaginationItemLoader, this.config.slideshow.pagination.duration, {
          startAt: {scaleX: 0},
          scaleX: 1,
        });
      
      
    }
    
}

const slideshow = new Slideshow(document.querySelector('.slideshow'));


// 프로젝트 자동스크롤효과 --------------------------------

    document.querySelectorAll(".scroll-box").forEach((box) => {
      let interval;

      box.addEventListener("mouseenter", () => {
        interval = setInterval(() => {
          box.scrollTop += 2;
        }, 10);
      });

      box.addEventListener("mouseleave", () => {
        clearInterval(interval);

        const start = box.scrollTop;
        const duration = 500;
        const startTime = performance.now();

        function animateScrollBack(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          box.scrollTop = start * (1 - progress);

          if (progress < 1) {
            requestAnimationFrame(animateScrollBack);
          }
        }

        requestAnimationFrame(animateScrollBack);
      });
    });



  // 버튼 ----------------

      document.getElementById("work").addEventListener("click", function () {
    window.open("https://gs1020.github.io/pjt-4th", "_blank");
  });

      document.getElementById("work2").addEventListener("click", function () {
    window.open("https://gs1020.github.io/pjt-4th/한길수_project4.pdf", "_blank");
  });

        document.getElementById("work3").addEventListener("click", function () {
    window.open("https://gs1020.github.io/third-project/", "_blank");
  });

      document.getElementById("work4").addEventListener("click", function () {
    window.open("https://gs1020.github.io/third-project/한길수_project3.pdf", "_blank");
  });

          document.getElementById("work5").addEventListener("click", function () {
    window.open("https://gs1020.github.io/gs1020team3/", "_blank");
  });

      document.getElementById("work6").addEventListener("click", function () {
    window.open("https://gs1020.github.io/gs1020team3/team3.pdf", "_blank");
  });

            document.getElementById("work7").addEventListener("click", function () {
    window.open("https://gs1020.github.io/second-project/", "_blank");
  });

      document.getElementById("work8").addEventListener("click", function () {
    window.open("https://gs1020.github.io/second-project/한길수_project2.pdf", "_blank");
  });
              document.getElementById("work9").addEventListener("click", function () {
    window.open("https://gs1020.github.io/firsr-project", "_blank");
  });
  
      document.getElementById("work10").addEventListener("click", function () {
    window.open("https://gs1020.github.io/firsr-project/한길수_project_1.pdf", "_blank");
  });


  


