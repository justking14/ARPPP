// ------------------------------------------------------------------------------------------------
// ARGON SETUP
// ------------------------------------------------------------------------------------------------
var options = THREE.Bootstrap.createArgonOptions( Argon.immersiveContext );
options.renderer = { klass: THREE.WebGLRenderer };
var three = THREE.Bootstrap( options );

// Use Vuforia image recognition component of Argon.
// TODO: Add encrypted components commented out for future use.
// The setup functions determine what should happen when each fiducial is recognized by Argon.
// The names of the fiducials are determined by the database, which is set up at :
// https://developer.vuforia.com/targetmanager/project/checkDeviceProjectsCreated?dataRequestedForUserId=
Argon.immersiveContext.setRequiredCapabilities("Vuforia")
Argon.Vuforia.initialize({
	licenseKey: null,
//   	encryptedLicenseData: encryptedData,
    startCamera: true,
})
.then(function(api) {
	// load, activate, and use our dataSet
    api.loadDataSetFromURL("dataset/below.xml").then(function (dataSet){
		dataSet.activate()
		setupWedding(dataset.trackables.Wedding)

		// setupCook01(dataSet.trackables.ByCook_01)

		// setupTeacup(dataSet.trackables.TeaPractice_02)
 	// 	setupDishPantry(dataSet.trackables.DishPantry_03)
		// setupCook04(dataSet.trackables.ByCook_04)
		// setupSideboard(dataSet.trackables.Sideboard_05)
		// setupBucket(dataSet.trackables.ByBucket_06)
		// setupStoop(dataSet.trackables.FrontStoop_07)
		// setupCook08(dataSet.trackables.ByCook_08)
		// setupBucketDrop(dataSet.trackables.ByBackDoor_09)
		// 	setupTeacupDrop(dataSet.trackables.TeacupDestination_10)
 	// 	setupPortrait(dataSet.trackables.BetsyPortrait_11)
		// setupChamberPot(dataSet.trackables.ByChamberPot_12)
		// setupCook13(dataSet.trackables.ByCook_13)
		// setupChamberPotDrop(dataSet.trackables.BackDoor_14)
 	// 	setupBill(dataSet.trackables.AtCateringBill_15)


	}).then(api.startObjectTracker)
    .then(api.hintMaxSimultaneousImageTargets.bind(api, 2))
})
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// SCENE SETUP
// ------------------------------------------------------------------------------------------------
// Workaround because I couldn't figure out the HTML to hide the input.
var btn = document.getElementById("dialogButton");
btn.style.visibility = "hidden";

// Setup initial hint.
document.getElementById("infoMsg").innerHTML = "Look for marker";
document.getElementById("longInfoMsg").innerHTML = "";
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
// LOCATIONS OF ALL RESOURCES
// ------------------------------------------------------------------------------------------------
// Audio files
var weddingAudio = new Audio("audio/Wedding.mp3")

// var bridget01 = new Audio("audio/Bridget01.mp3");
// var bridget02 = new Audio("audio/Bridget02.mp3");
// var bridget03 = new Audio("audio/Bridget03.mp3");
// var howard01 = new Audio("audio/Howard01.mp3");
// var howard02 = new Audio("audio/Howard02.mp3");
// var howard03 = new Audio("audio/Howard03.mp3");
// var mooney01 = new Audio("audio/Mooney01.mp3");
// var mooney02 = new Audio("audio/Mooney02.mp3");
// var mooney03 = new Audio("audio/Mooney03.mp3");
// var mooney04 = new Audio("audio/Mooney04.mp3");
// var mooney05 = new Audio("audio/Mooney05.mp3");
// var mooney06 = new Audio("audio/Mooney06.mp3");
// var mooney07 = new Audio("audio/Mooney07.mp3");
// var mooney08 = new Audio("audio/Mooney08.mp3");
// var mooney09 = new Audio("audio/Mooney09.mp3");
// var mooney10 = new Audio("audio/Mooney10.mp3");
// var robert01 = new Audio("audio/Robert01.mp3");
// var robert02 = new Audio("audio/Robert02.mp3");




// Images of people and objects
var imgDirectory = "images/";	// Image directory path relative to directory containing index.html.
var weddingPicture = imgDirectory + "Wedding.png"

// var bridgetPicture = imgDirectory + "housemaid3.png";
// var howardPicture = imgDirectory + "mrs_howard3.png";
// var mooneyPicture = imgDirectory + "cook3.png";
// var robertPicture = imgDirectory + "coachman3.png";
// var teacupPicture = imgDirectory + "teacup.png";
// var chamberPotPicture = imgDirectory + "chamber_pot.png";
// var bucketPicture = imgDirectory + "bucket.png";
// var platterPicture = imgDirectory + "platter.png";



