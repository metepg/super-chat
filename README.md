# Secret chat app for secret ppl
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
https://super-chat-live.herokuapp.com/
