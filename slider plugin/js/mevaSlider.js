
(function($){
    $.fn.mevaSlider = function(options){
        var opt = {
            'width': '908px', 
            'height': '540px',
            'position': 'bottom', 
            'bullets': false, 
            'auto': true, 
            'autoSpeed': 4000,
            'fadeSpeed': 1000,
        }
        
        return this.each(function() {        
            if (options) { 
                $.extend(opt, options);
            }
            $(this).children().wrapAll('<div class="mevaSlide" />'); 
            var container = $(this).find('.mevaSlide'); 
            container.find('img').wrapAll('<div class="wrapper" />'); 
            var wrapper = container.find('.wrapper');
            wrapper.append('<a href="#" class="prev">Prev</a><a href="#" class="next">Next</a>'); 
            switch (opt.position) { 
                case 'top': container.prepend('<div class="nav" />'); break; 
                case 'bottom': container.append('<div class="nav" />'); break; 
            };
            var nav = container.find('.nav'); 
            wrapper.find('img').each(function(i){ 
                i += 1; 
                if (opt.bullets === true) { 
                        nav.append('<a href="#">'+ i +'</a>'); 
                } 
            });
            var mySlider = function(){ 
 
                this.imgs = wrapper.find('img'); 
                this.imgCount = (this.imgs.length) - 1; 
                this.navPrev = wrapper.find('a.prev'); 
                this.navNext = wrapper.find('a.next'); 
                this.bullets = container.find('.nav a'); 
                this.getCurrentIndex = function(){ 
                    return this.imgs.filter('.current').index(); 
                }; 
                this.go = function(index){ 
                    this.imgs 
                        .removeClass('current') 
                        .fadeOut(opt.fadeSpeed) 
                        .eq(index) 
                        .fadeIn(opt.fadeSpeed) 
                        .addClass('current'); 
                    this.bullets 
                        .removeClass('current') 
                        .eq(index) 
                        .addClass('current'); 
                };
                this.next = function(){ 
                    var index = this.getCurrentIndex(); 
                    if (index < this.imgCount) { 
                        this.go(index + 1); 
                    } else { 
                        this.go(0); 
                    } 
                }; 
                this.prev = function(){ 
                    var index = this.getCurrentIndex(); 
                    if (index > 0) { 
                        this.go(index - 1); 
                    } else { 
                        this.go(this.imgCount); 
                    } 
                };
                this.init = function(){ 
                    wrapper
                        .width(opt.width)
                        .height(opt.height);
                    this.imgs
                        .width(opt.width)
                        .height(opt.height);
                     
                    this.imgs.hide().first().addClass('current').show(); 
                    this.bullets.first().addClass('current');
                    nav.width(opt.width);
                };     
            };
            var slider = new mySlider();
            slider.init();
            
            wrapper.hover(function(){ 
                slider.navNext.stop(true, true).fadeToggle();
                slider.navPrev.stop(true, true).fadeToggle();
            });
            slider.navNext.click(function(e){ 
                e.preventDefault();
                slider.next(); 
            });
            slider.navPrev.click(function(e){
                e.preventDefault();
                slider.prev();
            });
            slider.bullets.click(function(e){
                e.preventDefault();
                slider.go($(this).index());
            });

            if (opt.auto === true) {
                var timer = function(){
                        slider.next();
                };
                var interval = setInterval(timer, opt.autoSpeed);
                wrapper.hover(function(){clearInterval(interval);}, function(){interval=setInterval(timer, opt.autoSpeed);});
                slider.bullets.click(function(){clearInterval(interval); interval=setInterval(timer, opt.autoSpeed);});
            }

        });
    };
})(jQuery);