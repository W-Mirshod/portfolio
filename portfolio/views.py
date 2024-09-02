from datetime import datetime

from django.core.mail import send_mail
from django.http import JsonResponse
from django.shortcuts import render
from user_agents import parse

from portfolio.forms import ContactForm
from portfolio.models import RequestsLog, Skills, Projects
from root.settings import DEFAULT_FROM_EMAIL


def home(request):
    skills = Skills.objects.all()
    projects = Projects.objects.filter(is_active=True).order_by('-id')
    form = ContactForm()

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            sending_email(request.POST['name'], request.POST['message'], request.POST['email'])
            return JsonResponse({'success': True, 'message': 'Your message was sent successfully!'})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)

    send_sms(request, 'Home Page')

    context = {'skills': skills, 'projects': projects, 'form': form}
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


def sending_email(name, message, gmail):
    subject = f"Contacting from {name} in W-Mirshod"
    message = message
    from_email = gmail
    recipient_list = [DEFAULT_FROM_EMAIL]

    send_mail(subject, message, from_email, recipient_list)
