from django.urls import path
from . import views

app_name = 'alero_app'

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', views.signup, name='signup'),
    path('create_announcement/', views.create_announcement, name='create_announcement'),
    path('delete_announcement/<int:ann_id>/', views.delete_announcement, name='delete_announcement'),
    path('edit_announcement/<int:ann_id>/', views.edit_announcement, name='edit_announcement'),
]   