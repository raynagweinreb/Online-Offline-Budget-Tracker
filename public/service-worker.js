const CACHE_NAME = 'cache-site-v1'

const FILES_TO_CACHE = [
    "/", 
    "/index.html", 
    "/index.js", 
    "/styles.css", 

]

self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache)=>{
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('fetch',(e)=>{
    e.respondWith(
        fetch(e.request).catch(()=>{
            if(res){
                return res
            } else if (e.request.headers.get("accept").includes("text/html")){
                return caches.match("index.html")
            }
        })
    )
})