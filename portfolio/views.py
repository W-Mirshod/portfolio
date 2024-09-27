from datetime import datetime

import requests
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.http import JsonResponse
from django.shortcuts import render
from user_agents import parse

from portfolio.forms import ContactForm
from portfolio.models import RequestsLog, Skills, Projects
from root.settings import DEFAULT_FROM_EMAIL

import requests
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from .models import Skills, Projects
from .forms import ContactForm


def validate_recaptcha(recaptcha_response):
    """
    Validate reCAPTCHA response with Google's API.
    """
    data = {
        'secret': settings.RECAPTCHA_SECRET_KEY,
        'response': recaptcha_response
    }
    url = 'https://www.google.com/recaptcha/api/siteverify'
    r = requests.post(url, data=data)
    result = r.json()
    return result.get('success', False)


def home(request):
    skills = Skills.objects.all()
    projects = Projects.objects.filter(is_active=True)
    form = ContactForm()

    if request.method == 'POST':
        form = ContactForm(request.POST)

        recaptcha_response = request.POST.get('g-recaptcha-response')

        if not validate_recaptcha(recaptcha_response):
            return JsonResponse("reCAPTCHA should be completed", safe=False, status=400)

        if form.is_valid():
            form.save()
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']

            sending_email(name, email)

            return JsonResponse({'success': True,
                                 'message': 'Your message was sent successfully!'})
        else:
            return JsonResponse({'success': False}, status=400)

    send_sms(request, 'Home Page')

    context = {'skills': skills,
               'projects': projects,
               'form': form}

    return render(request, 'index.html', context)


def send_sms(entered_request, in_url):
    x_forwarded_for = entered_request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip_address = x_forwarded_for.split(',')[0]
    else:
        ip_address = entered_request.META.get('REMOTE_ADDR')

    # Get user agent string and parse it
    user_agent_string = entered_request.META.get('HTTP_USER_AGENT', '')
    user_agent = parse(user_agent_string)

    current_time = datetime.now()

    RequestsLog.objects.create(
        ip_address=ip_address,
        browser=user_agent.browser.family,
        os=user_agent.os.family,
        device_type=user_agent.device.family,
        is_mobile=user_agent.is_mobile,
        is_tablet=user_agent.is_tablet,
        is_pc=user_agent.is_pc,
        referred_to=in_url,
        request_time=current_time)


def sending_email(name, gmail):
    subject = f"To {name} From W-Mirshod.com"
    from_email = DEFAULT_FROM_EMAIL
    to = [f'{gmail}']

    # HTML content only
    html_content = """
        <html>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <header style="text-align: center; border-bottom: 1px solid #dddddd; padding-bottom: 10px; margin-bottom: 20px;">
                        <h1 style="font-size: 24px; color: #333333; margin: 0;">Welcome to W-Mirshod</h1>
                    </header>
                    
                    <section style="color: #555555;">
                        <h3 style="font-size: 20px; color: #333333;">Hello,</h3>
                        <p>Thank you for reaching out to us</p>
                        <p>Mirshod will respond to your inquiry as soon as possible 🫡. We appreciate your patience and look forward to assisting you.</p>
                        <br>
                        <p>In the meantime, feel free to explore <a href="https://github.com/W-Mirshod" style="color: #0066cc; text-decoration: none;">my GitHub Projects</a> to learn more about my services and how we can help you achieve your goals.</p>
                    </section>
                    
                    <footer style="text-align: center; border-top: 1px solid #dddddd; padding-top: 10px; margin-top: 20px;">
                        <p style="font-size: 12px; color: #aaaaaa; margin: 0;">Thank you for choosing W-Mirshod.</p>
                        <p style="font-size: 12px; color: #aaaaaa; margin: 0;">© 2022-2024 W-Mirshod. All rights reserved.</p>
                        <a href="https://w-mirshod.com/" style="display: inline-block; margin-top: 10px; text-decoration: none; color: #0066cc;">
                            <strong>Visit my Website</strong>
                        </a>
                    </footer>
                </div>
            </body>
        </html>
        """

    msg = EmailMultiAlternatives(subject, "", from_email, to)
    msg.attach_alternative(html_content, "text/html")

    msg.send()


def validate_recaptcha(recaptcha_response):
    data = {
        'secret': settings.RECAPTCHA_SECRET_KEY,
        'response': recaptcha_response
    }
    r = requests.post('https://www.google.com/recaptcha/api/siteverify', data=data)
    result = r.json()
    return result.get('success', False)
