(function($) {
    $(window).on("load", function() {
        $('#status').fadeOut();
        $('#preloader').delay(300).fadeOut('slow');
    });
    $(document).ready(function() {
        $('li a[href*="#"]').on('click', function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({ scrollTop: $(anchor.attr('href')).offset().top }, 1000);
            e.preventDefault();
        });
        $(window).on("scroll", function() {
            if ($(this).scrollTop() > 100) {
                $('.scroll-up').fadeIn();
            } else {
                $('.scroll-up').fadeOut();
            }
        });
        $('.header').sticky({ topSpacing: 0 });
        $('body').scrollspy({ target: '.navbar-custom', offset: 70 });
        $(function() {
            $('#cbp-qtrotator').cbpQTRotator();
        });
        $('.screen-height').height($(window).height());
        $(window).on("resize", function() {
            $('.screen-height').height($(window).height());
        });
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('#home').css({ 'background-attachment': 'scroll' });
        } else {
            // $('#home').each(function(){
            //     $(this).parallax("50%", 0.1); 
            //  });
            //$('#home').parallax('50%', 0.1);
        }
        wow = new WOW({ mobile: false });
        wow.init();

        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(
                /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
            );
            return pattern.test(emailAddress);
        }

        var frm = $('#contact-form');

        frm.submit(function(e) {
            e.preventDefault();
            var c_name = $('#c_name').val();
            var c_email = $('#c_email').val();
            var c_message = $('#c_message ').val();
            var response = $('#contact-form .ajax-response');

            if (c_name === '' || c_email === '' || c_message === '' || !isValidEmailAddress(c_email)) {
                response.fadeIn(500);
                response.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
            } else {
                $('.spinner').show()
                $.ajax({
                    url: 'https://emailsenderapi.azurewebsites.net/api/email/send',
                    method: 'POST',
                    data: {
                        ToEmail: 'rabbyalone@gmail.com',
                        Subject: c_name,
                        Body: 'Email From: ' +
                            c_email + 'Message: ' + c_message
                    },
                    dataType: 'json'
                }).done(function(data) {
                    $("#alertsuccess").css("display", "block")
                    response.html('<i class="fa fa-check"></i> ' + data.msg);
                    $('.spinner').hide()
                    c_name.val('')
                    c_email.val('')
                    c_message.val('')

                }).fail(function(jqXHR, textStatus) {
                    $("#alertwarning").css("display", "block")
                    response.html('<i class="fa fa-warning"></i> Something went wrong! Please email at <b>rabbyalone@gmail.com</b>');
                    $('.spinner').hide()
                });
            }
        });
    });
})(jQuery);