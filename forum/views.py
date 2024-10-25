from django.shortcuts import render, redirect
from .models import Post
from django.views import View
from django.shortcuts import render

class PostListView(View):
    def get(self, request):
        posts = Post.objects.all().order_by('-timestamp')
        return render(request, 'forum/post_list.html', {'posts': posts})

class PostCreateView(View):
    def post(self, request):
        author = request.POST.get('author')
        content = request.POST.get('content')
        post = Post(author=author, content=content)
        post.save()
        return redirect('post_list')