(function($) {
	"use strict";

	UNCODE.owlNav = function(target, ev) {
    target = target.replace(/#\S+/g, '');
    var $carousel = $('#'+target),
        $slider = $carousel.closest('.uncode-slider'),
        $checkNavs = $('.uncode-owl-nav');
    if ( !$checkNavs.length ) {
        return;
    }

    if ( $slider.length ){
        target = $slider.attr('id');
    }

    var $navs = $('.uncode-owl-nav[data-target="#' + target + '"]'),
        $row;

    if ( ! $navs.length ) {
        $row = $carousel.closest('.vc_row.row-container');
        $navs = $('.uncode-owl-nav:not([data-target])', $row);
    }
        
    if ( ! $navs.length ) {
        return;
    }

    $navs.each(function(){
        var $nav = $(this),
            $outer = $nav.closest('.uncode-owl-nav-out'),
            $inner = $nav.find('.uncode-owl-nav-in'),
            $navDots = $('.uncode-nav-dots', $nav),
            $navCounter = $('.uncode-nav-counter', $nav),
            $counterIndex = $('.uncode-nav-counter-index', $navCounter),
            $counterTotal = $('.uncode-nav-counter-total', $navCounter),
            skinInherit = $nav.hasClass('skin-inherit'),
            digit = parseFloat($nav.attr('data-digit')),
            counterDigit = parseFloat($nav.attr('data-counter-digit')),
            navSpeed = parseFloat($carousel.attr('data-navspeed'));
        navSpeed = typeof navSpeed !== 'undefined' && navSpeed !== '' ? navSpeed : 400;

        if ( $nav.hasClass('pos-abs') ){
            if ( ! $carousel.closest('.owl-carousel-wrapper-nav').length ) {
                $carousel.closest('.owl-carousel-wrapper').wrap('<div class="owl-carousel-wrapper-nav" />');
            }
            $carousel.closest('.owl-carousel-wrapper-nav').append($outer);
        } 

        $carousel.on('refreshed.owl.carousel', counter);
        $carousel.on('resized.owl.carousel', counter);
        $carousel.on('changed.owl.carousel', counter);

        var totalSlides = 0;

        function counter(event) {
            if (!event.namespace) {
                return;
            }
            var slides = event.relatedTarget,
                current = slides._current,
                loop = SiteParameters.is_frontend_editor && slides.closest('.uncode-slider').length ? false : slides.settings.loop,
                item = event.item,
                page = event.page,
                countPages = Math.ceil(item.count / page.size),
                $currentSlide = $carousel.find('.owl-item').eq(current),
                itemIndex = Math.floor($currentSlide.attr('data-index')) ,
                activeSlide = Math.ceil(itemIndex / page.size),
                $prev = $nav.find('.uncode-nav-prev'),
                $next = $nav.find('.uncode-nav-next'),
                $col = $currentSlide.find('.uncol').first();

            if ( totalSlides != countPages ) {
                totalSlides = countPages;
                $navDots.html('');
                var nav_html = '';
                for (var sl_ind = 0; sl_ind < countPages; sl_ind++) {
                    var padN = sl_ind+1;
                    if ( digit && digit > 1 ) {
                        padN = String(padN).padStart(digit, '0');
                    }
                    nav_html += '<span class="uncode-nav-index" data-key="' + Math.floor(sl_ind*page.size) + '"><span>' + padN + '</span></span>';
                }
                $navDots.html(nav_html);

                var totalSlidesDigit = totalSlides;

                if ( counterDigit && counterDigit > 1 ) {
                    totalSlidesDigit = String(totalSlidesDigit).padStart(counterDigit, '0');
                }
                $counterTotal.html(totalSlidesDigit);
            }

            if ( loop !== true ) {
                $nav.find('.uncode-nav-disabled').removeClass('uncode-nav-disabled');
                if ( itemIndex === 1 ) {
                    $prev.addClass('uncode-nav-disabled');
                } else if ( ( itemIndex - 1 + page.size ) >= item.count ) {
                    $next.addClass('uncode-nav-disabled');
                    activeSlide = Math.ceil(item.count / page.size);
                }
            }

            $nav.find('.uncode-nav-index').removeClass('active-index').eq(activeSlide-1).addClass('active-index');
            var activeSlideDigit = activeSlide;

            if ( counterDigit && counterDigit > 1 ) {
                activeSlideDigit = String(activeSlideDigit).padStart(counterDigit, '0');
            }
            $counterIndex.html(activeSlideDigit);

            if ( skinInherit ) {
                if ( $col.hasClass('style-light') ){
                    $nav.removeClass('style-dark').addClass('style-light');
                } else if ( $col.hasClass('style-dark') ) {
                    $nav.removeClass('style-light').addClass('style-dark');
                }
            }

            $inner.removeClass('uncode-owl-nav-waiting');

            if ( $nav.hasClass('outer-width') ) {
                var navW = $nav.outerWidth(),
                    nexW = $next.outerWidth(),
                    prevW = $prev.outerWidth(),
                    margins = Math.abs( parseFloat( $next.css('margin-left') ) ) + Math.abs( parseFloat( $next.css('margin-right') ) );

                if ( $nav.hasClass('h-align-justify') ) {
                    $inner.css({'max-width': 'calc(100vw - ' + (nexW + prevW + (margins*2)) + 'px)'});
                    if ( navW + nexW + prevW + (margins*2) > UNCODE.wwidth ) {
                        $inner.css({'margin': 'auto'});
                    } else {
                        $inner.css({'margin': ''});
                    }
                } else {
                    $inner.css({'max-width': 'calc(100vw - ' + (2*(nexW + prevW + margins)) + 'px)'});
                    if ( navW + (2*(nexW + prevW + margins)) > UNCODE.wwidth ) {
                        $inner.css({'margin': 'auto'});
                    } else {
                        $inner.css({'margin': ''});
                    }
                }
            }
        }

        $nav.on('click', '.uncode-nav-index', function(){
            var $bullet = $(this),
                slide_index = parseFloat( $bullet.attr('data-key') );
            $carousel.trigger("to.owl.carousel", [slide_index, navSpeed, true]);
        });
        $nav.on('click', '.uncode-nav-prev', function(){
            $carousel.trigger('prev.owl.carousel', [navSpeed]);
        });
        $nav.on('click', '.uncode-nav-next', function(){
            $carousel.trigger('next.owl.carousel', [navSpeed]);
        });

        if ( $nav.hasClass('animated-arrows') ) {
            $('.uncode-nav-prev, .uncode-nav-next', $nav).on('mouseenter', function(){
                $(this).addClass("hover"); 
            }).on('animationend', function(){
                $(this).removeClass("hover");  
            });
        }

        var positionNav = function(){
            if ( $nav.hasClass('window-width') ) {
                var navOff = parseFloat( $nav.offset().left ) * -1;
                if ( navOff > 0 ) {
                    $inner.css({ transform: 'translateX(' + navOff + 'px)' });
                } else {
                    $inner.css({ transform: 'none' });
                }
            }
        }
        positionNav();
        $(window).on('resize', positionNav);
    });

    $carousel.closest('.owl-carousel-container').find('.uncode-owl-nav').addClass('appended');
};


})(jQuery);
