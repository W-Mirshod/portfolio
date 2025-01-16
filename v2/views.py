from django.shortcuts import render
from portfolio.views import send_sms

def v2_main(request):
    in_url = request.META.get('HTTP_REFERER', 'Unknown')
    send_sms(request, in_url)

    return render(request, 'v2/v2_index.html')
