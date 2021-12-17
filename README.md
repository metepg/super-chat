# Secret chat app for secret ppl
![superchat-etusivu](https://user-images.githubusercontent.com/75932758/146543865-455d1838-1715-40ed-960d-623b41fe17d1.png)
![superchat-chat](https://user-images.githubusercontent.com/75932758/146543872-0122444c-b226-4a5f-a5ed-9f31a404a53d.png)

Kloonaa normaalisti 

Asenna paketit /client ja /server kansioissa 

Vaatii MongoDB tietokannan toimiakseen 

Aseta .env tiedostoon seuraavat muuttujat: 

    - JWT_HASH = voi olla mikä String vaan 
    
    - PORT = Mikä portti vaan esim 3001 
    
    - MONGO_URL = mongodbn osoite 
## Api routet

/auth/login

/auth/signup

(Muut kutsut hoidetaan socket.io:n sisällä)

# LIVE DEMO
https://supah-chat-live.herokuapp.com/
