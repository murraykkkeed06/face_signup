
var faceMatcher;

function select_three_file(){
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
                
                window.location = "./index.html";
               
            }
        });


    }
    else
    {
        console.log("Your browser does not support File API");
    }

}



function select_one_file(){
    //Check File API support
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files_o");
        
        filesInput.addEventListener("change", function(event){
            var files = event.target.files; //FileList object
            var output = document.getElementById("img_s_o");
            for(var i = 0; i< files.length; i++)
            {
                
                console.log(document.getElementById("files_o").value);
                var file = files[i];
                //Only pics
                if(!file.type.match('image'))
                    continue;
                var picReader = new FileReader();
                picReader.addEventListener("load",function(event){
                    var picFile = event.target;
                    var div = document.createElement("div");
                    var img_e_o = document.getElementById("img_e_o")
                    //console.log(picFile.name);
                    div.innerHTML = "<div class='w3-third w3-card-4'><img id='match' src='" + picFile.result + "'" +
                    "title='" + picFile.name + "'/></div>";
                    console.log(div.innerHTML);
                    output.insertBefore(div,img_e_o);
                    
                });
                //Read the image
                picReader.readAsDataURL(file);
                
            }
        });


    }
    else
    {
        console.log("Your browser does not support File API");
    }

}



async function myFunction(){

  
    document.getElementById('load1').style.display="block";
    
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
        document.getElementById('load1').style.display="none";
        alert("Sign up sucess~");
        //console.log(singleResulto1.descriptor)
        //module.exports = singleResulto1.descriptor;
        $.post("/face_check", {
            name: username, 
            face1: singleResulto1.descriptor,
            face2: singleResulto2.descriptor,
            face3: singleResulto3.descriptor
        });

        
        //setTimeout(function(){
            window.location = "../index.html";
        //},1000);



}







            
            async function recognize(){
                
                document.getElementById('load2').style.display="block";

                await faceapi.loadSsdMobilenetv1Model('/models')
                await faceapi.loadFaceLandmarkModel('/models')
                await faceapi.loadFaceRecognitionModel('/models')
               

                match = document.getElementById("match");
                
                
                
                const singleResultmatch = await faceapi
                    .detectSingleFace(match)
                    .withFaceLandmarks()
                    .withFaceDescriptor()
                
                    
                    //alert("Error Sign In");
                    //break;
                
                
            
                document.getElementById('load2').style.display="none";
                /*
                $.get("/face_match", {
                    match: singleResultmatch.descriptor
                });
                */
               $.post("/face_match").then(function(response){

                var responseLength = response.length;

                var arr1 = []
                var arr2 = []
                var arr3 = []

                for(var checknum=0 ; checknum<responseLength; checknum++){
                    for(var i=0; i<128; i++){
                        arr1.push(response[checknum].face1[i].num);
                        arr2.push(response[checknum].face2[i].num);
                        arr3.push(response[checknum].face3[i].num);
                    } 

                    const labeledDescriptors = [
                    new faceapi.LabeledFaceDescriptors(
                        response[checknum].name,
                        [new Float32Array(arr1), new Float32Array(arr2), new Float32Array(arr3)]
                    )
                    ]
                    arr1 = [];
                    arr2 = [];
                    arr3 = [];
                    faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
                    
                    try{
                        bestMatch = faceMatcher.findBestMatch(singleResultmatch.descriptor);
                        var n = bestMatch.toString().search("unknown");
                        if (n<0){
                            //document.getElementById("final").innerHTML="Welcome back " + bestMatch.toString();
                        
                            //change to backend
                            var point = bestMatch.toString().indexOf("(");
                            var name = bestMatch.toString().substring(0, point);
                            window.location = '/welcome?name='+name;
                        

                            break;
                        }
                        
                    }catch{
                        console.log("error fetching face descriptor");
                        
                    }
                    if(checknum == responseLength-1)
                            //document.getElementById("final").innerHTML="Cannot recognize";
                            alert("Error Sign In")
                            window.location = './index.html';
                    
                    }

                

               
            
                    });
                //alert("finish recognizing...")

                


                
                
            //    console.log(bestMatch.toString())
                
            }
            
            /*
            const labeledDescriptors = [
            new faceapi.LabeledFaceDescriptors(
                username,
                [singleResulto1.descriptor, singleResulto2.descriptor, singleResulto3.descriptor]
            )
            ]

            faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)
            
            */
            
            
            
function checkSubmit(){

    var submitName = document.getElementById("submit_username").value;
    var submitPassword = document.getElementById("submit_password").value;

        
    $.post("/checkSubmit",{ name: submitName, pwd: submitPassword }).then(function(res){

        console.log(res.type);
        if(res.type == "success"){
            //change to backend
            console.log(res.person);
            window.location="/welcome?name="+res.person;
        }else{
            alert("Error Sign In");
        }

    });



}
