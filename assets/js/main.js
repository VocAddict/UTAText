//toLink.js
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
if (isIE !== true && isEdge !== true && isSafari !== true) {
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
            });
		});
    });
} else if (isIE !== true) {
	document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
		anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView();
		});
    });
} else {
    var $root = $('html, body');

    $('a[href^="#"]').click(function () {
        $root.animate({scrollTop: $( $.attr(this, 'href') ).offset().top}, 1);
    
        return false;
    });
}

// toTop.js
var toTopbtn = document.getElementById("toTop");
var isFirefox = typeof InstallTrigger !== 'undefined';
var isIE = /*@cc_on!@*/false || !!document.documentMode;
if (isFirefox !== true || isIE == true) {
	toTopbtn.style.display = "none";
}
	// Scrolling Code
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
        if (isIE !== true) {
            if (isFirefox == true) {
                toTopbtn.style.visibility = "visible";
            } else {
                toTopbtn.style.display = "block";
                toTopbtn.style.visibility = "visible";
            }
        }
    } else if (isFirefox == true) {
        toTopbtn.style.visibility = "hidden";
    } else {
        toTopbtn.style.display = "none"
        toTopbtn.style.visibility = "hidden";
    }
}

    // toTop Code
document.querySelector('button[id="toTop"]').onclick = function topFunction() {
    if (isIE !== true && isEdge !== true && isSafari !== true) {  
        // Method 1
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 10) {
            window.requestAnimationFrame(topFunction);
            window.scrollTo(0, c - c / 8);
        }
        // history.pushState("", document.title, window.location.origin + window.location.pathname + window.location.search);
    } else if (isIE !== true) {
        //Method 3
        document.body.scrollTop = 10; // For Safari
        document.documentElement.scrollTop = 10; // For Chrome, Firefox, IE and Opera
        // history.pushState("", document.title, window.location.origin + window.location.pathname + window.location.search);
    }
}

// sharing.js
// Minimum - https://codepen.io/adamcoti/pen/qrobLZ
// Share API - https://codepen.io/ayoisaiah/pen/YbNazJ

window.onload = setShareLinks;
const shareButton = document.querySelector('.share-button');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');

function setShareLinks() {
    var title = encodeURIComponent(document.title);
    var pageUrl = document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']").href : document.location.href;
    var pageUrl = encodeURIComponent(pageUrl);
    var description = document.querySelector("meta[name='description']").getAttribute("content");
    var description = encodeURIComponent(description);

    elements = document.querySelectorAll(".social-share.facebook");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = "https://www.facebook.com/sharer.php?u=" + pageUrl;
            socialWindow(url);
        });
    });

    elements = document.querySelectorAll(".social-share.twitter");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = "https://twitter.com/intent/tweet?url=" + pageUrl + "&text=" + description;
            socialWindow(url);
        });
    });

    // elements = document.querySelectorAll(".social-share.linkedin");
    // Array.prototype.forEach.call(elements, function(el) {
    //     el.addEventListener("click", function() {
    //         url = "https://www.linkedin.com/shareArticle?mini=true&url=" + pageUrl;
    //         socialWindow(url);
    //     });
    // });

    elements = document.querySelectorAll(".social-share.email");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = "mailto:?to=&subject=" + title + "&body=" + pageUrl;
            // emailWindow(url);
            window.location.href = url;
        });
    });

    elements = document.querySelectorAll(".social-share.clipboard");
    Array.prototype.forEach.call(elements, function(el) {
        el.addEventListener("click", function() {
            url = pageUrl;
            clipboard(url);
        });
    });
};

function socialWindow(url) {
    var left = (screen.width - 570) / 2;
    var top = (screen.height - 570) / 2;
    var params = "menubar=no,toolbar=no,status=no,width=570,height=570,top=" + top + ",left=" + left;
    window.open(url,"NewWindow",params);
};

function clipboard(url) {
    // https://codepen.io/DeanMarkTaylor/pen/RMRaJX?editors=1011
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript#30810322

    function fallbackCopyToClipboard(url) {
        var textArea = document.createElement("textarea");

        //
        // *** This styling is an extra step which is likely not required. ***
        //
        // Why is it here? To ensure:
        // 1. the element is able to have focus and selection.
        // 2. if element was to flash render it has minimal visual impact.
        // 3. less flakyness with selection and copying which **might** occur if
        //    the textarea element is not visible.
        //
        // The likelihood is the element won't even render, not even a
        // flash, so some of these are just precautions. However in
        // Internet Explorer the element is visible whilst the popup
        // box asking the user for permission for the web page to
        // copy to the clipboard.
        //
      
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
      
        // Ensure it has a small width and height. Setting to 1px / 1em
        // doesn't work as this gives a negative w/h on some browsers.
        textArea.style.width = '2em';
        textArea.style.height = '2em';
      
        // We don't need padding, reducing the size if it does flash render.
        textArea.style.padding = 0;
      
        // Clean up any borders.
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
      
        // Avoid flash of white box if rendered for any reason.
        textArea.style.background = 'transparent';

        textArea.value = url;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }

    // copyTextToClipboard(url);
    if (!navigator.clipboard) {
        fallbackCopyToClipboard(url);
        return;
    }

    navigator.clipboard.writeText(url).then(
        function() {
            console.log("Async: Copying to clipboard was successful!");
        },
        function(err) {
            console.error("Async: Could not copy text: ", err);
        }
    );
}

if (shareButton !== null) {
    shareButton.addEventListener('click', function (event) {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: document.querySelector("link[rel='canonical']") ? document.querySelector("link[rel='canonical']").href : document.location.href
            }).then(function () {
                console.log('Thanks for sharing!');
            }).catch(function (error) {
                return console.log('Error sharing', error);
            });
        } else {
            $('#shareDialog').modal('show')
            
        }
    });

    closeButton.addEventListener('click', function (event) {
        $('#shareDialog').modal('hide')
    });
}