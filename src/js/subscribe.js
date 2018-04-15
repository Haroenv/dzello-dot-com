export default function() {

  $('a.has-popup').click(function(event) {
    logEvent("SUBSCRIBE_MODAL_OPENED");
    return false;
  });

  $("#subscribe-form").submit((event) => {
    event.preventDefault();

    const email = $("#subscribe-form input[name=email]").val();
    $.ajax({
      url: "https://hooks.zapier.com/hooks/catch/880865/k082dv/",
      method: "POST",
      data: { email },
      success: function() {
        $("#subscribe-form").addClass("status-success");
        $("#subscribe-form .status").append(
          `<p>✅ your ${email.match(/[^@]+$/)[0]} address is subscribed</p>`);
        logEvent("USER_SUBSCRIBED", { email: email });
        analytics.identify(email, { email });
      }
    });
  });
  }
