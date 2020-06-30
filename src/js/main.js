$( document ).ready(function() {

    var $header = $('nav');
    var stickyNavPoint = $header.offset().top + $header.outerHeight() + 200;
    var stickyNavActive = stickyNavPoint + 200;

    window.onscroll = function() {toggleStickyHeader()};

    init();

    


    function init() {
        toggleStickyHeader();
        populateYoutubeVideos();
    }


    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function toggleStickyHeader() {
        if (window.pageYOffset > stickyNavActive && !$header.hasClass("is-sticky hidden")) {
            $header.addClass("is-sticky");
        } else if (window.pageYOffset > stickyNavActive) {
            $header.removeClass("hidden");
        } else if (window.pageYOffset > stickyNavPoint) {
            $header.addClass("is-sticky hidden");
        } else {
            $header.removeClass("is-sticky hidden");
        }
    }

    function populateYoutubeVideos() {

        var _youtubeAPI = 'AIzaSyAlYoM8xuYEYPfIkNhdtTfiSHg7AM91_yw';
        var _youtubeChannelID = 'UCROochQfs2p5KKH-WrFSd5w';
        var _youtubePlayer = null;
        var $youtubeContainers = $('.youtube-container');

        if ($youtubeContainers.length > 0) {
            $.get( "https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&channelId=" + _youtubeChannelID + "&maxResults=" + $youtubeContainers.length + "&key=" + _youtubeAPI, function() {})
            .done(function( data ) {
                if (data.length != 0) {
                    var i = 0;
                    console.log(data);
                    $youtubeContainers.each(function() {
                        $(this).prepend("<div id='youtube-video-" + data.items[i].id.videoId + "'></div>");

                        _youtubePlayer = new YT.Player("youtube-video-" + data.items[i].id.videoId, {
                            width: 530,
                            height: 300,
                            videoId: data.items[i].id.videoId,    
                            playerVars: {
                                modestbranding: true,
                                enablejsapi:    true,
                                rel:            true
                            }
                        });
                        i++;
                    });
                }
            });
        }   
    }
});