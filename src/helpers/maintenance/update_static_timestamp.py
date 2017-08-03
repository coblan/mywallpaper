import os
from django.conf import settings
from helpers.base.dot_dict import DotObj

def get_static_obj(path):
    dc={}
    for name in os.listdir(path):
        abs_path=os.path.join(path,name)
        if os.path.isfile(abs_path):
            key=name.replace('.','_')
            dc[key]=int(os.path.getmtime(abs_path))
    
    return DotObj(dc)

org_static_file_path=os.path.join(settings.BASE_DIR,'static')
volatile_static_file_path=os.path.join(org_static_file_path,'js')

static_file_timestamp_dict=get_static_obj(volatile_static_file_path)
