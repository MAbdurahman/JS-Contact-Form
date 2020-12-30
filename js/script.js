/* =========================================
           JS-Contact-Form Scripts
============================================ */
$(document).ready(function () {
    const green = '#335536';
    const red = '#9a0220';

    const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;
    const phone_pattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
    const email_pattern = /^[A-Za-z\.\-_0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    const required_message_length = 30;

    let isNameValid = false;
    let isPhoneValid = false;
    let isEmailValid = false;
    let isMessageValid = false;

    //getPrompt function - produces the message at the element id in the specific color
    function getPrompt(message, prompt_location, color) {
        document.getElementById(prompt_location).innerHTML = message;
        document.getElementById(prompt_location).style.color = color;

    } //end of getPrompt function

    /**
     * checkNameInput function - Validates that user has entered a valid first and last
     * name in the specified input field.
     */
    function checkNameInput() {

        let name = $('#contact__form--name').val();
        let message = "";

        if (name.length == 0) {
            message = "Your first and last name is required!";
            isNameValid = false;
            getPrompt(message, "contact__form--name-prompt", red);

            return false;
        }
        if (!name.match(name_pattern)) {
            message = "Enter first and last name only!";
            isNameValid = false;
            getPrompt(message, "contact__form--name-prompt", red);

            return false;
        }

        message = "Welcome " + name;
        isNameValid = true;
        getPrompt(message, "contact__form--name-prompt", green);

        return true;

    } //end of the checkNameInput Function

    /**
     * checkPhoneInput function - Validates that user has entered a valid phone number
     * in the specified input field.
     */
    function checkPhoneInput() {
        var pattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
        //var pattern2 = /^[0-9]{10}$/;
        var message = "";
        var phone = document.getElementById("contact__form--phone-prompt").value;

        if (phone.length == 0) {
            message = "Your phone number is required!";
            getPrompt(message, "contact__form--phone-prompt", "red");
            return false;
        }
        if (!phone.match(pattern)) {
            message = "Preferred pattern is:  123-456-7890!";
            getPrompt(message, "contact__form--phone-prompt", "red");
            return false;
        }
        message = "Valid phone number";
        getPrompt(message, "contact__form--phone-prompt", "green");
        return true;
    }

    //checkEmailInput Function - checks the email input field
    function checkEmailInput() {

        let email = $('#contact__form--email').val();
        let message = "";

        if (email.length == 0) {

            message = "Your email address is required!";
            isEmailValid = false;
            getPrompt(message, "contact__form--email-prompt", red);

            return false;
        }
        if (!email.match(email_pattern)) {

            message = "Invalid email address!";
            isEmailValid = false;
            getPrompt(message, "contact__form--email-prompt", red);

            return false;
        }

        message = "Valid email address";
        isEmailValid = true;
        getPrompt(message, "contact__form--email-prompt", green);

        return true;

    } //end of the checkEmailInput Function

    //checkMessageInput Function - checks the message input field
    function checkMessageInput() {

        let form_message = $("#contact__form--message").val();
        let characters_left = (required_message_length - form_message.length);
        let message = "";

        if (form_message.length < required_message_length) {

            message = characters_left + " more characters required in message!";
            isMessageValid = false;
            getPrompt(message, "contact__form--message-prompt", red);

            return false;

        } else {

            message = "Valid message";
            isMessageValid = true;
            getPrompt(message, "contact__form--message-prompt", green);

            return true;
        }

    } //end of the checkMessageInput Function

    //performValidForm Function -
    function performValidForm() {

        $('#contact__form--submit').val('Valid Form');
        $('#contact__form--submit').addClass('valid');

        $('#error__message').hide(500);
        setTimeout(function () {
            $('#contact__form--submit').val('Sending Message...');
        }, 500);

        $('#contact__form--submit').prop('disable', true);

        if ($('#contact__form--submit').hasClass('valid')) {
            setTimeout(function () {
                $('#contact__form--submit').val('Message Sent');
                $('#success__message').show(1000);
            }, 3000);
        }
    } //end of the performValidForm Function

    //performInvalidForm Function -
    function performInvalidForm() {

        $('#contact__form--submit').val('Check Form & Click Again!');
        $('#contact__form--submit').removeClass('valid');
        updateErrors();
        $('#success__message').hide(250);
        $('#error__message').show(1250);
        $('#error__message').effect('shake', {
            times: 5
        }, 1000);

    } //end of the performInvalidForm Function

    //updateErrors Function -
    function updateErrors() {
        let message = "";
        $('#error__message').html(`<h4>Error!</h4>
                  <p>The following are error(s) in the form:</p>`);

        if (!isNameValid) {
            if ($('#contact__form--name').val().length == 0) {
                $('#error__message').append(`<p>Your first and last name is required!!</p>`);
                message = "Your first and last name is required!";
                getPrompt(message, "contact__form--name-prompt", red);

            } else {
                $('#error__message').append(`<p>Enter first and last name only!!</p>`);
                message = "Enter first and last name only!";
                getPrompt(message, "contact__form--name-prompt", red);

            }
        }
        if (!isEmailValid) {
            if ($('#contact__form--email').val().length == 0) {
                $('#error__message').append(`<p>Your email address is required!!</p>`);
                message = "Your email address is required!";
                getPrompt(message, "contact__form--email-prompt", red);

            } else {
                $('#error__message').append(`<p>Your email address is Invalid!!</p>`);
                message = "Invalid email address!";
                getPrompt(message, "contact__form--email-prompt", red);
            }
        }
        if (!isMessageValid) {
            let characters_left = (required_message_length - $('#contact__form--message').val().length);
            let messageData = characters_left + " more characters required in message!!";

            $('#error__message').append(`<p>${messageData}</p>`);
            message = characters_left + " more characters required in message!";
            getPrompt(message, "contact__form--message-prompt", red);

        }
    } //end of the updateErrors Function

    //checkFormValidation Function -
    function checkFormValidation() {
        if (isNameValid && isEmailValid && isMessageValid) {
            performValidForm();

        } else {
            performInvalidForm();

        }
    } //end of the checkFormValidation Function

    $('#contact__form--name').keyup(checkNameInput);
    $('#contact__form--email').keyup(checkEmailInput);
    $('#contact__form--message').keyup(checkMessageInput);
    $('#contact__form--submit').click(checkFormValidation);

});