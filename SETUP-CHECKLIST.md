# Website Administrator Setup Checklist

## FormSubmit.co Activation (Required for Contact & Donation Forms)

### ⚠️ Important: One-Time Setup Required

The contact and donation forms on this website use FormSubmit.co, which requires a one-time activation before forms can work properly.

### Setup Steps

**Someone with access to the email `gtadetroitchapter@gmail.com` must complete these steps:**

1. **Test the Contact Form**
   - Go to: https://vadnala.github.io/GTADetroit/contact.html
   - Fill out and submit the contact form with test data
   - You will see a message: "This form needs Activation. We've sent you an email..."

2. **Check Your Email**
   - Check the inbox for gtadetroitchapter@gmail.com
   - **IMPORTANT**: Also check the Spam/Junk folder - FormSubmit emails often go there
   - Look for an email from FormSubmit.co with the subject "Activate Form"

3. **Activate the Form**
   - Open the activation email
   - Click the "Activate Form" button/link in the email
   - You should see a confirmation message

4. **Save the Hash (Recommended)**
   - The activation email contains a unique hash code
   - This hash can be used in place of the email address in forms
   - Save this hash for future reference

5. **Test Both Forms**
   - Test the contact form again - it should now work without showing the activation message
   - Test the donation form at https://vadnala.github.io/GTADetroit/donate.html
   - Both should redirect to their respective success pages

### Troubleshooting

**If the activation email doesn't arrive:**
- Wait 10-15 minutes (sometimes emails are delayed)
- Check spam/junk folder carefully
- Add formsubmit.co to your email's safe sender list
- Try submitting the form again

**If you've lost the activation email:**
- Submit a new test form to trigger a new activation email
- FormSubmit will send a new activation link

### Optional: Use Hash-Based Endpoints (Recommended)

After activation, you can update the forms to use the hash instead of the email:

**Current:**
```html
<form action="https://formsubmit.co/gtadetroitchapter@gmail.com" method="POST">
```

**With Hash:**
```html
<form action="https://formsubmit.co/{your-unique-hash}" method="POST">
```

**Benefits:**
- No activation required for new deployments
- Email address is hidden from public view
- More secure

**To implement:**
1. Get the hash from your activation email
2. Replace `gtadetroitchapter@gmail.com` with the hash in:
   - `/donate.html` (line 53)
   - `/contact.html` (line 115)

### Verification

Once setup is complete:
- [ ] Activation email received and link clicked
- [ ] Contact form works without activation message
- [ ] Donation form works without activation message
- [ ] Both forms redirect to correct success pages
- [ ] Confirmation emails are received (if autoresponse is enabled)

### Support

For issues with FormSubmit.co:
- Documentation: https://formsubmit.co
- FAQ: https://formsubmit.co/#faq

For GTA Detroit website issues:
- Create an issue in this GitHub repository
- Email: gtadetroitchapter@gmail.com
