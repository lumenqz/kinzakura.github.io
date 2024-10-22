$(".custom-select").each(function () {
    var classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
    var template = '<div class="' + classes + '">';
    template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + "</span>";
    template += '<div class="custom-options">';
    $(this).find("option").each(function () {
        template += '<span class="custom-option ' + $(this).attr("class") +
            '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
    });
    template += "</div></div>";
    $(this).wrap('<div class="custom-select-wrapper"></div>');
    $(this).hide();
    $(this).after(template);
});

$(".custom-option:first-of-type").hover(
    function () {
        $(this).parents(".custom-options").addClass("option-hover");
    },
    function () {
        $(this).parents(".custom-options").removeClass("option-hover");
    }
);

$(".custom-select-trigger").on("click", function (event) {
    $("html").one("click", function () {
        $(".custom-select").removeClass("opened");
    });
    $(this).parents(".custom-select").toggleClass("opened");
    event.stopPropagation();
});

$(".custom-option").on("click", function () {
    $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
    $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
    $(this).addClass("selection");
    $(this).parents(".custom-select").removeClass("opened");
    $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});


let isCheckingOverlap = false;

function checkLogoOverlap() {
    if (isCheckingOverlap) return;
    isCheckingOverlap = true;

    const logo = document.querySelector('.logo');
    const form = document.querySelector('.form-container');
    const isMobile = window.innerWidth <= 768;

    if (!logo || !form) {
        isCheckingOverlap = false;
        return;
    }


    if (isMobile) {
        logo.style.display = 'block';
        isCheckingOverlap = false;
        return;
    }


    const logoRect = logo.getBoundingClientRect();
    const formRect = form.getBoundingClientRect();


    const isOverlapping = !(
        logoRect.right < formRect.left ||
        logoRect.left > formRect.right ||
        logoRect.bottom < formRect.top ||
        logoRect.top > formRect.bottom
    );


    if (isOverlapping && logo.style.display !== 'none') {
        logo.style.display = 'none';
    } else if (!isOverlapping && logo.style.display === 'none') {
        logo.style.display = 'block';
    }

    isCheckingOverlap = false;
}


function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}


window.addEventListener('load', checkLogoOverlap);
window.addEventListener('resize', throttle(checkLogoOverlap, 250));


document.addEventListener('DOMContentLoaded', checkLogoOverlap);
