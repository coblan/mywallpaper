from django.shortcuts import render
from django.http import HttpResponse
import requests
# Create your views here.

def home(request):
    return render(request,'wallpaper/home.html')

# @cache_control(max_age=settings.HTTP_MAX_AGE)
# @map_image
def proxy(request):
    url= request.GET.get('url')
    if url:
        rt = requests.get(url.encode('utf8'))
        content=rt.content
    else:
        content='this interface used for proxy,but there is not target url found in the request'
    return HttpResponse(content,content_type="application/json")