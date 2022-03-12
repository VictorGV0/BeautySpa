(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    
    el.addEventListener('scroll', listener)
  }

 
  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

   /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 200) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
      $('#header').toggleClass('top-zindex')
    
    $('body').toggleClass('noscroll')
  })

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


 /**
   * Navbar links active state on scroll 
   */
$list = $('#navbarlist')
$activ = $('#herol,#aboutl,#serv3,#serv,#contl');
$touchstarted=false

/**Wont work on tactil devices */
$(window).on('touchstart', function(){
  $touchstarted=true
});


$(window).on('scroll',function(){
  $measures();
  
  if ($available < $imgHeight && !$(".mobile-nav-toggle").is(":visible")) {
    $('#logo').css("left", "-260px");
    $('.img-logo').css("left","20px")
  }
  if ($available <= 0 && !$(".mobile-nav-toggle").is(":visible")) {
    $('#header').css("background-color","#000000b8")
  }


  if (window.scrollY <=0 && !$(".mobile-nav-toggle").is(":visible")) {
    $('#header').css("background-color","#00000099");
    $('#logo').css("left", "0");
    $('.img-logo').css("left","-200px")

    $activ.removeClass('active')
   $('#herol').addClass('active')
 }

 if ($touchstarted && $activ.hasClass('hovered')) {
   $activ.removeClass('hovered')
   
 }
  if ($collapseshown) {
  $measures()
  $movelist();    
  }
})

const boxes= document.querySelectorAll(".box");
const options ={
threshold: 0.17
}
const verifyvisibility = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting && !$(".mobile-nav-toggle").is(":visible")) {
    $entry =entry.target.id;
     if ($entry=='hero') {
       $activ.removeClass('active')
      $('#herol').addClass('active')
      
    }
    if ($entry=='about') {
      $activ.removeClass('active')
      $('#aboutl').addClass('active')
      
    }
    if ($entry=='portfolio') {
      $activ.removeClass('active')
      $('#serv3').addClass('active')
      
    }
    if ($entry=='contact') {
      $activ.removeClass('active')
      $('#contl').addClass('active')
      
    }
  }}}
let observer = new IntersectionObserver(verifyvisibility,options);
for (const box of boxes) {
  observer.observe(box);
}

  /**
   * Move dropdown menu acording to the space available above or below
   */
  /*Create a variable to know if dropdown menu is open and if it is open it will move up or down on scroll
 */
    $collapseshown=false;

    $list.on('show.bs.collapse', function () {
      $collapseshown=true;
      $measures();
      $movelist();
})

/*Determine the space available*/
   function $measures(){
    $listheight =$list.outerHeight(true);
    $scroll = $(window).scrollTop();
    $fromnavdistance = $('#header').offset().top;
    $available = ($fromnavdistance - $scroll);
    $spacebelow = $(window).height() - $(header)[0].getBoundingClientRect().bottom;
    $imgHeight = $('#logo').outerHeight();
    $width = $available*$imgHeight/100;
    }

    function $movelist() {
      if ($available >= $listheight && $list.hasClass("down") && $spacebelow < $listheight) {
        $list.removeClass("down");
      }
      else if ( $spacebelow >= $listheight || $available < $listheight ){
        $list.addClass("down");}
      }

    /*Avoid AutoClose while doing click on dropdown menu*/

    $("#navbarlist").on('click',function(e){
      e.stopPropagation();
    });
  


/**Close Dropdown Menu when focusOut o when a link inside is clicked*/

$(document).on('click',function(){
  if($collapseshown){
    $closelist()
  }
});
$('.alink').on('click', function(){
  $closelist()
})

  /**
   * Close Mobile Navbar when a link inside is clicked
   */
   $activ.on('click',function(){
    if ($(".mobile-nav-toggle").is(":visible")) {
      $closenavmobile()
    } 
    
  })
function $closenavmobile(){
      $('#navbar').toggleClass('navbar-mobile')
      $('body').toggleClass('noscroll')
      $('#header').toggleClass('top-zindex')
      $('.mobile-nav-toggle').toggleClass('bi-x bi-list')
      // $('.mobile-nav-toggle').toggleClass('bi-x')
}


/**Close sublist inside Dropdown menu when focus out */

$sublist=$('#collap-a,#collap-b,#collap-c')

function $closelist(){
  
  if($list.hasClass("show") ){
    new bootstrap.Collapse($list, {
      hide:true})}

      if ($('#collap-a').hasClass("show")){
        new bootstrap.Collapse($sublist[0], {
          hide:true})}

          if ($('#collap-b').hasClass("show")){
            new bootstrap.Collapse($sublist[1], {
              hide:true})}

              if ($('#collap-c').hasClass("show")){
                new bootstrap.Collapse($sublist[2], {
                  hide:true})}         
  
}
/**This will close both list when resizing to avoid visual glitches */
$(window).resize(function(){
	if($(".mobile-nav-toggle").is(":visible")){
  $closelist()
  }
  if(!$(".mobile-nav-toggle").is(":visible") && $('#navbar').hasClass('navbar-mobile')){
    $closenavmobile()
  }
})






