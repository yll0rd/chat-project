from django.contrib import admin
from chatapp.models import *

# Register your models here.
admin.site.register(Conversation)
admin.site.register(Messages)
admin.site.register(ChatUsers)
