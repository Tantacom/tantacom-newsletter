/*
 CSS Browser Selector js v0.5.3 (July 2, 2013)

 -- original --
 Rafael Lima (http://rafael.adm.br)
 http://rafael.adm.br/css_browser_selector
 License: http://creativecommons.org/licenses/by/2.5/
 Contributors: http://rafael.adm.br/css_browser_selector#contributors
 -- /original --

 Fork project:  http://code.google.com/p/css-browser-selector/
                https://github.com/crucifyer/css-browser-selector
 Song Hyo-Jin (shj at xenosi.de)
 */
function css_browser_selector(n){var b=n.toLowerCase(),f=function(c){return b.indexOf(c)>-1;},h="gecko",k="webkit",p="safari",j="chrome",d="opera",e="mobile",l=0,a=window.devicePixelRatio?(window.devicePixelRatio+"").replace(".","_"):"1";var i=[(!(/opera|webtv/.test(b))&&/msie\s(\d+)/.test(b)&&(l=RegExp.$1*1))?("ie ie"+l+((l==6||l==7)?" ie67 ie678 ie6789":(l==8)?" ie678 ie6789":(l==9)?" ie6789 ie9m":(l>9)?" ie9m":"")):(/trident\/\d+.*?;\s*rv:(\d+)\.(\d+)\)/.test(b)&&(l=[RegExp.$1,RegExp.$2]))?"ie ie"+l[0]+" ie"+l[0]+"_"+l[1]+" ie9m":(/firefox\/(\d+)\.(\d+)/.test(b)&&(re=RegExp))?h+" ff ff"+re.$1+" ff"+re.$1+"_"+re.$2:f("gecko/")?h:f(d)?d+(/version\/(\d+)/.test(b)?" "+d+RegExp.$1:(/opera(\s|\/)(\d+)/.test(b)?" "+d+RegExp.$2:"")):f("konqueror")?"konqueror":f("blackberry")?e+" blackberry":(f(j)||f("crios"))?k+" "+j:f("iron")?k+" iron":!f("cpu os")&&f("applewebkit/")?k+" "+p:f("mozilla/")?h:"",f("android")?e+" android":"",f("tablet")?"tablet":"",f("j2me")?e+" j2me":f("ipad; u; cpu os")?e+" chrome android tablet":f("ipad;u;cpu os")?e+" chromedef android tablet":f("iphone")?e+" ios iphone":f("ipod")?e+" ios ipod":f("ipad")?e+" ios ipad tablet":f("mac")?"mac":f("darwin")?"mac":f("webtv")?"webtv":f("win")?"win"+(f("windows nt 6.0")?" vista":""):f("freebsd")?"freebsd":(f("x11")||f("linux"))?"linux":"",(a!="1")?" retina ratio"+a:"","js portrait"].join(" ");if(window.jQuery&&!window.jQuery.browser){window.jQuery.browser=l?{msie:1,version:l}:{};}return i;};(function(j,b){var c=css_browser_selector(navigator.userAgent);var g=j.documentElement;g.className+=" "+c;var a=c.replace(/^\s*|\s*$/g,"").split(/ +/);b.CSSBS=1;for(var f=0;f<a.length;f++){b["CSSBS_"+a[f]]=1;}var e=function(d){return j.documentElement[d]||j.body[d];};if(b.jQuery){(function(q){var h="portrait",k="landscape";var i="smartnarrow",u="smartwide",x="tabletnarrow",r="tabletwide",w=i+" "+u+" "+x+" "+r+" pc";var v=q(g);var s=0,o=0;function d(){if(s!==0){return;}try{var l=e("clientWidth"),p=e("clientHeight");if(l>p){v.removeClass(h).addClass(k);}else{v.removeClass(k).addClass(h);}if(l==o){return;}o=l;}catch(m){}s=setTimeout(n,100);}function n(){try{v.removeClass(w);v.addClass((o<=360)?i:(o<=640)?u:(o<=768)?x:(o<=1024)?r:"pc");}catch(l){}s=0;}if(b.CSSBS_ie){setInterval(d,1000);}else{q(b).on("resize orientationchange",d).trigger("resize");}})(b.jQuery);}})(document,window);

/*
 * Function viewport()
 *
 * Using this function to ask for width and height to avoid problems with different values
 * on mediaqueries and $(window).width()
 *
 * @return <Object> with two properties: 'width', and 'height'
 * 
 * http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
*/
function viewport(){
  var e = window,
      a = 'inner';
  if ( !( 'innerWidth' in window ) ) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
var vp = viewport();

var TABLET = 768,
    DESKTOP = 960,
    DESKTOP2 = 1200;

var mantenimientoEFL = function(){
  var priv = {
    news : function() {
      var items = [];
      var months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
      $.getJSON( "http://blog.efl.es/wp-json/tnt-info/v1/ultimas", function( data ) {
        if(data.length>=1){
          items.push(
            '<section class="news">' + 
              '<p class="title">También puede interesarte:</p>' + 
              '<ul>'
          );
          $.each( data, function( key, val ) {
            var date = val.post_date.split("-");
            var day = date[2].split(" ");
            items.push( 
              '<li id="' + key + '">' + 
                '<div class="date">' + 
                    '<span class="day">' + day[0] + '</span>' + 
                    '<span class="date_group">' + 
                      '<span class="month">' + months[date[1]-1] + '</span>' + 
                      '<span class="year">' + date[0] + '</span>' + 
                    '</span>' + 
                '</div>' + 
                '<div class="text">' + 
                  '<p class="post_title"><a href="' + val.guid + '">' + val.post_title + '</a></p>' + 
                  '<p class="post_excerpt">' + val.post_excerpt + '</p>' + 
                '<div>' + 
              '</li>'
            );
          });
          items.push('</ul></section>');
        $("main.bodyContent").append(items.join(""));
      }
      });
    }
  };

  var pub = {        
    news : function(){
      priv.news();
    }                
  };

  return { // métodos que queramos devolver como públicos
    news: pub.news
  }

}();
jQuery(document).ready(function() {    
  mantenimientoEFL.news();
})