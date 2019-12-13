
## Demo
![](https://i.imgur.com/LbcxHnV.png)

## Function
- [ ] sign up manuelly
- [ ] sign up with Oauth Plug-in
- [ ] sign up with Face

## How to run

1.Install MongoDb 

2.Do as following

 From github
```
git clone https://github.com/murraykkkeed06/face_signup.git

cd face_signup

npm install

node index.js

```

3.Go to [localhost:3000](http://127.0.0.1:3000)


## Check data

```
#check data in user database
node showData.js

#check data in face database
node showFaceData.js

'''

## Issue

* If you try to run docker with widows, please go to [192.168.0.1:300](http://192.168.0.1:3000) instead
* Since access webcam in docker environment need to tranfer usb device, upload image will be used instead 