// Buttons
var buttonDirectory = imgDirectory + "Buttons/";
// var toWedding = buttonDirectory + "Wedding.png"

// var toBridget01 = buttonDirectory + "Sydney1.png";
// var toBridget02 = buttonDirectory + "Sydney2.png";
// var toCoachman = buttonDirectory + "Sydney3.png";
// var toMrsHoward = buttonDirectory + "Sydney4.png";
// var toMrsMooney = buttonDirectory + "Sydney5.png";
var ok = buttonDirectory + "OK.png";
var cont = buttonDirectory + "Continue.png";



// Logic control
var currentButton = "";
// var cook01Complete = false;
// var teacupComplete = false;
// var bridgetComplete = false;
// var cook04Complete = false;
// var sideboardComplete = false;
// var getBucketComplete = false;
// var stoopComplete = false;
// var cook08Complete = false;
// var bucketDropComplete = false;
// var teacupDropComplete = false;
// var howardComplete = false;
// var getChamberPotComplete = false;
// var cook13Complete = false;
// var chamberPotDropComplete = false;
// var finalMooneyInteractionComplete = false;

var weddingComplete = false;
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
// SCENES WITH BUTTONS
// ------------------------------------------------------------------------------------------------
// Each scene with buttons runs one function for each button press plus one.
//


function setupWedding(argonEntity){
	// Create an Argon object from the entity.
    var argonObject = three.argon.objectFromEntity(argonEntity);
    var imageElement = document.getElementById("currentImage");
    //console.log("Audio file lasts for: " + bridget01.duration + " seconds.");

	// Display Bridget, run her audio file, and display a button.
	// TODO: This function gets repeatedly called if the user quivers while looking at the code. (Probably they all do?) Address this when locking scene order down.
    argonObject.addEventListener("argon:found", function(){
    	if(!weddingComplete){
			imageElement.src = weddingPicture;
	 		imageElement.height = "500";
			imageElement.style.visibility = "visible";

			weddingAudio.play();

			var btn = document.getElementById("dialogButton");
			btn.src = ok;

			setTimeout(function(){
				currentButton = "ok";
				btn.style.visibility = "visible";
			}, ((weddingAudio.duration * 1000) + 300));
			weddingComplete = true;
		}
    })
}
function Thanks(){
	document.getElementById("dialogButton").style.visibility = "hidden";

	// Currently displaying no hint once the last marker is found.
	document.getElementById("infoMsg").innerHTML = "";
	document.getElementById("longInfoMsg").innerHTML = longHintText;
}

