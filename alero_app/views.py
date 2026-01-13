from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from alero_staff.models import Announcement

def home(request):
    'The home page for logged in users'
    announcements = Announcement.objects.all()
    return render(request, 'alero_app/home.html', {'anns':announcements})

def signup(request):
    'The signup page for new users'
    if request.method == 'POST':
        username, password = request.POST.get('username'), request.POST.get('password')
        if username and password:
            User = get_user_model()
            User.objects.create_user(username=username, password=password)
            messages.success(request, 'Account created successfully. Please log in.')
            return redirect('login')
        else:
            messages.error(request, 'Please fill in all fields.')
    return render(request, 'registration/signup.html')

@login_required
def create_announcement(request):
    'Page for staff to create announcements'
    if request.method == 'POST':
        title = request.POST.get('title')
        text = request.POST.get('text')
        if title and text:
            Announcement.objects.create(author=request.user, title=title, text=text).save()
            messages.success(request, 'Announcement created successfully.')
            return redirect('alero_app:home')
        else:
            messages.error(request, 'Please fill in all fields.')
    return render(request, 'alero_app/create_announcement.html')

@login_required
def delete_announcement(request, ann_id):
    'Page for staff to delete announcements'
    try:
        ann = Announcement.objects.get(id=ann_id, author=request.user)
        ann.delete()
        messages.success(request, 'Announcement deleted successfully.')
    except Announcement.DoesNotExist:
        messages.error(request, 'Announcement not found or you do not have permission to delete it.')
    return redirect('alero_app:home')

@login_required
def edit_announcement(request, ann_id):
    'Page for staff to edit announcements'
    try:
        ann = Announcement.objects.get(id=ann_id, author=request.user)
        if request.method == 'POST':
            title = request.POST.get('title')
            text = request.POST.get('text')
            if title and text:
                ann.title = title
                ann.text = text
                ann.save()
                messages.success(request, 'Announcement updated successfully.')
                return redirect('alero_app:home')
            else:
                messages.error(request, 'Please fill in all fields.')
        return render(request, 'alero_app/edit_announcement.html', {'ann': ann})
    except Announcement.DoesNotExist:
        messages.error(request, 'Announcement not found or you do not have permission to edit it.')
        return redirect('alero_app:home')