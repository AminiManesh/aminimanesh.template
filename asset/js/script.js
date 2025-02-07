$(document).on("load", function () {
    $(window).bind("resize", SetupCarousel);
});


function workBody() {
    const hoverMediaQuery = window.matchMedia('(hover: hover)');
    if (hoverMediaQuery.matches) {
        console.log("match media");
        $(".work-body").each(function () {
            $(this).css("bottom", (-$(this).outerHeight() + "px"));
        });
    }
}

function getProjects(categoryId = 0) {
    console.log("get projects, categoryId = " + categoryId);
    $("#projectsList").load('/project/GetProjects?categoryId=' + categoryId, function () {
        workBody();
        initFancyBox();
    });
}

function initFancyBox() {
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
}

function toggleDes(el) {
    $(".description-box .description").toggleClass("closed");
    if (el.innerHTML === "بیشتر") {
        el.innerHTML = "کمتر";
    } else {
        el.innerHTML = "بیشتر";
    }
}

$(document).ready(async function () {

    var speechs = [
        "من برنامه نویس سی‌شارپ هستم.",
        "من Back-End Developer هستم.",
        "من سایتی که می‌خوای رو به بهترین شکل پیاده سازی می‌کنم."
    ];
    typer(speechs);

    $('*').persiaNumber();
    $('#copyright').text(new Date().getFullYear());

    $('#open-menu').click(function (e) {
        ToggleMainMenu();
    });

    $('.open-sidebar').click(function (e) {
        $('.sidebar').toggleClass('opened');
    });

    $('.dark-overlay').click(function (e) {
        if ($('.main-menu').hasClass('opened')) {
            CloseMainMenu();
        }
    });

    $('.lang-progress').css("background", function () {
        return "radial-gradient(closest-side, #20202a 84%, transparent 85% 100%), conic-gradient(#ffc107 " + $(this).attr("aria-valuenow") + "%, #191923 0)";
    });

    $('.skill-bar div').css("width", function () {
        return $(this).parent().attr("aria-valuenow") + "%";
    });

    $('#navigation a').click(function (e) {
        CloseMainMenu();
    });

    $('.send-message .input-box .inputter').on(
        {
            focus: function () {
                $(this).prev()
                    .css({
                        "background": "#ffc107",
                        "color": "#000000"
                    })
            },
            focusout: function () {
                $(this).prev()
                    .css({
                        "background": "#20202a",
                        "color": "#8c8c8e"
                    })
            }
        }
    );

    $('.owl-carousel').owlCarousel({
        items: 1,
        margin: 30,
        center: false,
        slideTransition: "ease",
        nav: true,
        dots: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            992: {
                items: 1
            },
            1200: {
                items: 2
            },
            1400: {
                items: 3
            }
        }
    });

    initFancyBox();
    getProjects();

});

SetupCarousel();

$(window).resize(function (event) {
    event.preventDefault();
    SetupCarousel();
});

// Functions

function SetupCarousel() {
    $('.owl-dot').html("");

    var rightIcon = document.createElement("i");
    $(rightIcon).addClass("bi bi-chevron-right");
    $('.owl-nav > .owl-next').html(rightIcon);

    var leftIcon = document.createElement("i");
    $(leftIcon).addClass("bi bi-chevron-left");
    $('.owl-nav > .owl-prev').html(leftIcon);
}

function ToggleMainMenu() {
    $('.main-menu').toggleClass('opened');
    if ($('.main-menu').hasClass('opened')) {
        $('.dark-overlay').fadeIn(300);
    }
    else {
        $('.dark-overlay').fadeOut(300);
    }
}

function CloseMainMenu() {
    $('.main-menu').removeClass('opened');
    $('.dark-overlay').fadeOut(300);
}

async function typer(speechs) {
    for (let i = 0; i < speechs.length; i++) {
        await writeCode(speechs[i]);
        await delay(1500);
        await clearCode(speechs[i]);
    }
    typer(speechs);
}

async function writeCode(text) {
    var now = "";
    for (let j = 0; j < text.length; j++) {
        await delay(100);
        now += text[j];
        $('.code>.speech').text(now);
    }
}

async function clearCode(text) {
    var now = text;
    for (let i = text.length; i > -1; i--) {
        await delay(40);
        now = text.substring(0, i);
        $('.code>.speech').text(now);
        if (i == 0) {
            await delay(750);
        }
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}