$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {},
        submitSuccess: function ($form, event) {
            event.preventDefault();
            
            let name = $("input#name").val();
            let email = $("input#email").val();
            let subject = $("input#subject").val();
            let message = $("textarea#message").val();
            let $this = $("#sendMessageButton"); // Corrected variable declaration

            $this.prop("disabled", true);

            $.ajax({
                url: "contact.php", // Ensure this file exists
                type: "POST",
                data: { name, email, subject, message },
                cache: false,
                success: function () {
                    $("#success").html("<div class='alert alert-success'>")
                        .find(".alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append("<strong>Your message has been sent. </strong>")
                        .append("</div>");
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    $("#success").html("<div class='alert alert-danger'>")
                        .find(".alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append($("<strong>").text("Sorry " + name + ", our mail server is not responding. Please try again later!"))
                        .append("</div>");
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(() => { $this.prop("disabled", false); }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        }
    });

    $("a[data-toggle=\"tab\"]").on("click", function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$("#name").on("focus", function () {
    $("#success").html("");
});
