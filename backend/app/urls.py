from rest_framework import routers
from .views import (
    ProjectViewSet, ExperienceViewSet, SkillCategoryViewSet,
    OrganizationViewSet, TechStackItemViewSet, TerminalLineViewSet
)

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'skill-categories', SkillCategoryViewSet)
router.register(r'organizations', OrganizationViewSet)
router.register(r'tech-stack', TechStackItemViewSet)
router.register(r'terminal-lines', TerminalLineViewSet)

urlpatterns = router.urls 