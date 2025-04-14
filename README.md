# README

My SMS Messenger has a Ruby on Rails backend and Angular frontend and sends messages through the Twilio API and storing data in a MongoDB database.

To run locally, in one terminal shell run `rails server`, in another shell go to the my_sms_messenger_frontend directory run `ng serve`
Go to `http://localhost:4200/` to view the app.

You will need a few environment variables:
```angular2html
MONGO_DB_USERNAME
MONGO_DB_PASSWORD
MONGO_DB_CLUSTER
MONGO_DB_NAME
TWILIO_PHONE_NUMBER
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
```

