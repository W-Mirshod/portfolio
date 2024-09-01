from datetime import datetime

from django.shortcuts import render
from user_agents import parse

from portfolio.models import RequestsLog


def home(request):
    if request.method == 'GET':
        send_sms(request, 'Home Page')
        return render(request, 'index.html')


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