// Bridget:
// function setupDishPantry(argonEntity){
// 	// Create an Argon object from the entity.
//     var argonObject = three.argon.objectFromEntity(argonEntity);
//     var imageElement = document.getElementById("currentImage");
//     //console.log("Audio file lasts for: " + bridget01.duration + " seconds.");
//
// 	// Display Bridget, run her audio file, and display a button.
// 	// TODO: This function gets repeatedly called if the user quivers while looking at the code. (Probably they all do?) Address this when locking scene order down.
//     argonObject.addEventListener("argon:found", function(){
//     	if(!bridgetComplete && teacupComplete){
// 			imageElement.src = bridgetPicture;
//
// 			bridget01.play();
//
// 	 		imageElement.height = "500";
// 			imageElement.style.visibility = "visible";
//
// 			var btn = document.getElementById("dialogButton");
// 			btn.src = toBridget01;
//
// 			setTimeout(function(){
// 				currentButton = "toBridget01";
// 				btn.style.visibility = "visible";
// 			}, ((bridget01.duration * 1000) + 300));
//
// 			bridgetComplete = true;
// 		}
//     })
// }
//
// function askAboutWork(){
// 	var btn = document.getElementById("dialogButton");
// 	btn.style.visibility = "hidden";
//
// 	bridget02.play();
//
// 	btn.src = toBridget02;
//
// 	setTimeout(function(){
// 		currentButton = "toBridget02";
// 		btn.style.visibility = "visible";
// 	}, ((bridget02.duration * 1000) + 300));
// }
// function askAboutLetter(){
// 	document.getElementById("dialogButton").style.visibility = "hidden";
//
// 	bridget03.play();
//
// 	setTimeout(function(){
// 		var imageElement = document.getElementById("currentImage");
// 		imageElement.src = platterPicture;
// 		imageElement.height = "200";
// 	}, ((bridget03.duration * 1000) - 1000));
// 	// NOTE: I think the Bridget sound file has a lot of space at the end (although I thought all
// 	// files were now cropped to minimum possible length). All other sound files are considered
// 	// "complete" once the duration of their runtime plus 300 milliseconds, but this one feels
// 	// like it's lagging under those conditions, and trial and error found that instead subtracting
// 	// this amount felt about right.
//
// 	document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #4";
// 	document.getElementById("longInfoMsg").innerHTML = longHintText;
// }
//
// // Coachman:
// function setupStoop(argonEntity){
// 	// Create an Argon object from the entity.
//     var argonObject = three.argon.objectFromEntity(argonEntity);
//     var imageElement = document.getElementById("currentImage");
//
// 	// Display coachman, run his audio file, and display a button.
//     argonObject.addEventListener("argon:found", function(){
//     	if(!stoopComplete && getBucketComplete){
// 			imageElement.src = robertPicture;
// 	 		imageElement.height = "500";
// 			imageElement.style.visibility = "visible";
//
// 			robert01.play();
//
// 			var btn = document.getElementById("dialogButton");
// 			btn.src = toCoachman;
//
// 			setTimeout(function(){
// 				currentButton = "toCoachman";
// 				btn.style.visibility = "visible";
// 			}, ((robert01.duration * 1000) + 300));
//
// 			stoopComplete = true;
// 		}
//     })
// }
// function askAboutWashing(){
// 	document.getElementById("dialogButton").style.visibility = "hidden";
//
// 	robert02.play();
//
// 	setTimeout(function(){
// 		var imageElement = document.getElementById("currentImage")
// 		imageElement.src = bucketPicture;
// 		imageElement.height = "200";
// 	}, ((robert02.duration * 1000) + 300));
//
// 	document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #8";
// 	document.getElementById("longInfoMsg").innerHTML = longHintText;
// }
//
// // Mrs. Howard:
// function setupPortrait(argonEntity){
// 	// Create an Argon object from the entity.
//     var argonObject = three.argon.objectFromEntity(argonEntity);
//     var imageElement = document.getElementById("currentImage");
//
// 	// Display coachman, run his audio file, and display a button.
//     argonObject.addEventListener("argon:found", function(){
//     	if(!howardComplete && teacupDropComplete){
// 			imageElement.src = howardPicture;
// 	 		imageElement.height = "500";
// 			imageElement.style.visibility = "visible";
//
// 			howard02.play();
//
// 			var btn = document.getElementById("dialogButton");
// 			btn.src = toMrsHoward;
//
// 			setTimeout(function(){
// 				currentButton = "toMrsHoward";
// 				btn.style.visibility = "visible";
// 			}, ((howard02.duration * 1000) + 300));
//
// 			howardComplete = true;
// 		}
//     })
// }
// function thankMrsHoward(){
// 	document.getElementById("dialogButton").style.visibility = "hidden";
//
// 	howard03.play();
//
// 	setTimeout(function(){
// 		document.getElementById("currentImage").style.visibility = "hidden";
// 	}, ((howard03.duration * 1000) + 300));
//
// 	document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #12";
// 	document.getElementById("longInfoMsg").innerHTML = longHintText;
// }
//
// // Mrs. Mooney, Final Scene:
// function setupBill(argonEntity){
// 	// Create an Argon object from the entity.
//     var argonObject = three.argon.objectFromEntity(argonEntity);
//     var imageElement = document.getElementById("currentImage");
//
// 	// Display coachman, run his audio file, and display a button.
//     argonObject.addEventListener("argon:found", function(){
//     	if(!finalMooneyInteractionComplete && chamberPotDropComplete){
// 			imageElement.src = mooneyPicture;
// 	 		imageElement.height = "500";
// 			imageElement.style.visibility = "visible";
//
// 			mooney09.play();
//
// 			var btn = document.getElementById("dialogButton");
// 			btn.src = toMrsMooney;
//
// 			setTimeout(function(){
// 				currentButton = "toMrsMooney";
// 				btn.style.visibility = "visible";
// 			}, ((mooney09.duration * 1000) + 300));
// 			finalMooneyInteractionComplete = true;
// 		}
//     })
// }
// function answerMrsMooney(){
// 	document.getElementById("dialogButton").style.visibility = "hidden";
//
// 	mooney10.play();
//
// 	setTimeout(function(){
// 		document.getElementById("currentImage").style.visibility = "hidden";
// 	}, ((mooney10.duration * 1000) + 300));
//
// 	// Currently displaying no hint once the last marker is found.
// 	document.getElementById("infoMsg").innerHTML = "";
// 	document.getElementById("longInfoMsg").innerHTML = longHintText;
// }

