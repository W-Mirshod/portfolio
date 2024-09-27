$(document).ready(function () {
    // typing animation
    (function ($) {
        $.fn.writeText = function (content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function () {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };
    })(jQuery);

    // input text for typing animation
    $("#holder").writeText("SOFTWARE ENGINEER / DJANGO BACKEND DEVELOPER");

    // initialize wow.js
    new WOW().init();

    // Push the body and the nav over by 285px over
    var main = function () {
        $(".fa-bars").click(function () {
            $(".nav-screen").animate(
                {
                    right: "0px"
                },
                200
            );

            $("body").animate(
                {
                    right: "285px"
                },
                200
            );
        });

        // Then push them back */
        $(".fa-times").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                200
            );

            $("body").animate(
                {
                    right: "0px"
                },
                200
            );
        });

        $(".nav-links a").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                500
            );

            $("body").animate(
                {
                    right: "0px"
                },
                500
            );
        });
    };

    $(document).ready(main);

    // initiate full page scroll

    $("#fullpage").fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ["home", "about", "portfolio", "contact", "connect"],
        anchors: ["home", "about", "portfolio", "contact", "connect"],
        menu: "#myMenu",
        fitToSection: false,

        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            if (index == 1) {
                /* add opacity to arrow */
                $(".fa-chevron-down").each(function () {
                    $(this).css("opacity", "1");
                });
                $(".header-links a").each(function () {
                    $(this).css("color", "white");
                });
                $(".header-links").css("background-color", "transparent");
            } else if (index != 1) {
                $(".header-links a").each(function () {
                    $(this).css("color", "black");
                });
                $(".header-links").css("background-color", "white");
            }

            //using index
            if (index == 2) {
                /* animate skill bars */
                $(".skillbar").each(function () {
                    $(this)
                        .find(".skillbar-bar")
                        .animate(
                            {
                                width: $(this).attr("data-percent")
                            },
                            2500
                        );
                });
            }
        }
    });

    // move section down one
    $(document).on("click", "#moveDown", function () {
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on("click", "#skills", function () {
        $.fn.fullpage.moveTo(2);
    });

    $(document).on("click", "#projects", function () {
        $.fn.fullpage.moveTo(3);
    });

    $(document).on("click", "#contact", function () {
        $.fn.fullpage.moveTo(4);
    });

    // smooth scrolling
    $(function () {
        $("a[href*=#]:not([href=#])").click(function () {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html,body").animate(
                        {
                            scrollTop: target.offset().top
                        },
                        700
                    );
                    return false;
                }
            }
        });
    });

    // ajax form
    $(function () {
        // Get the form and the messages div.
        var form = $("#ajax-contact");
        var formMessages = $("#form-messages");

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: formData
            })
                .done(function () {
                    // Set success message and class.
                    $(formMessages).removeClass("error").addClass("success")
                        .text("Your message has been successfully sent!");

                    // Clear the form fields.
                    $("#name").val("");
                    $("#email").val("");
                    $("#message").val("");

                    // Remove the message after 5 seconds.
                    setTimeout(function () {
                        $(formMessages).text("").removeClass("success");
                    }, 5000);
                })
                .fail(function (data) {
                    // Set error message and class.
                    $(formMessages).text("Oops! An error occurred, and your message could not be sent.");

                    // Remove the message after 5 seconds.
                    setTimeout(function () {
                        $(formMessages).text("").removeClass("error");
                    }, 5000);
                });
        });
    });
});
