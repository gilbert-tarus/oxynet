from django.core.mail import EmailMessage
from django.shortcuts import render
from django.core.mail import send_mail
from .forms import ContactForm

def base(request):
  return render(request, 'core/base.html')

def index(request):
    message_sent = False

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            phone = form.cleaned_data['phone']

            # Save to database (optional)
            # ContactMessage.objects.create(name=name, email=email, message=message)

            # Send email
            email_message = EmailMessage(
                subject=f"New message from {'name'}",
                body=f"{message} \nPhone: {phone} \nEmail: {email}",
                from_email='tgtarus@gmail.com',
                to=['tgtarus@gmail.com']
            )

            # Set the Reply-To header to the customer's email
            email_message.reply_to = [email]  # Customer's email

            # Send the email
            email_message.send(fail_silently=False)

            # After sending the email
            message_sent = True

            return render(request, 'core/index.html', {
               'form': form,
               'message_sent': message_sent
               })

    else:
        form = ContactForm()
    
    return render(request, 'core/index.html', {'form': form})

