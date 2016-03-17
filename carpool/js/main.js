/*
 * Startup
 * Copyright 2015, Binh Nguyen, Carpool Agency
 * http://carpoolagency.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Date: Friday Oct 16 2015
 */

// Footer Navigation binding
var showMessageForm = function ( ) {
    // Do nothing if whole top footer not showing
    if ( $( '.footerTopContainer' )
        .css( 'position' ) === "fixed" ) {
        return;
    }

    if ( $( ".footer .footerTopContainer .textBottom .tableText" )
        .text( ) === "Stalk us on Instagram. We don't mind." ) {
        $( ".footer .footerTopContainer .textBottom .tableText" )
            .fadeOut( 200, function ( ) {
                $( this )
                    .text( "Send us a love letter" )
                    .fadeIn( 200 );
            } );
    }
    if ( $( ".footer .messageFormBackground" )
        .is( ':hidden' ) ) {
        $( ".footer .messageFormBackground" )
            .slideDown( 200 );
    }
    $( ".footerTopContainer" )
        .css( "height", "auto" );
};

var hideMessageForm = function ( ) {
    if ( $( ".footer .footerTopContainer .textBottom .tableText" )
        .text( ) === "Send us a love letter" ) {
        $( ".footer .footerTopContainer .textBottom .tableText" )
            .fadeOut( 200, function ( ) {
                $( this )
                    .text( "Stalk us on Instagram. We don't mind." )
                    .fadeIn( 200 );
            } );
    }

    if ( $( ".footer .messageFormBackground" )
        .is( ':visible' ) ) {
        $( ".footer .messageFormBackground" )
            .slideUp( 200 );
    }
    $( ".footerTopContainer" )
        .css( "height", "auto" );
};

var showContactFormDropdown = function ( ) {
    hideLocationDropdown( );
    $( ".footer .contactFormDropdownContainer" )
        .slideDown( 200 );
    $( '.contactName' ).focus();
    $( 'html,body' )
        .animate( {
            scrollTop: $( "footer.footer" )
                .offset( )
                .top
        }, 200, function ( ) {
            isScrollingAnimation = false;
        } );
};

var hideContactFormDropdown = function ( ) {
    $( ".footer .contactFormDropdownContainer" )
        .slideUp( 200 );
};

var showLocationDropdown = function ( ) {
    hideContactFormDropdown( );
    $( ".footer .locationDropdownContainer" )
        .slideDown( 200 );
    $( 'html,body' )
        .animate( {
            scrollTop: $( "footer.footer" )
                .offset( )
                .top
        }, 200, function ( ) {
            isScrollingAnimation = false;
        } );
};

var hideLocationDropdown = function ( ) {
    $( ".footer .locationDropdownContainer" )
        .slideUp( 200 );
};

