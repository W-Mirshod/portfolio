import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from portfolio.views import send_sms, validate_recaptcha, sending_email
from portfolio.forms import ContactForm
from portfolio.models import Skills, Projects

def v2_main(request):
    in_url = request.META.get('HTTP_REFERER', 'Unknown')
    send_sms(request, in_url)

    # Get data for the page
    context = {
        'skills': Skills.objects.all().order_by('index'),
        'projects': Projects.objects.filter(is_active=True).order_by('index'),
    }

    return render(request, 'index.html', context)

@require_POST
@csrf_exempt
def contact_view(request):
    """Handle contact form submissions via AJAX"""
    try:
        # Parse JSON data
        data = json.loads(request.body)
        
        # Validate reCAPTCHA
        recaptcha_response = data.get('g-recaptcha-response')
        if not validate_recaptcha(recaptcha_response):
            return JsonResponse({
                'success': False, 
                'message': 'Invalid reCAPTCHA. Please try again.'
            }, status=400)

        # Create form with data
        form_data = {
            'name': data.get('name'),
            'email': data.get('email'),
            'message': data.get('message')
        }
        
        form = ContactForm(form_data)
        
        if form.is_valid():
            # Save the contact
            contact = form.save()
            
            # Send email
            try:
                sending_email(contact.name, contact.email)
            except Exception as e:
                print(f"Email sending failed: {e}")
            
            return JsonResponse({
                'success': True,
                'message': 'Thank you for your message! I will get back to you soon.'
            })
        else:
            return JsonResponse({
                'success': False,
                'message': 'Please check your form data and try again.',
                'errors': form.errors
            }, status=400)
            
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'message': 'Invalid data format.'
        }, status=400)
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': 'An error occurred while processing your request.'
        }, status=500)
