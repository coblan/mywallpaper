import {cross_get} from  './myrequest.js'


class  UrlManager{
    constructor(){
        this.pre=''
        this.page=''
        this.suf=''
        this.page=0

        this.set_daily()
    }
    set_daily(){
        this.pre='http://d2-wallpaperv3.ticktockapps.com/res/image/all/'
        this.page=1
        this.suf='?app=wallhd-10000&device=iPhone8%2C1&devicesize=750x1334&ios=9.2.1&thumb=305x543&version=4.6'
    }
    set_category(cat){
        this.pre='http://d2-wallpaperv3.ticktockapps.com/res/image/tag/'+cat+'/'
        this.page=1
        this.suf='?app=wallhd-10000&device=iPod5%2C1&devicesize=640x1136&ios=8.3&thumb=305x543&version=4.6'
    }
    get_next_url(){
        var real_url=this.pre+this.page+this.suf
        this.page+=1
        return real_url
    }
}

export class ImageManager{
    constructor(){
        this.url_obj=new UrlManager()
        this.image_list=[]
        this.has_next_page=true
    }
    load_more(callback){
        var self=this
        var url=this.url_obj.get_next_url()
        var timer = setTimeout(callback,15*1000)
        cross_get(url,function(resp){
            clearTimeout(timer)
            var new_image_list=resp.images
            console.log('loaded....')
            self.image_list.push.apply(self.image_list,new_image_list)

            //self.image_list.push({"url": "http://d3-wallpaperv3.ticktockapps.com/wallpaper/10313a2aa0acc5b3297e9a3f05f98423-750x1334.jpg", "thumb_url": "http://d3-wallpaperv3.ticktockapps.com/wallpaper/10313a2assss3297e9a3f05f98423-305x543.jpg", "id": 1252344, "likes": 100},)

            if(new_image_list.length<72){
                self.has_next_page=false
            }else{
                self.has_next_page=true
            }

            Vue.nextTick(function(){
                $$('img.no-lazyed').trigger('lazy');
                //$("img.no-lazyed").lazyload({
                //    event: "scroll",
                //});
                $$('img.no-lazyed').removeClass('no-lazyed')
            })


            if(callback){
                callback(new_image_list)
            }
        })
    }
    clear(){
        this.image_list.splice(0,this.image_list.length)
    }
}

export class  CategoryManager{
    constructor(){
        this.categorys=[]
    }
    update(){
        var  self=this
        var url='http://d2-wallpaperv3.ticktockapps.com/res/tag/category.json?app=wallhd-10000&device=iPod5%2C1&devicesize=640x1136&ios=8.3&sort=pop&thumb=305x543&version=4.6'
        cross_get(url,function(resp){
            self.categorys.length=0
            self.categorys.push.apply(self.categorys,resp.data[1].categories)
        })
    }
}

