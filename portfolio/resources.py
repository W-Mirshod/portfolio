from import_export import resources
from portfolio.models import RequestsLog, Skills, Projects, Contacts



class RequestsResource(resources.ModelResource):
    class Meta:
        model = RequestsLog
        fields = (
            'id'
            'ip_address',
            'browser',
            'os',
            'device_type',
            'is_mobile',
            'is_tablet',
            'is_pc',
            'referred_to',
            'request_time',
            'created_at',
            'updated_at',
        )
        export_order = (
            'id'
            'ip_address',
            'browser',
            'os',
            'device_type',
            'is_mobile',
            'is_tablet',
            'is_pc',
            'referred_to',
            'request_time',
            'created_at',
            'updated_at',
        )


class SkillsResource(resources.ModelResource):
    class Meta:
        model = Skills
        fields = (
            'id'
            'title',
            'percent',
            'title_color',
            'background_color',
            'index',
            'created_at',
            'updated_at',
        )
        export_order = (
            'id'
            'title',
            'percent',
            'title_color',
            'background_color',
            'index',
            'created_at',
            'updated_at',
        )


class ProjectsResource(resources.ModelResource):
    class Meta:
        model = Projects
        fields = (
            'id'
            'title',
            'description',
            'project_link',
            'picture',
            'is_active',
            'index',
            'created_at',
            'updated_at',
        )
        export_order = (
            'id'
            'title',
            'description',
            'project_link',
            'picture',
            'is_active',
            'index',
            'created_at',
            'updated_at',
        )


class ContactsResource(resources.ModelResource):
    class Meta:
        model = Contacts
        fields = (
            'id'
            'name',
            'email',
            'message',
            'created_at',
            'updated_at',
        )
        export_order = (
            'id'
            'name',
            'email',
            'message',
            'created_at',
            'updated_at',
        )
