

export function cross_get(url,callback){
    if(window.java_obj){
        $.get(url,callback)
    }else{
        var get_url='/proxy?url='+encodeURIComponent(url)
        $.get(get_url,callback)
    }
}