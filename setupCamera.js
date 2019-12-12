
var faceMatcher;

window.onload = function(){
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");
        var num = 0;
        filesInput.addEventListener("change", function(event){
            var files = event.target.files; //FileList object
            var output = document.getElementById("img_s");
            for(var i = 0; i< files.length; i++)
            {
                
                console.log(document.getElementById("files").value);
                var file = files[i];
                //Only pics
                if(!file.type.match('image'))
                    continue;
                var picReader = new FileReader();
                picReader.addEventListener("load",function(event){
                    var picFile = event.target;
                    var div = document.createElement("div");
                    var img_e = document.getElementById("img_e")
                    //console.log(picFile.name);
                    div.innerHTML = "<div class='w3-third w3-card-4'><img style='height:200px;width:200px'" +" id='"+num+"' src='" + picFile.result + "'" +
                    "title='" + picFile.name + "'/></div>";
                    console.log(div.innerHTML);
                    output.insertBefore(div,img_e);
                    num++;
                });
                //Read the image
                picReader.readAsDataURL(file);
                
            }
            if(files.length!=3){
                alert("Please Pick Just Three Picture!");
                
                window.location = "./login_form.html";
               
            }
        });


    }
    else
    {
        console.log("Your browser does not support File API");
    }

}

async function myFunction(){

  
    document.getElementById('load').style.display="block";
    
    await faceapi.loadSsdMobilenetv1Model('/models')
    await faceapi.loadFaceLandmarkModel('/models')
    await faceapi.loadFaceRecognitionModel('/models')

    console.log(faceapi.nets);
    
    input1 = document.getElementById('0');
    input2 = document.getElementById('1');
    input3 = document.getElementById('2');

    

    var username = document.getElementById("myText").value;

    console.log(input1.src);
        
    const singleResulto1 = await faceapi
        .detectSingleFace(input1)
        .withFaceLandmarks()
        .withFaceDescriptor()

        const singleResulto2 = await faceapi
        .detectSingleFace(input2)
        .withFaceLandmarks()
        .withFaceDescriptor()

        const singleResulto3 = await faceapi
        .detectSingleFace(input3)
        .withFaceLandmarks()
        .withFaceDescriptor()

        /*
        const labeledDescriptors = [
        new faceapi.LabeledFaceDescriptors(
            username,
            [singleResulto1.descriptor, singleResulto2.descriptor, singleResulto3.descriptor]
        )
        ]

        faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)
        
        */
        document.getElementById('load').style.display="none";
        alert("Sign up sucess~");
        //console.log(singleResulto1.descriptor)
        //module.exports = singleResulto1.descriptor;
        $.post("/face_check", {
            name: username, 
            face1: singleResulto1.descriptor,
            face2: singleResulto2.descriptor,
            face3: singleResulto3.descriptor
        });

        
        setTimeout(function(){
            window.location = "../login_form.html";
        },1000);



}