$( function ( ) {
    // IE scrolling override for smooth fixed position background effect
    if ( navigator.userAgent.match( /Trident\/7\./ ) ) {
        $( 'body' )
            .on( "mousewheel", function ( ) {
                event.preventDefault( );

                var wheelDelta = event.wheelDelta;

                var currentScrollPosition = window.pageYOffset;
                window.scrollTo( 0, currentScrollPosition - wheelDelta );
            } );

        $( 'body' )
            .keydown( function ( e ) {

                var currentScrollPosition = window.pageYOffset;

                switch ( e.which ) {

                    case 38: // up
                        e.preventDefault( ); // prevent the default action (scroll / move caret)
                        window.scrollTo( 0, currentScrollPosition - 120 );
                        break;

                    case 40: // down
                        e.preventDefault( ); // prevent the default action (scroll / move caret)
                        window.scrollTo( 0, currentScrollPosition + 120 );
                        break;

                    default:
                        return; // exit this handler for other keys
                }
            } );
    }

    var currentPage = "";
    var isWelcomePage = false;
    var isAboutPage = false;
    var isArticlePage = false;
    var isScrollingAnimation = false;
    var isScrollingToSubSection = false;

    // Set the active class for the navigation
    // Parameter is the href attribute for the navigation to be active
    var activeNavAnchors = function ( href ) {
        if ( $( ".pageNavLink.active" )
            .length > 0 ) {
            $( ".pageNavLink.active" )
                .removeClass( "active" );
        }
        $( ".pageNavLink[href='" + href + "']" )
            .addClass( "active" );
    };

    // Check the page
    if ( $( "#welcome" )
        .length > 0 ) {
        currentPage = "welcome";
        isWelcomePage = true;
        if ( window.location.hash === "#approach" ) {
            activeNavAnchors( "/#approach" );
        } else if ( window.location.hash === "#approached" ) {
            isScrollingAnimation = true;
            isScrollingToSubSection = true;
            activeNavAnchors( "/#approach" );
            window.location.hash = '';
            $( 'html,body' )
                .animate( {
                    scrollTop: $( "#approach" )
                        .offset( )
                        .top
                }, 500, function ( ) {
                    isScrollingAnimation = false;
                    isScrollingToSubSection = false;
                } );
        }
        // Arrow alignment on chrome
        if ( navigator.userAgent.toLowerCase( )
            .indexOf( 'chrome' ) > -1 ) {
            $( "#setUpConvoButton .buttonInnerText" )
                .addClass( "top-neg-1" );
        }
    } else if ( $( "#about" )
        .length > 0 ) {
        currentPage = "about";
        isAboutPage = true;
    } else if ( $( "#work" )
        .length > 0 ) {
        currentPage = "work";
    } else if ( $( "#thoughts" )
        .length > 0 ) {
        currentPage = "thoughts";

        // Hide extra post for LoadMore function
        var $postList = $( ".postList li" );
        if ( $postList.length < 4 ) { // Hide the loadMore if there is less than 4 posts
            $( ".loadMoreArticlesContainer" )
                .hide( );
        } else { // Bind click on loadMore to show all post
            $( ".loadMoreArticles" )
                .unbind( 'click' )
                .bind( 'click', function ( ) {
                    $postList.show( );
                    $( ".loadMoreArticlesContainer" )
                        .hide( );
                } );
        }
    } else if ( $( "#connect" )
        .length > 0 ) {
        currentPage = "connect";
    } else if ( $( "#postArticle" )
        .length > 0 ) {
        currentPage = "postArticle";
        isArticlePage = true;
    }

    // Down Arrow click event
    $( ".topMediaContainer .downArrow" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            $( 'html,body' )
                .animate( {
                    scrollTop: $( ".topMediaContainer" )
                        .height( ) - 66
                }, 1000, function ( ) {
                    isScrollingAnimation = false;
                } );
            return;
        } );

    // Down Arrow Text (on Thoughts Page)
    $( ".topMediaContainer .downArrowText" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            $( 'html,body' )
                .animate( {
                    scrollTop: $( ".topMediaContainer" )
                        .height( ) - 66
                }, 1000, function ( ) {
                    isScrollingAnimation = false;
                } );
            return;
        } );

    // TODO: ask if we still need this, hard to see.
    // TODO: maybe animate
    // Fades opacity of down arrow as scroll position changes.
    // var showArrow = function() {
    //     if ($(".downArrowContainer .downArrowText") && $(".downArrowContainer .downArrowText").css("opacity") === "0.3") {
    //         $(".downArrowContainer .downArrowText").fadeTo(100, 1);
    //     }
    //     if ($(".downArrowContainer .downArrow").css("opacity") === "0.3") {
    //         $(".downArrowContainer .downArrow").fadeTo(100, 1);
    //     }
    // };
    // var blurArrow = function() {
    //     if ($(".downArrowContainer .downArrowText") && $(".downArrowContainer .downArrowText").css("opacity") === "1") {
    //         $(".downArrowContainer .downArrowText").fadeTo(400, 0.3);
    //     }
    //
    //     if ($(".downArrowContainer .downArrow").css("opacity") === "1") {
    //         $(".downArrowContainer .downArrow").fadeTo(400, 0.3);
    //     }
    // };

    // Smooth transition between pages
    // TODO: only the welcome page uses this. Get rid of if we separate this.
    $( ".pageNavLink" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            // Smooth transition to approach on Welcome page
            if ( isWelcomePage && $( this )
                .attr( "href" ) === "/#approach" ) {
                event.preventDefault( );
                isScrollingAnimation = true;
                $( 'html,body' )
                    .animate( {
                        scrollTop: $( "#approach" )
                            .offset( )
                            .top
                    }, 1000, function ( ) {
                        activeNavAnchors( "/#approach" );
                        isScrollingAnimation = false;
                    } );
                return;
            } else if ( !isWelcomePage && $( this )
                .attr( "href" ) === "/#approach" ) {
                event.preventDefault( );
                window.location.href = "/#approached";
                return;
            } else if ( isWelcomePage && $( this )
                .attr( "href" ) === "/" ) {
                event.preventDefault( );
                isScrollingAnimation = true;
                $( 'html,body' )
                    .animate( {
                        scrollTop: 0
                    }, 1000, function ( ) {
                        isScrollingAnimation = false;
                    } );
                return;
            }
        } );

    var upperTopMediaAnchorMark = 300;
    var lowerPageFooterAnchorMark = 100;
    // Scrolling event binding
    $( window )
        .scroll( function ( event ) {
            var self = this;
            var st = $( this )
                .scrollTop( ); // Current page position

            var upperTopMediaAnchor = $( ".topMediaContainer" )
                .height( ) - upperTopMediaAnchorMark;

            var topMediaAnchor = $( ".topMediaContainer" )
                .height( );
            var lowerPageFooterAnchor = $( ".carpool-page" )
                .height( ) - lowerPageFooterAnchorMark;

            if ( st < upperTopMediaAnchor ) { // Top media portion
                if ( isWelcomePage && !isScrollingToSubSection ) {
                    activeNavAnchors( "/" );
                }
            } else if ( st >= upperTopMediaAnchor && st <= topMediaAnchor ) { // Bottom media portion

                if ( isWelcomePage && !isScrollingToSubSection ) {
                    activeNavAnchors( "/" );
                }
            } else if ( ( st > topMediaAnchor && st < lowerPageFooterAnchor ) || st > lowerPageFooterAnchor ) { // Content portion
                // Activate service nav anchor for welcome page
                if ( isWelcomePage ) {
                    activeNavAnchors( "/#approach" );
                }
            }
        } );

    // Contact form
    $( ".welcomeWrapper a" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            event.preventDefault( );
            if ( $( ".footer .contactFormDropdownContainer" )
                .is( ':hidden' ) ) {
                showContactFormDropdown( );
            }
            isScrollingAnimation = true;
            $( 'html,body' )
                .animate( {
                    scrollTop: $( "footer.footer" )
                        .offset( )
                        .top
                }, 1000, function ( ) {
                    isScrollingAnimation = false;
                } );
        } );

    $( "a#connect" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            event.preventDefault( );
            if ( $( ".footer .contactFormDropdownContainer" )
                .is( ':hidden' ) ) {
                showContactFormDropdown( );
            }
            isScrollingAnimation = true;
            $( 'html,body' )
                .animate( {
                    scrollTop: $( "footer.footer" )
                        .offset( )
                        .top
                }, 1000, function ( ) {
                    isScrollingAnimation = false;
                } );
        } );

    $( ".footer .footerEmail" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            event.preventDefault( );
            if ( $( ".footer .contactFormDropdownContainer" )
                .is( ':hidden' ) ) {
                showContactFormDropdown( );
            } else {
                hideContactFormDropdown( );
            }
        } );

    // Location Dropdown
    $( ".footer .footerLocation" )
        .unbind( "click" )
        .bind( "click", function ( event ) {
            event.preventDefault( );
            $( ".footer .footerTopContainer .iconLink" )
                .removeClass( "active" );
            if ( $( ".footer .locationDropdownContainer" )
                .is( ':hidden' ) ) {
                $( ".footer .footerLocation" )
                    .parent( )
                    .addClass( "active" );
                showLocationDropdown( );
            } else {
                hideLocationDropdown( );
            }
        } );

    // Header shrink and logo animation
    $( document )
        .on( "scroll", function ( ) {
            if ( $( document )
                .scrollTop( ) > 100 ) {
                $( ".navContainer" )
                    .addClass( "shrink" );
                $( ".logoContainer" )
                    .addClass( "shrink" );
            } else {
                $( ".navContainer" )
                    .removeClass( "shrink" );
                $( ".logoContainer" )
                    .removeClass( "shrink" );
            }
        } );

    $( '#aboutReadMore' )
        .readmore( );

    var validate = function ( input ) {
        if ( !input || input === "" ) {
            return false;
        }
        return true;
    };

    var displayNotification = function ( message, closeEmail ) {
        $( "#contactFormNotification" )
            .fadeIn( "slow" )
            .find( ".notificationMessage" )
            .text( message );
        setTimeout( function ( ) {
            $( "#contactFormNotification" )
                .fadeOut( "slow", function ( ) {
                    if ( closeEmail ) {
                        hideContactFormDropdown( );
                    }
                } );
        }, 2000 );
    };

    // Contact form
    $( "#contactForm" )
        .submit( function ( event ) {
            var contactName = $( "#contactForm .contactName" )
                .val( );
            var contactEmail = $( "#contactForm .contactEmail" )
                .val( );
            var contactMessage = $( "#contactForm .contactMessage" )
                .val( );
            var gotcha = $( "#contactForm .gotcha" )
                .val( );
            if ( validate( gotcha ) ) {
                gotcha = null;
            }

            event.preventDefault( );
            // validate input
            if ( validate( contactName ) && validate( contactEmail ) && validate( contactMessage ) ) {
                // Ajax call
                /*            $.ajax({
                                url: "//formspree.io/sales@carpoolagency.com",
                                method: "POST",
                                data: {message: contactMessage, name: contactName, _replyto: contactEmail, _gotcha: gotcha}
                            }).done(function() {
                                displayNotification('Thank you! Your message has been sent!', true);
                            });*/
                var xhr = new XMLHttpRequest( );
                xhr.open( 'POST', '//formspree.io/sales@carpoolagency.com', true );
                xhr.setRequestHeader( "Accept", "application/json" )
                xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" )

                xhr.send(
                    "name=" + contactName +
                    "&email=" + contactEmail +
                    "&message=" + contactMessage );

                xhr.onloadend = function ( res ) {
                    if ( res.target.status === 200 ) {
                        displayNotification( 'Thank you! Your message has been sent!', true );
                        //                                    contactForm[ 0 ].innerHTML = '<h3 style="color:white;">Message sent!</h3>';
                    } else {
                        displayNotification( 'There was a comunication error!' );
                        // sendButton[ 0 ].innerHTML = 'Error!';
                    }
                }

            } else {
                displayNotification( 'Please check your inputs and try again!' );
            }
        } );

    // Google Map
    // Enable map events on click
    $('.locationDropdownContainer').click(function () {
        $('.locationDropdownContainer iframe').css("pointer-events", "auto");
    });
    // Disable map events on mouse leave
    $('.locationDropdownContainer').mouseleave(function() { 
        $('.locationDropdownContainer iframe').css("pointer-events", "none");
    });

    // Google Analytics
    ( function ( i, s, o, g, r, a, m ) {
        i[ 'GoogleAnalyticsObject' ] = r;
        i[ r ] = i[ r ] || function ( ) {
            ( i[ r ].q = i[ r ].q || [ ] )
            .push( arguments )
        }, i[ r ].l = 1 * new Date( );
        a = s.createElement( o ),
            m = s.getElementsByTagName( o )[ 0 ];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore( a, m )
    } )( window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga' );

    ga( 'create', 'UA-21234953-1', 'auto' );
    ga( 'send', 'pageview' );
} );
