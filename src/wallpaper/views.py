from django.shortcuts import render
from django.http import HttpResponse
import requests
import re
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



def proxy_download(request):
    url = request.GET.get('url')
    # resolution = request.GET.get('resolution')
    mt = re.search('([^/]+)$',url)
    if mt:
        name=mt.group().lower()
    else:
        name='download_file'
    # url = url[:mt.start(1)]+name
    rt = requests.get(url)
    # if rt.status_code!=200:
        # name = mt.group(1)+mt.group(3)
        # url = url[:mt.start(1)]+name 
        # rt = requests.get(url)
    rs = HttpResponse(rt.content)
    rs['Content-type'] = 'application/octet-stream'  # 'text/plain'
    # rs['Content-type'] = 'image/jpeg'
    rs['Content-Disposition'] = 'attachment; filename="{name}"'.format(name=name)
    return rs  