// This is a workaround to avoid setting the onclick in javascript.
function buttonPressed(){
	if(currentButton == "ok") {Thanks();}
	// if(currentButton == "toBridget02") {askAboutLetter();}
	// if(currentButton == "toCoachman") {askAboutWashing();}
	// if(currentButton == "toMrsHoward") {thankMrsHoward();}
	// if(currentButton == "toMrsMooney") {answerMrsMooney();}
}
// ------------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------------
// SCENES WITHOUT BUTTONS
// ------------------------------------------------------------------------------------------------
// Identify the resources unique to each scene and call the appropriate generic scene function.
// (Button scenes don't use either of the generic functions so they don't need one of these.)
// function setupCook01(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, display the scene image (one of the characters)
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!cook01Complete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #2";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney01.addEventListener("ended", function() {cook01Complete = true;});
// 			imageElement.src = mooneyPicture;
// 			imageElement.height = "500";
// 			imageElement.style.visibility = "visible";
// 			mooney01.play();
// 		}
// 	})
//
// 	// When the fiducial is lost, hide the image and stop the audio.
// 	argonObject.addEventListener("argon:lost", function(){
// 		imageElement.style.visibility = "hidden";
// 		mooney01.pause();
// 	})
// }
//
// function setupTeacup(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, display the teacup
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!teacupComplete && cook01Complete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #3";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney02.addEventListener("ended", function() {teacupComplete = true;});
// 			imageElement.src = teacupPicture;
// 			imageElement.height = "200";
// 			imageElement.style.visibility = "visible";
// 			mooney02.play();
// 		}
// 	})
//
// 	// When the fiducial is lost, hide the image and stop the audio.
// 	argonObject.addEventListener("argon:lost", function(){
// 		imageElement.style.visibility = "hidden";
// 		mooney02.pause();
// 	})
// }
//
// function setupCook04(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, play the scene's audio
// 	// (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!cook04Complete && bridgetComplete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #5";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney03.addEventListener("ended", function() {cook04Complete = true;});
// 			// Don't update image because we want the platter to persist here.
// 			mooney03.play();
// 		}
// 	})
// }
//
// function setupSideboard(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, remove the scene image
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!sideboardComplete && cook04Complete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #6";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney04.addEventListener("ended", function() {sideboardComplete = true;});
// 			imageElement.style.visibility = "hidden";
// 			mooney04.play();
// 		}
// 	})
// }
//
// function setupBucket(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, remove the scene image
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!getBucketComplete && sideboardComplete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #7";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			getBucketComplete = true;
// 			imageElement.src = bucketPicture;
// 			imageElement.height = "200";
// 			imageElement.style.visibility = "visible";
// 		}
// 	})
// }
//
// function setupCook08(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, play the scene's audio
// 	// (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!cook08Complete && stoopComplete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #9";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney05.addEventListener("ended", function() {cook08Complete = true;});
// 			// Don't update image because we want the bucket to persist here.
// 			mooney05.play();
// 		}
//
// 	})
// }
//
// function setupBucketDrop(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, remove the scene image
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!bucketDropComplete && cook08Complete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #10";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney06.addEventListener("ended", function() {bucketDropComplete = "true"; imageElement.src = teacupPicture; imageElement.height = "200"; imageElement.style.visibility = "visible";});
// 			imageElement.style.visibility = "hidden";
// 			mooney06.play();
// 		}
// 	})
// }
//
// function setupTeacupDrop(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, remove the scene image
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!teacupDropComplete && bucketDropComplete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #11";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			howard01.addEventListener("ended", function() {teacupDropComplete = true; imageElement.style.visibility = "hidden";});
// 			howard01.play();
// 		}
// 	})
// }
//
// function setupChamberPot(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, remove the scene image
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!getChamberPotComplete && howardComplete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #13";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			getChamberPotComplete = true;
// 			imageElement.src = chamberPotPicture;
// 			imageElement.height = "200";
// 			imageElement.style.visibility = "visible";
// 		}
// 	})
// }
//
// function setupCook13(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, display the scene image (one of the characters)
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!cook13Complete && getChamberPotComplete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #14";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney07.addEventListener("ended", function() {cook13Complete = true;});
// 			// Don't update image because we want the chamber pot to persist here.
// 			mooney07.play();
// 		}
// 	})
// }
//
// function setupChamberPotDrop(incEntity){
// 	// Create an Argon object from the entity.
// 	var argonObject = three.argon.objectFromEntity(incEntity);
// 	var imageElement = document.getElementById("currentImage");
//
// 	// When the fiducial is recognized, remove the scene image
// 	// and play the scene's audio (if this is the first time looking at the fiducial).
// 	argonObject.addEventListener("argon:found", function(){
// 		if(!chamberPotDropComplete && cook13Complete){
// 			document.getElementById("infoMsg").innerHTML = "Hint: Look for marker #15";
// 			document.getElementById("longInfoMsg").innerHTML = "";
// 			mooney08.addEventListener("ended", function() {chamberPotDropComplete = true;});
// 			imageElement.style.visibility = "hidden";
// 			mooney08.play();
// 		}
// 	})
// }
// ------------------------------------------------------------------------------------------------
