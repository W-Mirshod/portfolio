from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from django.utils import timezone
from .models import Projects


class StaticViewSitemap(Sitemap):
    """
    Sitemap for static pages
    """
    priority = 1.0
    changefreq = 'weekly'
    protocol = 'https'

    def items(self):
        # Main page sections that Google should index
        return ['home']

    def location(self, item):
        # For single-page portfolio, all sections are anchors on the home page
        return reverse('home')

    def lastmod(self, obj):
        return timezone.now().date()


class ProjectsSitemap(Sitemap):
    """
    Sitemap for projects - helps Google understand your portfolio content
    """
    changefreq = 'monthly'
    priority = 0.8
    protocol = 'https'

    def items(self):
        # Return active projects
        return Projects.objects.filter(is_active=True).order_by('index')

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        # Since this is a single-page portfolio, all projects are on the main page
        # We can add project-specific anchors or use the main page URL
        return reverse('home') + f'#project-{obj.id}'


class LanguageSitemap(Sitemap):
    """
    Sitemap for different language versions
    """
    changefreq = 'weekly'
    priority = 0.9
    protocol = 'https'

    def items(self):
        # Return available languages
        return ['en', 'uz', 'ru']

    def location(self, item):
        # Language-specific URLs
        if item == 'en':
            return '/en/'
        elif item == 'uz':
            return '/uz/'
        elif item == 'ru':
            return '/ru/'
        return '/'

    def lastmod(self, obj):
        return timezone.now().date()


# Sitemap dictionary for Django's sitemap framework
sitemaps = {
    'static': StaticViewSitemap,
    'projects': ProjectsSitemap,
    'languages': LanguageSitemap,
}
