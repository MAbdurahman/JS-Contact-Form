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

    /**
     * getPrompt Function - produces the message at the element id in the specific color
     */
    function getPrompt(message, prompt_location, color) {
        document.getElementById(prompt_location).innerHTML = message;
        document.getElementById(prompt_location).style.color = color;

    } //end of getPrompt function

    /**
     * checkNameInput function - Validates that user has entered a valid first and last
     * name in the specified input field.
     */
    function checkNameInput() {

        let name = $('#icon_prefix').val();
        let message = "";

        if (name.length === 0) {
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
        let pattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
        let message = "";
        let phone = $('#icon_telephone').val();
        // let phone = document.getElementById("icon_telephone").value;

        if (phone.length === 0) {
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
    }//end of the checkPhoneInput Function

    /**
     * checkEmailInput function - Validates that user has entered a valid email in the
     * specified input field.
     */
    function checkEmailInput() {

        let email = $('#email').val();
        let message = "";

        if (email.length === 0) {

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

    /**
     * checkMessageInput function - Validates that user has entered a valid message with the
     * required characters in the specified input field.
     */
    function checkMessageInput() {

        let form_message = $("#textarea1").val();
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


    /**
     * performValidForm function - Validates that user has entered a valid input in all
     * of the input fields and textarea.
     */
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

            resetForm();
        }

        } //end of the performValidForm Function


        /**
         * performInvalidForm function - performs invalid message when user has entered
         * invalid input in any of  input fields and textarea.
         */
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

        /**
         * updateErrors function - update the message in the error message id when user
         * has entered invalid input in any input fields and textarea.
         */
        function updateErrors() {
            let message = "";
            $('#error__message').html(`<h4>Error!</h4>
                  <p>The following are error(s) in the form:</p>`);

            if (!isNameValid) {
                if ($('#icon_prefix').val().length === 0) {
                    $('#error__message').append(`<p>Your first and last name is required!!</p>`);
                    message = "Your first and last name is required!";
                    getPrompt(message, "contact__form--name-prompt", red);

                } else {
                    $('#error__message').append(`<p>Enter first and last name only!!</p>`);
                    message = "Enter first and last name only!";
                    getPrompt(message, "contact__form--name-prompt", red);

                }
            }
            if (!isPhoneValid) {
                if ($('#icon_telephone').val().length === 0) {


                } else {


                }
            }
            if (!isEmailValid) {
                if ($('#email').val().length === 0) {
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
                let characters_left = (required_message_length - $('#textarea1').val().length);
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

        function resetForm() {
            let message = null;
            let color = null;

            $('#contact__form input[type="text"]').val('').focus(null).removeClass('focus-visible');
            getPrompt(message, "contact__form--name-prompt", color);
            $('#contact__form #name__label').removeClass('active');

            $('#contact__form input[type="tel"]').val('').focus(null).removeClass('focus-visible');
            getPrompt(message, "contact__form--phone-prompt", color);
            $('#contact__form #phone__label').removeClass('active');

            $('#contact__form input[type="email"]').val('').focus(null).removeClass('focus-visible');
            getPrompt(message, "contact__form--email-prompt", color);
            $('#contact__form #email__label').removeClass('active');

            $('#contact__form #textarea1').val('').focus(null).removeClass('focus-visible');
            getPrompt(message, "contact__form--message-prompt", color);
            $('#contact__form #message__label').removeClass('active');

        }

        $('#icon_prefix').keyup(checkNameInput);
        $('#icon_telephone').keyup(checkPhoneInput);
        $('#email').keyup(checkEmailInput);
        $('#textarea1').keyup(checkMessageInput);
        $('#contact__form--submit').click(checkFormValidation);

});