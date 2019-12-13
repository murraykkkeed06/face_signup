
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

npm install

node index.js

```
From docker
```
docker run -p 3000:3000 murrayliu35/face_signup

```

From aws


> http://...............

3.Go to [localhost:3000](http://127.0.0.1:3000)



## Check data

```
#check data in user database
node showData.js

#check data in face database
node showFaceData.js

<<<<<<< HEAD
'''

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

npm install

node index.js

```
From docker
```
docker run -p 3000:3000 murrayliu35/face_signup

```

From aws


> http://...............

3.Go to [localhost:3000](http://127.0.0.1:3000)



## Check data

```
#check data in user database
node showData.js

#check data in face database
node showFaceData.js

```

## issue
* If you try to run docker with widows, please go to [192.168.0.1:300](http://192.168.0.1:3000) instead
* Since access webcam in docker environment need to tranfer usb device, upload image will be used instead 
