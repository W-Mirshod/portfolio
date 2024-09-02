from django import forms

from portfolio.models import Contacts


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contacts
        fields = ['name', 'email', 'message']
