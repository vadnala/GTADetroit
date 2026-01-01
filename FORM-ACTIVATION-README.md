# Form Activation Guide for FormSubmit.co

## Overview
This website uses [FormSubmit.co](https://formsubmit.co) for handling form submissions on both the Contact page and Donation page. FormSubmit is a free service that forwards form submissions to a specified email address.

## Activation Requirement

### First-Time Setup
When using FormSubmit.co for the first time with a new email address, the service requires one-time activation:

1. **Initial Submission**: The first time someone submits a form to a new email address, FormSubmit.co will display an activation message instead of processing the form.

2. **Activation Email**: FormSubmit sends an activation email to the specified address (gtadetroitchapter@gmail.com) with a confirmation link.

3. **Activation**: Someone with access to that email account must click the activation link.

4. **Completion**: After activation, ALL future forms using that email address will work immediately without requiring activation again.

## Current Configuration

### Contact Form (`contact.html`)
- **Email**: gtadetroitchapter@gmail.com
- **Captcha**: Disabled
- **Auto-response**: Enabled
- **Redirect**: No (uses FormSubmit default)

### Donation Form (`donate.html`)
- **Email**: gtadetroitchapter@gmail.com
- **Captcha**: Disabled
- **Auto-response**: Enabled
- **Redirect**: Yes (to pledge-success.html)

## Troubleshooting Activation Issues

### "No Activation Email Received"
If the activation email is not received:

1. **Check Spam/Junk Folder**: FormSubmit emails often get filtered as spam
2. **Wait**: Sometimes emails can be delayed by 5-10 minutes
3. **Check Email Address**: Verify gtadetroitchapter@gmail.com is correct and accessible
4. **Whitelist FormSubmit**: Add formsubmit.co to your email's safe sender list

### Alternative: Use Hash-Based Endpoint
After activating your email, FormSubmit provides a unique hash that can be used instead of the email address in the form action URL:

**Format**: `https://formsubmit.co/{your-unique-hash}`

**Benefits**:
- No activation required for new forms
- Hides email address from page source
- More secure

**How to Get Hash**:
1. Activate your email address (one-time)
2. Check your activation email for the unique hash
3. Replace the email in form action with the hash

### Example Hash Implementation
```html
<!-- Before (email-based) -->
<form action="https://formsubmit.co/gtadetroitchapter@gmail.com" method="POST">

<!-- After (hash-based) -->
<form action="https://formsubmit.co/abc123def456..." method="POST">
```

## Recommended Solution

The optimal setup is to:
1. Activate the email address once by submitting a test form and clicking the activation link
2. Use the provided hash in all form actions
3. This eliminates the activation message for all future users

## Support

For FormSubmit.co issues:
- Documentation: https://formsubmit.co
- Support: Contact FormSubmit directly through their website

For GTA Detroit website issues:
- Email: gtadetroitchapter@gmail.com
