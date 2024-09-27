from django import forms
from django_recaptcha.fields import ReCaptchaField
from django_recaptcha.widgets import ReCaptchaV2Checkbox

from portfolio.models import Contacts


class ContactForm(forms.ModelForm):
    captcha = ReCaptchaField(widget=ReCaptchaV2Checkbox)

    class Meta:
        model = Contacts
        fields = ['name', 'email', 'message']
