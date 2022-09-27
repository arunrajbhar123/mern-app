# Mern Application 

## Backend  (server) : Live on the heroku server.
### https://floating-waters-51705.herokuapp.com/
### Accept Routes for (Authentication)

    * /signup
    * /login
    * /reset/passowrd
    * /profile
#
### Accept Routes for (Oauth) 
# Todo

    * /auth/google
    * /auth/twitter
    * /auth/facebook
    * /auth/github

#

## Route /signup (Accept Data in Body)
    firstname  : {type:String, required:true}
    middlename : {type:String}
    lastname   : {type:String, required:true}
    dob        : {type:String, required:true}
    mobile     : {type:Number}
    email      : {type:String, required:true}
    password   : {type:String, required:true}
    address    : {type:String}
    photo      : {type:String}

## Route /login (Accept Data in Body)
    
    email      : {type:String, required:true}
    password   : {type:String, required:true}
   
## Route /forgat (Accept Data in Body)
    
    email      : {type:String, required:true}

## Route /profile (Accept Data in headers)
    
    Authentication  : Bearer token


    




