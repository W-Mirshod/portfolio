import random
from datetime import datetime

import requests
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.http import JsonResponse
from django.shortcuts import render
from user_agents import parse

from portfolio.models import RequestsLog
from root.settings import DEFAULT_FROM_EMAIL
from .forms import ContactForm
from .models import Skills, Projects


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
    in_url = request.META.get('HTTP_REFERER', 'Unknown')
    send_sms(request, in_url)
    if request.method == 'POST':
        form = ContactForm(request.POST)

        recaptcha_response = request.POST.get('g-recaptcha-response')
        if not validate_recaptcha(recaptcha_response):
            return JsonResponse({'success': False, 'message': 'Invalid reCAPTCHA. Please try again.'}, status=400)

        if form.is_valid():
            try:
                form.save()
                name = form.cleaned_data['name']
                email = form.cleaned_data['email']
                return JsonResponse({'success': True})
            except Exception as e:
                return JsonResponse({'success': False, 'message': 'An error occurred while processing your request.'},
                                    status=500)
        else:
            errors = form.errors.as_json()
            return JsonResponse({'success': False, 'errors': errors}, status=400)

    context = {
        'skills': Skills.objects.all().order_by('index'),
        'projects': Projects.objects.filter(is_active=True).order_by('index'),
        'form': ContactForm()
    }
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


greetings = ["Hello",
             "Hi there",
             "Greetings",
             "Welcome", ]


def sending_email(name, gmail):
    subject = f"To {name} From W-Mirshod.com"
    from_email = DEFAULT_FROM_EMAIL
    to = [f'{gmail}']

    greeting = random.choice(greetings)

    # HTML content only
    html_content = f"""
    <html>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f0f4f8;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
                <header style="text-align: center; border-bottom: 2px solid #e0e0e0; padding-bottom: 20px; margin-bottom: 20px;">
                    <h1 style="font-size: 28px; color: #2c3e50; margin: 0;">Welcome to W-Mirshod</h1>
                    <p style="font-size: 16px; color: #7f8c8d;">Your journey with us starts here!</p>
                </header>

                <section style="color: #34495e;">
                    <h3 style="font-size: 24px; color: #2980b9;">{greeting}</h3>
                    <p style="font-size: 16px;">Thank you for reaching out to us!</p>
                    <p style="font-size: 16px;">Mirshod will respond to your inquiry as soon as possible 🫡. We appreciate your patience and look forward to assisting you.</p>
                    <br>
                    <p style="font-size: 16px;">In the meantime, feel free to explore <a href="https://github.com/W-Mirshod" style="color: #2980b9; text-decoration: none; font-weight: bold;">my GitHub Projects</a> to learn more about my services and how we can help you achieve your goals.</p>
                </section>

                <footer style="text-align: center; border-top: 2px solid #e0e0e0; padding-top: 20px; margin-top: 30px;">
                    <p style="font-size: 12px; color: #95a5a6; margin: 0;">Thank you for choosing W-Mirshod.</p>
                    <p style="font-size: 12px; color: #95a5a6; margin: 0;">© 2022-2024 W-Mirshod. All rights reserved.</p>
                    <a href="https://w-mirshod.com/" style="display: inline-block; margin-top: 10px; text-decoration: none; color: #2980b9; font-weight: bold; padding: 10px 15px; border: 2px solid #2980b9; border-radius: 5px;">
                        Visit my Website
                    </a>
                </footer>
            </div>
        </body>
    </html>
    """

    msg = EmailMultiAlternatives(subject, "", from_email, to)
    msg.attach_alternative(html_content, "text/html")

    msg.send()
